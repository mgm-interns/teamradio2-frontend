import * as React from 'react';
import { Component } from 'react';

export class SharingSection extends Component {
  public render() {
    return (
      <section className="section-feature-share section-feature--white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-push-6 pd-bt-10">
              <h3 className="heading-tertiary u-margin-bottom-small">
                Share your station
              </h3>
              <p className="paragraph">
                The playlist is maintained by everyone who joins your station.
                You can see who are online and react to their songs.
              </p>
              <a href="#" className="btn-text">
                Explore music together &rarr;
              </a>
            </div>
            <div className="col-lg-6 col-lg-pull-6">
              <div className="composition-share">
                <img
                  src="img/home/share-station.png"
                  alt="Share Station"
                  className="composition__photo composition__photo--p5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
