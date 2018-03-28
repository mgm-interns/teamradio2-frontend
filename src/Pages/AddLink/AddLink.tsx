import * as React from 'react';
import { Component } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import { SearchSong, PreviewVideo } from 'Modules/Station';

import './AddLink.scss';

interface AddLinkState {
  preview: any;
}

export class AddLink extends Component<any, AddLinkState> {
  constructor(props: any) {
    super(props);

    this.state = {
      preview: null
    };

    this.setPreviewVideo = this.setPreviewVideo.bind(this);
  }

  setStateAsync(state: any) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async  setPreviewVideo(preview: any) {
    console.log(preview);
    await this.setStateAsync({
      preview: preview
    });
  }

  render() {
    return (
      <div className="add-link">
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col sm="4" xs="12">
                  <SearchSong setPreviewVideo={this.setPreviewVideo}/>
                </Col>
                <Col sm="8" xs="12">
                  <PreviewVideo video={this.state.preview}/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    )
  }
}
