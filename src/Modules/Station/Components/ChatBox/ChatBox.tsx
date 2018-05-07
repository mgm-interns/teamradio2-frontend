import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux/Reducers';
import { localStorageManager } from 'Helpers';
import { Message } from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { StationServices } from 'Services/Http';
import { StationChatSSEService } from 'Services/SSE';
import './ChatBox.scss';
import { ChatMessage } from './ChatMessage';

interface IChatBoxProps {
  stationId: string;
  toggleChatPopup: () => void;
}

interface IChatReducerProps {
  message: Message;
}

interface IChatBoxStates {
  userId: string;
  listMessages: Message[];
}

export class ChatBoxComponent extends BaseComponent<
  IChatBoxProps & IChatReducerProps,
  IChatBoxStates
> {
  private messageBox: any;
  @Inject('StationServices') private stationServices: StationServices;
  @Inject('StationChatSSEService')
  private stationChatSSEService: StationChatSSEService;

  constructor(props: IChatBoxProps & IChatReducerProps) {
    super(props);
    this.state = {
      userId: '',
      listMessages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  public componentWillMount() {
    const userInfo = localStorageManager.getUserInfo();
    if (userInfo) {
      this.setState({
        userId: userInfo.id,
      });
    }
  }

  public componentDidMount() {
    const { stationId } = this.props;
    this.startSSEService(stationId);
  }

  public componentWillUnmount() {
    this.stationChatSSEService.close();
  }

  public componentWillReceiveProps(
    nextProps: IChatReducerProps & IChatBoxProps,
  ) {
    const newMessage = nextProps.message;
    this.onReceiveNewMessage(newMessage);

    const { stationId: oldStationId } = this.props;
    const { stationId: newStationId } = nextProps;
    this.onSwitchStation(oldStationId, newStationId);
  }

  public onMessageChange(event: any) {
    const key = event.keyCode ? event.keyCode : event.which;
    const KEY_CODE_ENTER = 13;
    if (key === KEY_CODE_ENTER) {
      this.sendMessage(event);
    } else {
      this.resizeMessageBox();
    }
  }

  public onReceiveNewMessage(newMessage: Message) {
    const listMessages = this.state.listMessages;
    for (const message of listMessages) {
      if (message.id === newMessage.id) {
        return;
      }
    }
    listMessages.push(newMessage);
    this.setState({ listMessages }, () => this.scrollDownMessagesContainer());
  }

  public onSwitchStation(oldStationId: string, newStationId: string) {
    if (oldStationId !== newStationId) {
      this.setState({ listMessages: [] });
      this.stationChatSSEService.close();
      this.startSSEService(newStationId);
    }
  }

  public resizeMessageBox() {
    setTimeout(() => {
      this.messageBox.style.height = '30px';
      this.messageBox.style.height = this.messageBox.scrollHeight + 'px';
    });
  }

  public sendMessage(event: any) {
    if (!this.isLoggedIn()) {
      this.showError('You must login to be able to chat');
      this.resetMessageBox(event);
      return;
    }

    const messageContent = this.messageBox.value.trim();
    if (messageContent) {
      const { stationId } = this.props;
      this.stationServices.sendMessage(stationId, messageContent).subscribe(
        (data: Message) => {},
        (err: string) => {
          this.showError(err);
        },
      );
    }
    this.resetMessageBox(event);
  }

  public resetMessageBox(event: any) {
    this.messageBox.value = '';
    this.messageBox.style.height = '30px';
    event.preventDefault();
  }

  public scrollDownMessagesContainer() {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  public render() {
    const { toggleChatPopup } = this.props;

    return (
      <div className="chat-container">
        <div className="d-flex justify-content-end chat-toolbar">
          <span className="close-button" onClick={toggleChatPopup}>
            <i className="fa fa-times" />
          </span>
        </div>
        <div className="messages-container" id="messages-container">
          {this.state.listMessages.map((message: Message, index: number) => {
            return (
              <ChatMessage
                key={index}
                isOfCurrentUser={message.sender.userId === this.state.userId}
                userName={message.sender.username}
                avatarUrl={message.sender.avatarUrl}
                message={message.content}
              />
            );
          })}
        </div>
        <div className="message-input">
          <textarea
            maxLength={200}
            placeholder="Type a message here"
            className="type-message"
            id="message-box"
            ref={messageBox => {
              this.messageBox = messageBox;
            }}
            onKeyDown={this.onMessageChange}
          />
          <button className="btn-send-message" onClick={this.sendMessage}>
            <i className="fa fa-paper-plane" />
          </button>
        </div>
      </div>
    );
  }

  private startSSEService(stationId: string) {
    this.stationChatSSEService.initiate(stationId);
    this.stationChatSSEService.start();
  }
}

const mapStateToProps = (state: IApplicationState): IChatReducerProps => ({
  message: state.chat.message,
});

export const ChatBox = connect<IChatReducerProps, {}, {}>(
  mapStateToProps,
  null,
)(ChatBoxComponent);
