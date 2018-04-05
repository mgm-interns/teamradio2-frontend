import axios from 'axios';
import * as moment from 'moment';

const REACT_APP_YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const REACT_APP_YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const REACT_APP_YOUTUBE_URL = process.env.REACT_APP_YOUTUBE_URL;

export const YoutubeHelper = {
  validYoutubeUrl: (url: string) => {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = url.match(p);
    if (matches) {
      // return video_id if url is valid
      return matches[1];
    }
    return false;
  },
  getVideoUrl: (video: any) => {
    return `${REACT_APP_YOUTUBE_URL + video.id}&t=0s`;
  },
  getVideoList: async (videoIds: string) => {
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
  },
  fetchVideo: async (value: string) => {
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

    return items;
  },
  convertDuration: (duration: number): string => {
    const formatString: string = duration > 3600 ? 'HH:mm:ss' : 'mm:ss';
    return moment()
      .startOf('day')
      .add(duration, 'seconds')
      .format(formatString);
  },
  getTitle(video: any) {
    return video.snippet.title;
  },
  getThumbnail(video: any) {
    return video.snippet.thumbnails.default.url;
  },
  getDuration(video: any) {
    const youTubeDuration = video.contentDetails.duration;
    return moment.duration(youTubeDuration).asSeconds();
  }
};
