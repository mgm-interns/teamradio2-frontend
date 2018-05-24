import { isSameDay, isSameYear } from 'Helpers';
import { Message } from 'Models/Station';
import { DEFAULT_USER_AVATAR } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from 'reactstrap/lib/Tooltip';
import './ChatMessage.scss';

export interface IChatMessageProps {
  currentUserId: string;
  message: Message;
}

interface IChatMessageState {
  userAvatarTooltipOpen: boolean;
  myMessageTooltipOpen: boolean;
}

export class ChatMessage extends Component<
  IChatMessageProps,
  IChatMessageState
> {
  private static getDateTimeFromTimestamp(timestamp: number) {
    const today = new Date();
    const sentDate = new Date(timestamp);

    if (isSameDay(today, sentDate)) {
      return sentDate.toLocaleTimeString();
    }

    if (isSameYear(today, sentDate)) {
      const dateUnFormat = sentDate.toDateString();
      const dateStr = dateUnFormat.substring(0, dateUnFormat.length - 4);
      const timeStr = sentDate.toLocaleTimeString();
      return `${dateStr}, ${timeStr}`;
    }

    // in other year
    const date = sentDate.toDateString();
    const time = sentDate.toLocaleTimeString();
    return `${date}, ${time}`;
  }

  constructor(props: IChatMessageProps) {
    super(props);

    this.state = {
      userAvatarTooltipOpen: false,
      myMessageTooltipOpen: false,
    };
    this.toggleUserAvatarTooltip = this.toggleUserAvatarTooltip.bind(this);
    this.toggleMyMessageTooltip = this.toggleMyMessageTooltip.bind(this);
  }

  public render() {
    const { message, currentUserId } = this.props;
    const isOfCurrentUser = currentUserId === message.userId;
    return (
      <div className="chat-item-container">
        <div className={isOfCurrentUser ? 'message-right' : 'message-left'}>
          {this.renderMessageAvatar(message)}
          {this.renderMessageContent(message)}
        </div>
      </div>
    );
  }

  private renderMessageAvatar(message: Message) {
    // TODO: Modifier to allow overflow
    const modifierTooltip = {};
    const isOfCurrentUser = this.props.currentUserId === message.userId;
    const sentTime = ChatMessage.getDateTimeFromTimestamp(message.createdAt);

    return (
      <div className={isOfCurrentUser ? 'display-none' : ''}>
        <Link to={`/profile/${message.userId}`}>
          <img
            src={message.avatarUrl || DEFAULT_USER_AVATAR}
            className="rounded-circle avatar"
            id={`sender-of-${message._id}`}
          />
        </Link>
        <Tooltip
          target={`sender-of-${message._id}`}
          placement="right"
          isOpen={this.state.userAvatarTooltipOpen}
          toggle={this.toggleUserAvatarTooltip}
          delay={0}
          modifiers={modifierTooltip}>
          {`${message.name} ${sentTime}`}
        </Tooltip>
      </div>
    );
  }

  private renderMessageContent(message: Message) {
    const sentTime = ChatMessage.getDateTimeFromTimestamp(message.createdAt);
    const isOfCurrentUser = this.props.currentUserId === message.userId;
    return (
      <div className="message-container">
        <div className={isOfCurrentUser ? 'display-none' : 'username'}>
          {message.name}
        </div>
        <div className="message-content" id={`message-content-${message._id}`}>
          {message.message}
        </div>
        {isOfCurrentUser && (
          <Tooltip
            target={`message-content-${message._id}`}
            placement="right"
            isOpen={this.state.myMessageTooltipOpen}
            toggle={this.toggleMyMessageTooltip}
            delay={0}>
            {sentTime}
          </Tooltip>
        )}
      </div>
    );
  }

  private toggleUserAvatarTooltip() {
    this.setState({
      userAvatarTooltipOpen: !this.state.userAvatarTooltipOpen,
    });
  }

  private toggleMyMessageTooltip() {
    this.setState({
      myMessageTooltipOpen: !this.state.myMessageTooltipOpen,
    });
  }
}
