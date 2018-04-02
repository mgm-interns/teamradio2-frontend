import * as classNames from 'classnames';
import { AddSong } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Station.scss';

import { NowPlaying, StationSharing } from '../../Modules/Station/Components';

const buttonActions = {
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
};

interface IProps {} // tslint:disable-line

interface IState {
  muted: boolean;
  isPassive: boolean;
}

export class Station extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
    };
  }

  public _onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  public _onLightClick = () => {
    this.setState({
      isPassive: !this.state.isPassive,
    });
  };

  public _renderButton = (
    flag: boolean,
    { iconOn, iconOff }: any,
    handleClick: any,
  ) => {
    const classes = {
      icon: classNames(flag ? iconOn : iconOff),
    };
    const activeButton = flag ? 'color: red' : null;

    return (
      <div className="icon-wrapper" onClick={handleClick}>
        <i className={classNames([classes.icon, activeButton, 'icon'])} />
      </div>
    );
  };

  public _renderHeaderStation = (muted: boolean, isPassive: boolean) => {
    return (
      <Row className="header-container">
        <div>
          <h1>Station name</h1>
        </div>
        <div className="buttons-wrapper">
          {this._renderButton(!muted, buttonActions.muted, this._onVolumeClick)}
          {this._renderButton(
            isPassive,
            buttonActions.passive,
            this._onLightClick,
          )}
          <StationSharing />
        </div>
      </Row>
    );
  };

  public render() {
    const muted = this.state.muted;
    const isPassive = this.state.isPassive;

    return (
      <Container>
        <Row className="u-margin-top-medium">
          <Col xs={12} lg={8}>
            {this._renderHeaderStation(muted, isPassive)}
            <NowPlaying muted={muted} />
          </Col>
          <Col xs={12} lg={4}>
            <div>
              <span>this is playlist</span>
            </div>
          </Col>
          <Col xs={12}>
            <div className="add-song-container">
              <h1>Add Song</h1>
              <AddSong/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
