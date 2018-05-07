import * as React from 'react';
import { Component } from 'react';
import LazyLoad from 'react-lazyload';

export class CreatingSection extends Component {
  public render() {
    return (
      <section className="section-feature-create section-feature--white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-push-6">
              <div className="describe-create">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Create your own station
                </h3>
                <p className="paragraph">
                  No need to register an account. Your station will be ready, in
                  just one click.
                </p>
                <a href="#" className="btn-text">
                  Try it now &rarr;
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-lg-pull-6">
              <div className="composition-create">
                <LazyLoad once height={260}>
                  <img
                    src="/img/home/create-station-1-large.jpg"
                    alt="Station 1"
                    className="composition__photo composition__photo--p1"
                  />
                </LazyLoad>
                <LazyLoad once height={200}>
                  <img
                    src="/img/home/create-station-2-large.jpg"
                    alt="Station 2"
                    className="composition__photo composition__photo--p2"
                  />
                </LazyLoad>
                <LazyLoad once height={150}>
                  <img
                    src="/img/home/create-station-3-large.jpg"
                    alt="Station 3"
                    className="composition__photo composition__photo--p3"
                  />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
