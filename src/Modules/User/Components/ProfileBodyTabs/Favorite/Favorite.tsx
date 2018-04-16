import * as React from 'react';
import { Component } from 'react';

import { FavoriteItem, IFavoriteItem } from './FavoriteItem';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

interface IFavoriteProps {
  favoriteList: IFavoriteItem[];
}

interface IFavoriteStates {
  favoriteList: IFavoriteItem[];
}

export class Favorite extends Component<IFavoriteProps, IFavoriteStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public render() {
    console.log(this.props.favoriteList);
    return (
      <Container>
        <h2 className="title-header">Hear the tracks you've saved</h2>
          <Row className="m-0 justify-content-center justify-content-center">
            <div className="col-xl-12 browser">
              <div className="d-flex flex-row flex-wrap my-flex-container">
              {this.props.favoriteList.map(
                (item: IFavoriteItem, index: number) => {
                  return <FavoriteItem key={index} {...item} />;
                },
              )}
              </div>
            </div>
          </Row>
      </Container>
    );
  }
}
