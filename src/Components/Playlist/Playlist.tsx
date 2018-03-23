import * as React from 'react';
import { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './Playlist.scss';

export class Playlist extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
              parent.</p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}
