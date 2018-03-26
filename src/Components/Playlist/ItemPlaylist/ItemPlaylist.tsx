import * as React from 'react';
import { Component } from 'react';
import { Card, Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import './ItemPlaylist.scss';

export class ItemPlaylist extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      isUpVote: false,
      isDownVote: false,
      upVotes: 0,
      downVotes: 0,
      isFavourite: false,
    };
    this.setFavouriteSong = this.setFavouriteSong.bind(this);
    this.setUpVote = this.setUpVote.bind(this);
  }

  setFavouriteSong() {
    this.setState({
      isFavourite: !this.state.isFavourite
    })
  }

  setUpVote() {
    this.setState({
      isUpVote: !this.state.isUpVote
    })
  }

  setDownVote() {
    this.setState({
      isDownVote: !this.state.isDownVote
    })
  }

  render(){
    const isSkip = this.props.isSkip;
    const mess = this.props.mess ? this.props.mess : undefined;
    const classes = this.props.isPlaying ? "item-playlist-container isPlaying" : "item-playlist-container";
    return(
      <Card className={classes}>
        <Row className="item-row">
          <Col xs="3" className="item-col-video">
            <img className="item-img" src="https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg"/>
            {!isSkip ? (<div className="duration">20:06</div>) : (
              <div className="skip-icon" id="idSongSkipped"><i className="fa fa-step-forward"></i></div>)}
            <UncontrolledTooltip placement="bottom"
                                 target="idSongSkipped">{`'This song will be skipped when player starts it.'`}</UncontrolledTooltip>
          </Col>
          <Col xs={9} className="item-col-title-vote">
            <Row className="item-row-title-vote">
              <Col xs={10} className="item-col-title">
                <h5 className="item-title" id="idSong">ABC Song</h5>
                <UncontrolledTooltip placement="bottom"
                                     target="idSong">{`ABC-Song ^.^`}</UncontrolledTooltip>
                <div className="item-addedBy">
                  <span>Added by</span>
                  <Link to={`/login`}>
                    <img className="avatar" id="idUserAvatar"
                         src="https://res.cloudinary.com/cocacode2/image/upload/v1517992692/hhunvpjq7ogvoehk7flk.png"/>
                    <UncontrolledTooltip placement="bottom" target="idUserAvatar">{`ThuyTien`}</UncontrolledTooltip>
                    {mess ? (<div>
                      <i className="icon-speech icons icon-message" id="idMessage"></i>
                      <UncontrolledTooltip placement="bottom"
                                           target="idMessage">{mess}</UncontrolledTooltip>
                    </div>) : null}

                  </Link>
                </div>
              </Col>
              <Col xs={2} className="item-col-favourite">
                <div className="favourite-icon" id="favouriteIcon">
                  {this.state.isFavourite ? (
                    <i className="fa fa-star isActive" onClick={() => this.setFavouriteSong()}></i>) : (
                    <i className="fa fa-star-o" onClick={() => this.setFavouriteSong()}></i>)}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="vote-icon">
          {this.state.isUpVote ? (
            <i className="fa fa-thumbs-up thumbs-icon isActive" onClick={() => this.setUpVote()}></i>) : (
            <i className="fa fa-thumbs-up thumbs-icon " onClick={() => this.setUpVote()}></i>)}
          <span className="padding-right">{2}</span>
          {this.state.isDownVote ? (
            <i className="fa fa-thumbs-down thumbs-icon isActive" onClick={() => this.setDownVote()}></i>) : (
            <i className="fa fa-thumbs-down thumbs-icon" onClick={() => this.setDownVote()}></i>)}
          <span>{2}</span>
        </div>
      </Card>
    )
  }
}