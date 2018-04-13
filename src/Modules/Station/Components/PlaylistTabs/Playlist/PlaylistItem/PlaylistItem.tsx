import * as classNames from 'classnames';
import { YoutubeHelper } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Progress, Row, UncontrolledTooltip } from 'reactstrap';
import './PlaylistItem.scss';

interface IPlayListItemProps {
  upVotes: number;
  downVotes: number;
  id: any;
  title: string;
  thumbnail: any;
  creator: any;
  duration: number;
  willBeSkipped: boolean;
  message: string;
  status: string;
}

export class PlaylistItem extends Component<IPlayListItemProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isUpVote: false,
      isDownVote: false,
      isFavourite: false,
      upVotes: this.props.upVotes,
      downVotes: this.props.downVotes,
    };
    this.setFavouriteSong = this.setFavouriteSong.bind(this);
    this.setUpVote = this.setUpVote.bind(this);
  }

  public setFavouriteSong() {
    this.setState({
      isFavourite: !this.state.isFavourite,
    });
  }

  public setUpVote() {
    const { isUpVote, upVotes } = this.state;

    this.setState({
      isUpVote: !isUpVote,
      upVotes: !isUpVote ? upVotes + 1 : upVotes - 1,
    });
  }

  public setDownVote() {
    const { isDownVote, downVotes } = this.state;
    this.setState({
      isDownVote: !isDownVote,
      downVotes: !downVotes ? downVotes + 1 : downVotes - 1,
    });
  }

  public _renderThumbnail = () => {
    const { id, thumbnail, duration, willBeSkipped } = this.props;

    return (
      <Col xs={3} className="p-0 thumbnail-container">
        <img className="video-img" src={thumbnail} />
        <div className="duration">
          {YoutubeHelper.convertDuration(duration)}
        </div>
        {willBeSkipped ? (
          <div className="skip-bg" id={`WillBeSkipped` + id}>
            <div className="skip-icon">
              <i className="fa fa-step-forward" />
            </div>
            <UncontrolledTooltip
              placement="right"
              target={
                `WillBeSkipped` + id
              }>{`This song will be skipped when player starts it.`}</UncontrolledTooltip>
          </div>
        ) : null}
      </Col>
    );
  };

  public _renderCreator = () => {
    const { id, creator, message } = this.props;

    return (
      <Col xs={7} className="pl-0">
        <div className="h-100 item-addedBy">
          <span className="title">Added by</span>
          <Link to={`/login`} className="creator-container">
            {creator && (
              <div>
                <img
                  className="avatar"
                  id={'UserAvatar' + id}
                  src={creator.avatarUrl}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target={'UserAvatar' + id}>
                  {creator.username}
                </UncontrolledTooltip>
              </div>
            )}

            {message ? (
              <span className="message-icon">
                <i
                  className="icon-speech icons icon-message"
                  id={'Message' + id}
                />
                <UncontrolledTooltip placement="bottom" target={'Message' + id}>
                  {message}
                </UncontrolledTooltip>
              </span>
            ) : null}
          </Link>
        </div>
      </Col>
    );
  };

  public _renderVotingSection = () => {
    return (
      <Col xs={5} className="d-flex align-items-end pr-0">
        <div className="w-100 vote-container">
          <div className="d-flex vote-icons">
            <span onClick={() => this.setUpVote()} className="like-icon">
              <i className="fa fa-thumbs-up thumbs-icon" />
              {this.state.upVotes}
            </span>
            <span onClick={() => this.setDownVote()} className="dislike-icon">
              <i className="fa fa-thumbs-down thumbs-icon" />
              {this.state.downVotes}
            </span>
          </div>
          <Progress value={50} />
        </div>
      </Col>
    );
  };

  public render() {
    const {id, title, status} = this.props;

    const { isFavourite } = this.state;

    return (
      <Row
        className={classNames('m-0', 'item-container', {
          'playing-item': status !== null,
        })}>
        {this._renderThumbnail()}
        <Col xs={9} className="pr-0">
          <Row className="m-0 h-100">
            <Col xs={10} className="pl-0 item-title">
              <h6 className="item-title" id={`Song` + id}>
                {title}
              </h6>
              <UncontrolledTooltip placement="bottom" target={`Song` + id}>
                {title}
              </UncontrolledTooltip>
            </Col>
            <Col xs={2} className="pr-0">
              <div
                className="action-icon"
                onClick={() => this.setFavouriteSong()}>
                <i
                  className={classNames(
                    'fa',
                    { 'fa-star-o': !isFavourite },
                    { 'fa-star': isFavourite },
                    { isActive: isFavourite },
                  )}
                />
              </div>
            </Col>
            {this._renderCreator()}
            {this._renderVotingSection()}
          </Row>
        </Col>
      </Row>
    );
  }
}
