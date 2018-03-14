import * as React from 'react';
import { Component } from 'react';
import './Section.scss';

export class Section extends Component {
  render() {
    return (
      <main>
        <section className="section-feature section-feature--white">
          <div className="container">
            <div className="row">
              <div className="col">
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
              <div className="col">
                <div className="composition">
                  <img
                    src="img/home/create-station-1-large.jpg"
                    alt="Station 1"
                    className="composition__photo composition__photo--p1"
                  />
                  <img
                    src="img/home/create-station-2-large.jpg"
                    alt="Station 2"
                    className="composition__photo composition__photo--p2"
                  />
                  <img
                    src="img/home/create-station-3-large.jpg"
                    alt="Station 3"
                    className="composition__photo composition__photo--p3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-feature section-feature--tertinary">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="composition">
                  <img
                    src="img/home/add-song.gif"
                    alt="Add Song"
                    className="composition__photo composition__photo--p4"
                  />
                </div>
              </div>
              <div className="col">
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
        <section className="section-feature section-feature--white">
          <div className="container">
            <div className="row">
              <div className="col">
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
              <div className="col">
                <div className="composition">
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
      </main>
    );
  }
}
