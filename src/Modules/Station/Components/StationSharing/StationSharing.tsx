import { Component } from 'react';
import * as React from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  dropdownOpen: any;
  url: string;
  copied: boolean;
}

export class StationSharing extends Component<Props, State> {
  private inputRef: any;

  constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
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
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  // eslint-disable-next-line
  static _transformUrl() {
    /**
     * Only need to return window.location
     */
    return window.location.href;
  }

  // _copyToClipboard() {
  //   try {
  //     this.inputRef.select();
  //     console.log(this.inputRef.value);
  //     document.execCommand('Copy');
  //     this.setState({ copied: true });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  _shareTo(prefix: string) {
    try {
      window.open(`${prefix}${this.state.url}`, '_newtab');
    } catch (error) {
      console.error(error);
    }
  }

  _renderDropDownItem(icon: string, text: string, handleClick: any) {
    return (
      <DropdownItem onClick={handleClick}>
        <i className={icon} />
        <span>{text}</span>
      </DropdownItem>
    );
  }

  ref = (input: any) => {
    this.inputRef = input;
  };

  render() {
    return [
      <Input key={1} innerRef={this.ref} value={this.state.url} hidden />,
      <Dropdown
        key={2}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="dropdown-share"
      >
        <DropdownToggle>
          <i className="fa fa-share-alt" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Social sharing</DropdownItem>
          {this._renderDropDownItem('fa fa-facebook-f', 'Facebook', () =>
            this._shareTo(FACEBOOK_SHARING),
          )}
          {this._renderDropDownItem('fa fa-google', 'Google', () =>
            this._shareTo(GOOGLE_PLUS_SHARING),
          )}
          {this._renderDropDownItem('fa fa-twitter', 'Twitter', () =>
            this._shareTo(TWITTER_SHARING),
          )}
          {/* <DropdownItem header>Copy</DropdownItem> */}
          {/* {this._renderDropDownItem('fa fa-link', 'Copy Station Link', () =>
            this._copyToClipboard(),
          )} */}
        </DropdownMenu>
      </Dropdown>,
    ];
  }
}
