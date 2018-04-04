import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, UncontrolledTooltip } from 'reactstrap';
import './PlaylistItem.scss';

export class PlaylistItem extends Component<any, any> {
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
    this.setState({
      isUpVote: !this.state.isUpVote,
      upVotes: !this.state.isUpVote
        ? this.state.upVotes + 1
        : this.state.upVotes - 1,
    });
  }

  public setDownVote() {
    this.setState({
      isDownVote: !this.state.isDownVote,
      downVotes: !this.state.downVotes
        ? this.state.downVotes + 1
        : this.state.downVotes - 1,
    });
  }

  public render() {
    const {
      song_id,
      title,
      isPlaying,
      thumbnail,
      creator,
      duration,
      willBeSkipped,
      message,
    } = this.props;
    const classes = isPlaying
      ? 'playlist-item-container isPlaying'
      : 'playlist-item-container';
    return (
      <Card className={classes}>
        <Row className="item-row">
          <Col xs="3" className="item-col-video">
            <img className="item-img" src={thumbnail} />
            {!willBeSkipped ? (
              <div className="duration">{duration}</div>
            ) : (
              <div>
                <div className="skip-icon" id={`WillBeSkipped` + song_id}>
                  <i className="fa fa-step-forward" />
                </div>
                <UncontrolledTooltip
                  placement="bottom"
                  target={
                    `WillBeSkipped` + song_id
                  }>{`'This song will be skipped when player starts it.'`}</UncontrolledTooltip>
              </div>
            )}
          </Col>
          <Col xs={9} className="item-col-title-vote">
            <Row className="item-row-title-vote">
              <Col xs={10} className="item-col-title">
                <h5 className="item-title" id={`Song` + song_id}>
                  {title}
                </h5>
                <UncontrolledTooltip
                  placement="bottom"
                  target={`Song` + song_id}>
                  {title}
                </UncontrolledTooltip>
                <div className="item-addedBy">
                  <span>Added by</span>
                  {creator ? (
                    <Link to={`/login`}>
                      <img
                        className="avatar"
                        id={'UserAvatar' + song_id}
                        src={creator.avatar_url}
                      />
                      <UncontrolledTooltip
                        placement="bottom"
                        target={'UserAvatar' + song_id}>
                        {creator.username}
                      </UncontrolledTooltip>
                      {message ? (
                        <div>
                          <i
                            className="icon-speech icons icon-message"
                            id={'Message' + song_id}
                          />
                          <UncontrolledTooltip
                            placement="bottom"
                            target={'Message' + song_id}>
                            {message}
                          </UncontrolledTooltip>
                        </div>
                      ) : null}
                    </Link>
                  ) : (
                    ' a user'
                  )}
                </div>
              </Col>
              <Col xs={2} className="item-col-favourite">
                <div className="favourite-icon" id="favouriteIcon">
                  {this.state.isFavourite ? (
                    <i
                      className="fa fa-star isActive"
                      onClick={() => this.setFavouriteSong()}
                    />
                  ) : (
                    <i
                      className="fa fa-star-o"
                      onClick={() => this.setFavouriteSong()}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="vote-icon">
          {this.state.isUpVote ? (
            <i
              className="fa fa-thumbs-up thumbs-icon isActive"
              onClick={() => this.setUpVote()}
            />
          ) : (
            <i
              className="fa fa-thumbs-up thumbs-icon "
              onClick={() => this.setUpVote()}
            />
          )}
          <span className="padding-right">{this.state.upVotes}</span>
          {this.state.isDownVote ? (
            <i
              className="fa fa-thumbs-down thumbs-icon isActive"
              onClick={() => this.setDownVote()}
            />
          ) : (
            <i
              className="fa fa-thumbs-down thumbs-icon"
              onClick={() => this.setDownVote()}
            />
          )}
          <span>{this.state.downVotes}</span>
        </div>
      </Card>
    );
  }
}
