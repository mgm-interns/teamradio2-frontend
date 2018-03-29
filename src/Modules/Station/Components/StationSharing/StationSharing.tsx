import { Component } from 'react';
import * as React from 'react';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Input,
  Row,
  Col,
  Container,
} from 'reactstrap';
import './StationSharing.scss';

const FACEBOOK_SHARING = 'https://www.facebook.com/sharer/sharer.php?u=';
const GOOGLE_PLUS_SHARING = 'https://plus.google.com/share?url=';
const TWITTER_SHARING = 'http://twitter.com/share?url=';

interface Props {}

interface State {
  popoverOpen: any;
  url: string;
  copied: boolean;
}

export class StationSharing extends Component<Props, State> {
  private inputRef: any;

  constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      url: '',
      copied: false,
    };
  }

  componentDidMount() {
    this.setStationUrl(this.props);
  }

  setStationUrl(nextProps = {}) {
    this.setState({
      url: StationSharing._transformUrl(),
    });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  // eslint-disable-next-line
  static _transformUrl() {
    /**
     * Only need to return window.location
     */
    return window.location.href;
  }

  _copyToClipboard() {
    try {
      this.inputRef.select();
      document.execCommand('Copy');

      this.setState({ copied: true });
    } catch (error) {
      console.error(error);
    }
  }

  _shareTo(prefix: string) {
    try {
      window.open(`${prefix}${this.state.url}`, '_newtab');
    } catch (error) {
      console.error(error);
    }
  }

  ref = (input: any) => {
    this.inputRef = input;
  };

  _renderPopoverContent = () => {
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
            onClick={() => this._shareTo(FACEBOOK_SHARING)}
          >
            <i className="fa fa-facebook" />
          </div>
          <div
            className="btn-icon"
            onClick={() => this._shareTo(GOOGLE_PLUS_SHARING)}
          >
            <i className="fa fa-google" />
          </div>
          <div
            className="btn-icon"
            onClick={() => this._shareTo(TWITTER_SHARING)}
          >
            <i className="fa fa-twitter" />
          </div>
          <div
            className="btn-icon btn-clipboard"
            onClick={() => this._copyToClipboard()}
          >
            <i className="fa fa-clipboard" />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return [
      <div
        key={1}
        id="share-station"
        className="btn-icon"
        onClick={this.toggle}
      >
        <i className="fa fa-share-alt" />
      </div>,
      <Popover
        key={2}
        placement="bottom"
        isOpen={this.state.popoverOpen}
        target="share-station"
        toggle={this.toggle}
      >
        <PopoverHeader>Share {'station name'} to your friends</PopoverHeader>
        <PopoverBody>{this._renderPopoverContent()}</PopoverBody>
      </Popover>,
    ];
  }
}
