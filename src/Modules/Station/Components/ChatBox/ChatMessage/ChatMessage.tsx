import { DEFAULT_USER_AVATAR } from 'Modules/User/Constants';
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

  public render() {
    const { isOfCurrentUser, avatarUrl, userName, message } = this.props;
    return (
      <div className="chat-item-container">
        <div className={isOfCurrentUser ? 'message-right' : 'message-left'}>
          <div className={isOfCurrentUser ? 'display-none' : ''}>
            <img
              src={
                this.isValidAvatar(avatarUrl) ? avatarUrl : DEFAULT_USER_AVATAR
              }
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

  private isValidAvatar = (avatarUrl: string) => {
    switch (avatarUrl) {
      case '':
        return false;
      case 'null':
        return false;
      case 'undefined':
        return false;
      default:
        return true;
    }
  };
}
