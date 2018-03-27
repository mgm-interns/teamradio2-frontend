import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';
import { Row, Col, Container } from 'reactstrap';
import './Station.scss';

import { NowPlaying, Sharing } from '../../Modules/Station/Components';

const buttonActions = {
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
  share: {
    iconOn: 'fa fa-share-alt',
    iconOff: 'fa fa-share-alt',
  },
};

interface Props {}

interface State {
  muted: boolean;
  isPassive: boolean;
}

export class Station extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      muted: true,
      isPassive: false,
    };
  }

  _onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  _onLightClick = () => {
    this.setState({
      isPassive: !this.state.isPassive,
    });
  };

  render() {
    const muted = this.state.muted;
    const isPassive = this.state.isPassive;

    const _renderButton = (
      flag: boolean,
      { iconOn, iconOff }: any,
      handleClick: any,
    ) => {
      const classes = {
        icon: classNames(flag ? iconOn : iconOff),
      };
      const activeButton = flag ? 'btn-primary' : 'btn-default';

      return (
        <button
          type="button"
          className={classNames(['btn btn-no-shadow', activeButton])}
          onClick={handleClick}
        >
          <i className={classes.icon} />
        </button>
      );
    };

    return (
      <Container>
        <Row className="u-margin-top-medium">
          <Col xs={12} lg={8}>
            <Row className="title-container">
              <div>
                <h1>Station name</h1>
              </div>
              <div className="nowplaying-actions">
                {_renderButton(muted, buttonActions.muted, this._onVolumeClick)}
                {_renderButton(
                  isPassive,
                  buttonActions.passive,
                  this._onLightClick,
                )}
                <Sharing />
              </div>
            </Row>
            <NowPlaying muted={muted} />
          </Col>
          <Col xs={12} lg={4}>
            <div>
              <span>this is playlist</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
