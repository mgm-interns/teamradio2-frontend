import * as React from 'react';
import { Component } from 'react';
import './ProfileHeader.scss';

export class ProfileHeader extends Component {

  render() {
    return (
      <div className="profile-header-container">
        {/*Background image cover*/}
        <div className="background-wrapper">
          <img src="./img/profile-cover.png"/>
          <div className="background-cover"></div>
        </div>
        {/*User information container*/}
        <div className="user-infor-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="row">
                  {/* User's avatar and name */}
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="user-avatar">
                      <div className="avatar">
                        <img src="./img/female-01.png" className="rounded-circle" alt="User Avatar"/>
                        <div className="avatar-hover">
                          <span>camera_alt</span>
                          <span>Upload Profile Photo</span>
                        </div>
                      </div>
                      <div className="name">
                        <h3 className="display-name">Quoc Nguyen</h3>
                        <span className="user-name">@quoc-nguyen</span>
                      </div>
                    </div>
                  </div>
                  {/* User's summarize(song,vote,reputation) */}
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="summarize">
                      <div className="summarize-item">
                        <span className="summarize-item-header">Songs</span>
                        <span className="summarize-item-score">0</span>
                      </div>
                      <div className="summarize-item">
                        <span className="summarize-item-header">Voted</span>
                        <span className="summarize-item-score">0</span>
                      </div>
                      <div className="summarize-item">
                        <span className="summarize-item-header">Reputation</span>
                        <span className="summarize-item-score">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button update cover photo */}
              <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="update-cover">
                  <button type="button" className="btn btn-update-cover">
                    <i className="fa fa-camera"></i> Update cover photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}