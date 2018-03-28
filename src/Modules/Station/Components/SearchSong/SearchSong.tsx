import * as React from 'react';
import { Component } from 'react';
import * as Autosuggest from 'react-autosuggest';
import { YoutubeHelper } from "Helpers";
import './SearchSong.scss';
import  { Suggestion} from "../Suggestion";

interface SearchSongState {
  value: string;
  suggestions: Array<any>;
}

export class SearchSong extends Component<any, SearchSongState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestions = async (value: string) => {
    const items = await YoutubeHelper.fetchVideo(value);
    let videoIds = '';
    items.forEach((item: any) => {
      videoIds += `${item.id.videoId},`;
    });
    return await YoutubeHelper.getVideoList(videoIds);
  };

  getSuggestionValue = (suggestion: any) => suggestion.snippet.title;

  renderSuggestion = (suggestion: any) => (
    <Suggestion url={suggestion.snippet.thumbnails.default.url} title={suggestion.snippet.title} />
  );

  onChange = (event: any, {newValue}: any) => {
    if(newValue === '') {
      this.props.setPreviewVideo(undefined);
    }
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = async ({value}: any) => {
    const videoId = YoutubeHelper.validYoutubeUrl(value);
    if(videoId) {
      const videoList = await YoutubeHelper.getVideoList(videoId);
      this.props.setPreviewVideo(videoList[0]);
    }
    else {
      this.setState({
        suggestions: await this.getSuggestions(value)
      });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event: any, { suggestion }: any) => {
    this.props.setPreviewVideo(suggestion);
  };

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a video name, e.g., Shape of you',
      value,
      onChange: this.onChange,
      className: 'form-control'
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
    )
  }
}
