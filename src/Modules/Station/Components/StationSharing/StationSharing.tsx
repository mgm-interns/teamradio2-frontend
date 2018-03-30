import { Component } from 'react';
import * as React from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
} from 'reactstrap';
import './StationSharing.scss';

const FACEBOOK_SHARING = 'https://www.facebook.com/sharer/sharer.php?u=';
const GOOGLE_PLUS_SHARING = 'https://plus.google.com/share?url=';
const TWITTER_SHARING = 'http://twitter.com/share?url=';

interface IProps {} // tslint:disable-line

interface IState {
  popoverOpen: any;
  url: string;
  copied: boolean;
}

// TODO: solve this tslint problem in class property (public, private)
export class StationSharing extends Component<IProps, IState> {
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
    this.setStationUrl(this.props);
  }

  public setStationUrl(nextProps = {}) {
    this.setState({
      url: StationSharing._transformUrl(),
    });
  }

  public toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  // tslint:disable-next-line
  public static _transformUrl() {
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
