import { BaseComponent } from 'BaseComponent';
import * as React from 'react';
import './ChatBox.scss';
import { ChatMessage, IChatMessageProps } from './ChatMessage';

interface IChatBoxStates {
  listMessages: IChatMessageProps[];
}

export class ChatBox extends BaseComponent<{}, IChatBoxStates> {
  private messageBox: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      listMessages: null,
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  public componentWillMount() {
    this.getListMessages();
  }

  public componentDidMount() {
    this.scrollDownMessagesContainer();
  }

  // Dummy data
  public getListMessages() {
    const listMessages = [];
    for (let i = 0; i < 20; i += 1) {
      let message: IChatMessageProps;
      if (i % 2 === 0) {
        message = {
          isOfCurrentUser: false,
          avatarUrl: './img/female-01.png',
          userName: 'Quoc Nguyen',
          message: 'Hello world',
        };
      } else {
        message = {
          isOfCurrentUser: true,
          avatarUrl: '',
          userName: '',
          message: 'Hello world',
        };
      }
      listMessages.push(message);
    }
    this.setState({
      listMessages,
    });
  }

  public onMessageChange(event: any) {
    const key = event.keyCode ? event.keyCode : event.which;
    if (key === 13) {
      // Send message if user press enter
      this.sendMessage(event);
    } else {
      // Resize message box to display all message content
      this.resizeMessageBox();
    }
  }

  public resizeMessageBox() {
    setTimeout(() => {
      this.messageBox.style.height = '30px';
      this.messageBox.style.height = this.messageBox.scrollHeight + 'px';
    });
  }

  public sendMessage(event: any) {
    const messageContent = this.messageBox.value.trim();
    if (messageContent) {
      const message = {
        isOfCurrentUser: true,
        avatarUrl: '',
        userName: '',
        message: messageContent,
      };
      const listMessages = this.state.listMessages;
      listMessages.push(message);
      this.setState({
        listMessages,
      });
    }
    this.setMessageBoxAsDefault(event);
    setTimeout(() => {
      this.scrollDownMessagesContainer();
    });
  }

  public setMessageBoxAsDefault(event: any) {
    this.messageBox.value = '';
    this.messageBox.style.height = '30px';
    event.preventDefault();
  }

  public scrollDownMessagesContainer() {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  public render() {
    return (
      <div className="chat-container">
        <div className="messages-container" id="messages-container">
          {this.state.listMessages.map(
            (message: IChatMessageProps, index: number) => {
              return (
                <ChatMessage
                  key={index}
                  isOfCurrentUser={message.isOfCurrentUser}
                  avatarUrl={message.avatarUrl}
                  userName={message.userName}
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
          />
          <button className="btn-send-message" onClick={this.sendMessage}>
            <i className="fa fa-paper-plane" />
          </button>
        </div>
      </div>
    );
  }
}
