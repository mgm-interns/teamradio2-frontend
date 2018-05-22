import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Inject } from 'Configuration/DependencyInjection';
import { localStorageManager } from 'Helpers';
import { Message } from 'Models';
import { RegisteredUser } from 'Models/User';
import { DEFAULT_USER_AVATAR, MAXIMUM_RECEIVED_MESSAGE } from 'Modules/User/Constants';
import * as React from 'react';
import { StationServices } from 'Services/Http';
import './ChatBox.scss';
import { ChatMessage } from './ChatMessage';

interface IChatBoxProps {
  stationId: string;
}

interface IChatBoxStates {
  userInfo: RegisteredUser;
  listMessages: Message[];
  toggleChatBox: boolean;
  hasNewMessage: boolean;
}

export class ChatBox extends BaseComponent<
  IChatBoxProps,
  IChatBoxStates
> {
  private messageBox: any;
  @Inject('StationServices') private stationServices: StationServices;

  constructor(props: IChatBoxProps) {
    super(props);
    this.state = {
      userInfo: new RegisteredUser(),
      listMessages: [],
      toggleChatBox: false,
      hasNewMessage: false,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  public componentWillMount() {
    const userInfo = localStorageManager.getUserInfo();
    if (userInfo) {
      this.setState({ userInfo });
    }
  }

  public componentDidMount() {
    this.subscribeToFirebase(this.props.stationId);
  }

  public componentDidUpdate() {
    this.scrollDownMessagesContainer();
  }

  public componentWillReceiveProps(
    nextProps: IChatBoxProps,
  ) {
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

  public onSwitchStation(oldStationId: string, newStationId: string) {
    if (oldStationId !== newStationId) {
      this.setState({ listMessages: [] });
      this.subscribeToFirebase(newStationId);
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

    const message = this.messageBox.value.trim();
    const { id, name } = this.state.userInfo;
    let { avatarUrl } = this.state.userInfo;
    avatarUrl = avatarUrl || '';
    if (message) {
      (window as any).firebase
        .database()
        .ref(this.props.stationId)
        .push({
          userId: id,
          name,
          avatarUrl,
          message,
        });
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
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  public toggleChatBox = () => {
    this.setState(
      {
        toggleChatBox: !this.state.toggleChatBox,
        hasNewMessage: false,
      },
      () => {
        if (this.state.toggleChatBox) {
          this.scrollDownMessagesContainer();
        }
      },
    );
  };

  public render() {
    const { toggleChatBox, hasNewMessage } = this.state;
    return (
      <div
        className={classNames('p-0 station-chat-container', {
          'col-10 col-md-6 col-lg-4': toggleChatBox,
          'chat-box-dimension': toggleChatBox,
        })}>
        {!toggleChatBox && (
          <div
            className={classNames('chat-box-button', {
              'chat-box-button-custom': hasNewMessage,
            })}
            onClick={this.toggleChatBox}>
            <span>
              <i className="fa fa-comments" />
            </span>
          </div>
        )}
        {toggleChatBox && (
          <div className="chat-box">
            <div className="chat-container">
              <div className="d-flex justify-content-end chat-toolbar">
                <span className="close-button" onClick={this.toggleChatBox}>
                  <i className="fa fa-minus" />
                </span>
              </div>
              <div className="messages-container" id="messages-container">
                {this.state.listMessages.map(
                  (message: Message, index: number) => {
                    return (
                      <ChatMessage
                        key={index}
                        isOfCurrentUser={
                          this.state.userInfo
                            ? this.state.userInfo.id === message.userId
                            : false
                        }
                        userName={message.name}
                        avatarUrl={
                          message.avatarUrl
                            ? message.avatarUrl
                            : DEFAULT_USER_AVATAR
                        }
                        message={message.message}
                      />
                    );
                  },
                )}
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
                  rows={1}
                />
                <button className="btn-send-message" onClick={this.sendMessage}>
                  <i className="fa fa-paper-plane" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  private subscribeToFirebase(stationId: string) {
    const msgRef = (window as any).firebase
      .database()
      .ref(stationId)
      .limitToLast(MAXIMUM_RECEIVED_MESSAGE);
    msgRef.on('value', (snapshot: any) => {
      const listMessages: Message[] = [];
      snapshot.forEach((childSnapshot: any) => {
        const msg = childSnapshot.val();
        listMessages.push(msg);
      });
      this.setState({ listMessages });
    });
  }
}
