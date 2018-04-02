import * as React from 'react';
import { Component } from 'react';

interface ISuggestionProps {
  url: string;
  title: string;
}

export class Suggestion extends Component<ISuggestionProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { url, title } = this.props;
    return (
      <div>
        <img src={url} />
        <span>{title}</span>
      </div>
    );
  }
}
