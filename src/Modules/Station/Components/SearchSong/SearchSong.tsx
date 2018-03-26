import * as React from 'react';
import { Component } from 'react';
import * as Autosuggest from 'react-autosuggest';
import axios from 'axios';

const REACT_APP_YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const REACT_APP_YOUTUBE_API_KEY = 'AIzaSyD_HCz-IjU056WTFjBgWYmjjg1YnwRPXXM';


import './SearchSong.scss';

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

  getVideoList = async (videoIds: string) => {
    const {data: {items}} = await axios.get(
      `${REACT_APP_YOUTUBE_API_URL}/videos`,
      {
        params: {
          key: REACT_APP_YOUTUBE_API_KEY,
          part: 'id,snippet,contentDetails,status',
          id: videoIds,
        },
      },
    );
    return items;
  };

  getSuggestions = async (value: string) => {
    const {data: {items}} = await axios.get(
      `${REACT_APP_YOUTUBE_API_URL}/search`,
      {
        params: {
          key: REACT_APP_YOUTUBE_API_KEY,
          q: value,
          part: 'snippet',
          safeSearch: 'strict',
          // regionCode: 'VN', //	STAMEQ
          type: 'video',
          videoEmbeddable: 'true',
          // videoSyndicated: 'true',
          maxResults: 5,
          videoDefinition: 'any',
          relevanceLanguage: 'en',
        },
      },
    );

    let videoIds = '';
    items.forEach((item: any) => {
      videoIds += `${item.id.videoId},`;
    });

    const result = await this.getVideoList(videoIds);
    console.log(result);
    return result;
  };

  getSuggestionValue = (suggestion: any) => suggestion.snippet.title;

  renderSuggestion = (suggestion: any) => (
    <div>
      <img
        src={suggestion.snippet.thumbnails.default.url}
      />
      <span>{suggestion.snippet.title}</span>
    </div>
  );

  onChange = (event: any, {newValue}: any) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = async ({value}: any) => {
    this.setState({
      suggestions: await this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event: any, { suggestion, suggestionValue }: any ) => {
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