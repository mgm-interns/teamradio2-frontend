import * as React from 'react';
import { Component } from 'react';

export class AddingSongSection extends Component {
  public render() {
    return (
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
    );
  }
}
