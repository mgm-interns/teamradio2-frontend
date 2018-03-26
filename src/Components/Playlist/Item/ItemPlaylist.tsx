import * as React from 'react';
import { Component } from 'react';

export class Item extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      isUpVote: false,
      isDownVote: false,
      upVotes: 0,
      downVotes: 0,
      isFavourite: false,
    };
  }
  render(){
    return(
      <div className="">

      </div>
    )
  }
}