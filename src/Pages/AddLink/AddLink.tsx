import { PreviewVideo, SearchSong } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import './AddLink.scss';

interface IAddLinkState {
  preview: any;
}

export class AddLink extends Component<any, IAddLinkState> {
  constructor(props: any) {
    super(props);

    this.state = {
      preview: null,
    };

    this.setPreviewVideo = this.setPreviewVideo.bind(this);
  }

  public setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  public async setPreviewVideo(preview: any) {
    console.log(preview);
    await this.setStateAsync({
      preview,
    });
  }

  public render() {
    return (
      <div className="add-link">
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col sm="4" xs="12">
                  <SearchSong setPreviewVideo={this.setPreviewVideo} />
                </Col>
                <Col sm="8" xs="12">
                  <PreviewVideo video={this.state.preview} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}
