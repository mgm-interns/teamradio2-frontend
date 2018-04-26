import { YoutubeHelper } from 'Helpers/index';
import * as React from 'react';
import { Component } from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Suggestion } from '../Suggestion';
import './SearchSong.scss';

interface ISearchSongState {
  value: string;
  suggestions: any[];
}

export class SearchSong extends Component<any, ISearchSongState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  public getSuggestions = async (value: string) => {
    const items = await YoutubeHelper.fetchVideo(value);
    let videoIds = '';
    items.forEach((item: any) => {
      videoIds += `${item.id.videoId},`;
    });
    return YoutubeHelper.getVideoList(videoIds);
  };

  public getSuggestionValue = (suggestion: any) => suggestion.snippet.title;

  public renderSuggestion = (suggestion: any) => (
    <Suggestion
      url={suggestion.snippet.thumbnails.default.url}
      title={suggestion.snippet.title}
    />
  );

  public onChange = (event: any, { newValue }: any) => {
    if (newValue === '') {
      this.props.setPreviewVideo(null);
    }
    this.setState({
      value: newValue,
    });
  };

  public onSuggestionsFetchRequested = async ({ value }: any) => {
    const videoId = YoutubeHelper.validYoutubeUrl(value);
    if (videoId) {
      const videoList = await YoutubeHelper.getVideoList(videoId);
      this.props.setPreviewVideo(videoList[0]);
    } else {
      this.setState({
        suggestions: await this.getSuggestions(value),
      });
    }
  };

  public onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  public onSuggestionSelected = (event: any, { suggestion }: any) => {
    this.props.setPreviewVideo(suggestion);
  };

  public render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      value,
      placeholder: 'Type a video name, e.g., Perfect - Ed Sheeran',
      onChange: this.onChange,
      className: 'form-control',
    };

    return (
      <div className="search-input">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
        />
        <i className="fa fa-times reset-icon" onClick={this.clearInput} />
      </div>
    );
  }

  public clearInput = () => {
    this.setState({
      value: '',
    });
    this.props.setPreviewVideo(null);
  };
}
