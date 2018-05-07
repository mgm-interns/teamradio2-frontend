import * as React from 'react';
import { Component } from 'react';
import LazyLoad from 'react-lazyload';

export class AddingSongSection extends Component {
  public render() {
    return (
      <section className="section-feature-search section-feature--tertinary">
        <div className="container">
          <div className="row flex-column-reverse flex-md-row">
            <div className="col-lg-6 col-lg-push-6">
              <div className="composition-search">
                <LazyLoad once height={400}>
                  <img
                    src="/img/home/add-song.gif"
                    alt="Add Song"
                    className="composition__photo composition__photo--p4"
                  />
                </LazyLoad>
              </div>
            </div>
            <div className="col-lg-6 col-lg-pull-6">
              <h3 className="heading-tertiary u-margin-bottom-small">
                Search & add song to playlist
              </h3>
              <p className="paragraph">
                Over 1 billion songs on Youtube are embedded to such a tiny
                search-box. Live preview helps you choose the right song.
              </p>
              <a href="#" className="btn-text">
                Easy to search - Easier to add &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
