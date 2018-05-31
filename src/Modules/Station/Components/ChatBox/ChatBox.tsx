import firebase from '@firebase/app';
import '@firebase/database';
import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Inject } from 'Configuration/DependencyInjection';
import { localStorageManager } from 'Helpers';
import { Message } from 'Models';
import { RegisteredUser } from 'Models/User';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  MAXIMUM_RECEIVED_MESSAGE,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from 'Modules/Station/Constants';
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
  isChatBoxOpen: boolean;
  hasNewMessage: boolean;
}

export class ChatBox extends BaseComponent<IChatBoxProps, IChatBoxStates> {
  private static initializeFirebaseConfig() {
    const config = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  private messageBox: any;
  private messageRef: any;
  @Inject('StationServices') private stationServices: StationServices;

  constructor(props: IChatBoxProps) {
    super(props);
    this.state = {
      userInfo: null,
      listMessages: [],
      isChatBoxOpen: false,
      hasNewMessage: false,
    };
    ChatBox.initializeFirebaseConfig();
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

  public UNSAFE_componentWillReceiveProps(nextProps: IChatBoxProps) {
    const { stationId: oldStationId } = this.props;
    const { stationId: newStationId } = nextProps;

    if (oldStationId !== newStationId) {
      this.switchStation(oldStationId, newStationId);
    }
  }

  public render() {
    const { isChatBoxOpen, hasNewMessage } = this.state;
    return (
      <div
        className={classNames('p-0 station-chat-container', {
          'col-10 col-md-6 col-lg-4': isChatBoxOpen,
          'chat-box-dimension': isChatBoxOpen,
        })}>
        {isChatBoxOpen
          ? this.renderChatBox()
          : this.renderFloatChatButton(hasNewMessage)}
      </div>
    );
  }

  private renderChatBox() {
    return (
      <div className="chat-box">
        <div className="chat-container">
          <div
            className="d-flex justify-content-end chat-toolbar"
            onClick={this.toggleChatBox}>
            <span className="close-button" onClick={this.toggleChatBox}>
              <i className="fa fa-minus" />
            </span>
          </div>
          <div className="messages-container" id="messages-container">
            {this.state.listMessages.map((message: Message, index: number) =>
              this.renderMessage(message, index),
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
    );
  }

  private renderFloatChatButton(hasNewMessage: boolean) {
    return (
      <div
        className={classNames('chat-box-button', {
          'chat-box-button-custom': hasNewMessage,
        })}
        onClick={this.toggleChatBox}>
        <span>
          <i className="fa fa-comments" />
        </span>
      </div>
    );
  }

  private renderMessage(message: Message, key: number) {
    const currentUserId = this.state.userInfo ? this.state.userInfo.id : '';
    return (
      <ChatMessage key={key} currentUserId={currentUserId} message={message} />
    );
  }

  private scrollDownMessagesContainer() {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  private onMessageChange(event: any) {
    const key = event.keyCode ? event.keyCode : event.which;
    const KEY_CODE_ENTER = 13;

    if (key === KEY_CODE_ENTER) {
      this.sendMessage(event);
    } else {
      this.resizeMessageBox();
    }
  }

  /**
   * Handle on switch station
   * You may be want to close all subscriptions and async task
   * before switch to new station
   *
   * @param {string} fromStationId Id of station before switch
   * @param {string} toStationId Id of station after switch
   */
  private switchStation(fromStationId: string, toStationId: string) {
    this.setState({ listMessages: [] });
    this.subscribeToFirebase(toStationId);
  }

  private resizeMessageBox() {
    setTimeout(() => {
      this.messageBox.style.height = '30px';
      this.messageBox.style.height = this.messageBox.scrollHeight + 'px';
    });
  }

  private sendMessage(event: any) {
    if (!this.isLoggedIn()) {
      this.showError('You must login to be able to chat');
      this.resetMessageBox(event);
      return;
    }

    const messageValue = this.messageBox.value.trim();
    if (messageValue) {
      const msgRef = this.messageRef.push();
      const message: Message = this.generateMessageValue(
        msgRef,
        this.state.userInfo,
        messageValue,
      );
      msgRef.set(message);
    }
    this.resetMessageBox(event);
  }

  private generateMessageValue = (
    msgRef: any,
    { id, name, username, avatarUrl }: RegisteredUser,
    messageValue: string,
  ) => {
    return {
      _id: `${msgRef.key}`,
      userId: id,
      name,
      username: username || name || id,
      avatarUrl: avatarUrl || '',
      message: messageValue,
      createdAt: new Date().getTime(),
    };
  };

  private resetMessageBox(event: any) {
    this.messageBox.value = '';
    this.messageBox.style.height = '30px';
    event.preventDefault();
  }

  private toggleChatBox = () => {
    this.setState(
      {
        isChatBoxOpen: !this.state.isChatBoxOpen,
        hasNewMessage: false,
      },
      () => {
        if (this.state.isChatBoxOpen) {
          this.scrollDownMessagesContainer();
        }
      },
    );
  };

  private subscribeToFirebase(stationId: string) {
    this.messageRef = (firebase as any).database().ref(stationId);

    this.messageRef
      .limitToLast(MAXIMUM_RECEIVED_MESSAGE)
      .on('value', (snapshot: any) => {
        const listMessages: Message[] = [];
        snapshot.forEach((childSnapshot: any) => {
          const msg = childSnapshot.val();
          listMessages.push(msg);
        });
        this.setState({ listMessages });
      });
  }
}
