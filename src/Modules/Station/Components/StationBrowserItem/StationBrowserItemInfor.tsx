import { Component } from 'react';
import * as React from 'react';
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
}
  from 'reactstrap';

export class StationBrowserItemInfor extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                   alt="Card image cap"/>
          <CardBody>
            <CardTitle>Card title</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}