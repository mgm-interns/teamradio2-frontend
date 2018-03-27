import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';
import { Row, Col, Container, Button } from 'reactstrap';
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
      const activeButton = flag ? 'primary' : 'secondary';

      return (
        <Button
          type="button"
          color={activeButton}
          className="btn btn-no-shadow"
          onClick={handleClick}
        >
          <i className={classes.icon} />
        </Button>
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
                <StationSharing />
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
