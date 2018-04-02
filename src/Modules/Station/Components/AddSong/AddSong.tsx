import * as React from 'react';
import { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { PreviewVideo } from './PreviewVideo';
import { SearchSong } from './SearchSong';

interface IAddLinkState {
  preview: any;
}

export class AddSong extends Component<any, IAddLinkState> {
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
      <div className="add-song">
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
      </div>
    );
  }
}
