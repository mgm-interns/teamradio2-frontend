import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { YoutubeHelper } from 'Helpers';
import { Volume } from 'Models/Volume';
import { Component } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Button, Col, Input, Row, UncontrolledTooltip } from 'reactstrap';
import { compose } from 'redux';
import './PreviewVideo.scss';

interface IOwnProps {
  onPreviewVolumeClick: () => void;
  embeddableVideo: boolean;
  video: any;
  addSong: (message: string) => void;
}

interface IStateProps {
  volume: Volume;
}

type IProps = IOwnProps & IStateProps;

class PreviewVideoComponent extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      previewVolume: true,
      message: null,
      isAdding: false,
    };
    this.mutePreview = this.mutePreview.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.handleButtonAddSong = this.handleButtonAddSong.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.volume.previewVolume !== this.props.volume.previewVolume) {
      this.setState({ previewVolume: nextProps.volume.previewVolume });
    }
  }

  public componentDidMount() {
    const { volume } = this.props;
    this.setState({ previewVolume: volume.previewVolume });
  }

  public getTitle(video: any) {
    return video.snippet.title;
  }

  public getDuration(video: any) {
    const duration = YoutubeHelper.getDuration(video);
    return YoutubeHelper.convertDuration(duration);
  }

  public mutePreview() {
    this.setState((prevState: any) => ({
      previewVolume: !prevState.previewVolume,
    }));
  }

  public updateMessage(event: any) {
    this.setState({
      message: event.target.value,
    });
  }

  public handleButtonAddSong() {
    this.setState({ isAdding: true });
    this.props.addSong(this.state.message);
  }

  public resetPreview() {
    this.setState({
      message: null,
      isAdding: false,
    });
  }

  public changeIsAddingState(isAdding: boolean) {
    this.setState({
      isAdding,
    });
  }

  public render() {
    const { video, embeddableVideo, onPreviewVolumeClick } = this.props;
    const { previewVolume, isAdding } = this.state;

    return (
      <div className="preview">
        {video ? (
          <Row className="h-100">
            <Col md="5" xs="12">
              <ReactPlayer
                url={YoutubeHelper.getVideoUrl(video)}
                playing
                width="100%"
                height="100%"
                volume={1}
                muted={!previewVolume}
              />
            </Col>
            <Col
              md="7"
              xs="12"
              className="d-flex flex-column justify-content-between">
              <div>
                <h4 className="preview__title">{this.getTitle(video)}</h4>
                <div className="d-flex justify-content-between secondary-info">
                  <p>
                    <i className="fa fa-clock-o" />
                    {this._renderDuration(video)}
                  </p>
                  <p>Channel: {video.snippet.channelTitle}</p>
                </div>
                <Input
                  className="preview__input"
                  placeholder="Do you want to say something about this video?"
                  onChange={this.updateMessage}
                />
              </div>
              <div className="preview__buttons">
                {previewVolume ? (
                  <i
                    className="icon-volume-2 icons font-2xl"
                    onClick={onPreviewVolumeClick}
                  />
                ) : (
                  <i
                    className="icon-volume-off icons font-2xl"
                    onClick={onPreviewVolumeClick}
                  />
                )}
                <Button
                  color="primary"
                  className={classNames('preview__button')}
                  disabled={!embeddableVideo || isAdding}
                  onClick={this.handleButtonAddSong}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        ) : video === undefined ? ( // video is undefined when the search result is not found, even search by a link or a keyword
          <img src="/img/not_found_song.png" alt="" />
        ) : (
          <img src="/img/loading_song.png" alt="" />
        )}
      </div>
    );
  }

  private _renderDuration(video: any) {
    const FIVE_MINUTE_DURATION = 300000;
    const duration = YoutubeHelper.getDuration(video);

    return (
      <span>
        <span
          id="preview-duration"
          className={classNames('preview__duration', {
            warning: duration > FIVE_MINUTE_DURATION,
          })}>
          {YoutubeHelper.convertDuration(duration)}
        </span>{' '}
        {duration > FIVE_MINUTE_DURATION && (
          <UncontrolledTooltip placement="right" target="preview-duration">
            This song has long duration!
          </UncontrolledTooltip>
        )}
      </span>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  volume: state.volume,
});

export const PreviewVideo = compose(
  connect<IStateProps, {}, IOwnProps>(mapStateToProps, undefined, null, {
    withRef: true,
  }),
)(PreviewVideoComponent);
