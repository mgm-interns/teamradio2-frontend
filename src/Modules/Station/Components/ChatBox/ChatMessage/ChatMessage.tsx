import { DEFAULT_USER_AVATAR } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import './ChatMessage.scss';

export interface IChatMessageProps {
  isOfCurrentUser: boolean;
  avatarUrl: string;
  userName: string;
  message: string;
}

export class ChatMessage extends Component<IChatMessageProps, {}> {
  constructor(props: IChatMessageProps) {
    super(props);
  }

  public getUserAvatar(avatarURL: string): string {
    // TODO: client has to handle it because server return avatarUrl: "null". Will be updated when backend fix this bug
    if (avatarURL && avatarURL !== 'null') {
      return avatarURL;
    }
    return DEFAULT_USER_AVATAR;
  }

  public render() {
    const { isOfCurrentUser, avatarUrl, userName, message } = this.props;
    return (
      <div className="chat-item-container">
        <div className={isOfCurrentUser ? 'message-right' : 'message-left'}>
          <div className={isOfCurrentUser ? 'display-none' : ''}>
            <img
              src={this.getUserAvatar(avatarUrl)}
              className="rounded-circle avatar"
            />
          </div>
          <div className="message-container">
            <div className={isOfCurrentUser ? 'display-none' : 'username'}>
              {userName}
            </div>
            <div className="message-content">{message}</div>
          </div>
        </div>
      </div>
    );
  }
}
