import * as classNames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import { Row } from 'reactstrap';
import './StationHeader.scss';

import { ConfigurationButton, StationSharing } from 'Modules/Station';

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

interface IProps {
  muted: boolean;
  isPassive: boolean;
  onVolumeClick: (e: React.FormEvent<EventTarget>) => void;
  onLightClick: (e: React.FormEvent<EventTarget>) => void;
  stationName: string,
}

interface IState {
  muted: boolean;
  isPassive: boolean;
}

export class StationHeader extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public renderButton = (
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

  public render() {
    const { muted, isPassive, onVolumeClick, onLightClick, stationName } = this.props;

    return (
      <Row className="header-container">
        <div>
          <h1>{stationName}</h1>
        </div>
        <div className="buttons-wrapper">
          {this.renderButton(!muted, buttonActions.muted, onVolumeClick)}
          {this.renderButton(isPassive, buttonActions.passive, onLightClick)}
          <StationSharing />
          <ConfigurationButton />
        </div>
      </Row>
    );
  }
}
