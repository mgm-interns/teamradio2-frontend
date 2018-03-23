import * as React from 'react';
import { Component } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import { SearchSong } from '../../Modules/Station';

import './AddLink.scss';

export class AddLink extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="add-link">
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col xs="4">
                  <SearchSong />
                </Col>

              </Row>

            </CardBody>
          </Card>
        </Container>

      </div>
    )
  }
}