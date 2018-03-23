import * as React from 'react';
import { Component } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import * as Autosuggest from 'react-autosuggest';
import axios from 'axios';
const REACT_APP_YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const REACT_APP_YOUTUBE_API_KEY = 'AIzaSyD_HCz-IjU056WTFjBgWYmjjg1YnwRPXXM';
const REACT_APP_YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

import './SearchSong.scss';
import { string } from "prop-types";

const getVideoInfo = async (videoIds: string) => {
  const { data: { items } } = await axios.get(
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

const getSuggestions = async (value: string) => {
  const { data: { items } } = await axios.get(
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

  // Get all video ids from search results that used to get info of those (contains more params like containDetails, status,...)
  let videoIds = '';
  items.forEach((item: any) => {
    videoIds += `${item.id.videoId},`;
  });

  const result = await getVideoInfo(videoIds);
  console.log(result);
  return result;
};

const getSuggestionValue = (suggestion: any) => suggestion.snippet.title;

const renderSuggestion = (suggestion: any) => (
  <div>
    <img
      src={suggestion.snippet.thumbnails.default.url}
    />
    <span>{suggestion.snippet.title}</span>
  </div>
);

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

  onChange = (event: any, { newValue }: any) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }: any) => {
    getSuggestions(value)
    this.setState({
      suggestions: await getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}