import React, { Component } from 'react';
import User from '../../Models/User';

class Dashboard extends Component {

  render() {
    // console.log(User);
    let user: User = new User('teamradio@gmail.com', 'Team Radio');
    console.log(user.email);

    return (
      <div className="animated fadeIn">
        Hello {user.name}
      </div>
    )
  }
}

export default Dashboard;
