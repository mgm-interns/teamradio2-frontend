import * as React from 'react';
import { Component } from 'react';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';
import './Main.scss';
import { Setting } from "../../../Components/Setting";

export class Main extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Team Radio</span>
            <span className="heading-primary--sub">
              A Radio station for your team
            </span>
            <Setting/>
          </h1>
          <div className="header__create-box">
            <input
              placeholder="Your team station"
              className="transparent-form-control"
            />
            <i className="fa fa-paper-plane-o input--fa" />
          </div>
        </div>
      </header>
    );
  }
}
