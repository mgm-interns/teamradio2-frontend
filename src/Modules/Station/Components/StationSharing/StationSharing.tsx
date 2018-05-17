import { BaseComponent } from 'BaseComponent';
import * as React from 'react';
import { Input, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './StationSharing.scss';

const FACEBOOK_SHARING = 'https://www.facebook.com/sharer/sharer.php?u=';
const GOOGLE_PLUS_SHARING = 'https://plus.google.com/share?url=';
const TWITTER_SHARING = 'http://twitter.com/share?url=';

interface IProps {
  stationId: string;
}

interface IState {
  popoverOpen: any;
  url: string;
  copied: boolean;
}

export class StationSharing extends BaseComponent<IProps, IState> {
  private inputRef: any;

  constructor(props: IProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      url: '',
      copied: false,
    };
  }

  public componentDidMount() {
    this.setStationUrl(this.props.stationId);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.stationId !== nextProps.stationId) {
      this.setStationUrl(nextProps.stationId);
    }
  }

  public setStationUrl(stationId: string) {
    this.setState({
      url: StationSharing._transformUrl(stationId),
    });
  }

  public toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  // tslint:disable-next-line
  public static _transformUrl(stationId: string) {
    /**
     * Only need to return window.location
     */
    return window.location.href;
  }

  // tslint:disable-next-line
  public _copyToClipboard() {
    try {
      this.inputRef.select();
      document.execCommand('Copy');

      this.setState({ copied: true });
      this.showSuccess('Successfully copied to clipboard!');
    } catch (error) {
      console.error(error);
    }
  }

  // tslint:disable-next-line
  public _shareTo(prefix: string) {
    try {
      window.open(`${prefix}${this.state.url}`, '_newtab');
    } catch (error) {
      console.error(error);
    }
  }

  public ref = (input: any) => {
    this.inputRef = input;
  };

  public _renderPopoverContent = () => {
    return (
      <div>
        <Input
          readOnly
          value={this.state.url || ''}
          innerRef={this.ref}
          className="input-link"
        />
        <div className="buttons-wrapper">
          <div
            className="btn-icon"
            onClick={() => this._shareTo(FACEBOOK_SHARING)}>
            <i className="fa fa-facebook" />
          </div>
          <div
            className="btn-icon"
            onClick={() => this._shareTo(GOOGLE_PLUS_SHARING)}>
            <i className="fa fa-google" />
          </div>
          <div
            className="btn-icon"
            onClick={() => this._shareTo(TWITTER_SHARING)}>
            <i className="fa fa-twitter" />
          </div>
          <div
            className="btn-icon btn-clipboard"
            onClick={() => this._copyToClipboard()}>
            <i className="fa fa-clipboard" />
          </div>
        </div>
      </div>
    );
  };

  public render() {
    return [
      <div
        key={1}
        id="share-station"
        className="btn-icon"
        onClick={this.toggle}>
        <i className="fa fa-share-alt" />
      </div>,
      <Popover
        key={2}
        placement="bottom"
        isOpen={this.state.popoverOpen}
        target="share-station"
        toggle={this.toggle}>
        <PopoverHeader>Share {'station name'} to your friends</PopoverHeader>
        <PopoverBody>{this._renderPopoverContent()}</PopoverBody>
      </Popover>,
    ];
  }
}
