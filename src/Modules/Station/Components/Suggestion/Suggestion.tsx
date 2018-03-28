import * as React from 'react';
import { Component } from 'react';

interface SuggestionProps {
  url: string;
  title: string;
}

export class Suggestion extends Component<SuggestionProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { url, title } = this.props;
    return (
      <div>
        <img
          src={url}
        />
        <span>{title}</span>
      </div>
    )
  }
}
