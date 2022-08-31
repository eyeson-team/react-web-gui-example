import eyeson, { StreamHelpers } from 'eyeson';
import { Component } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import { Tooltip } from '@rmwc/tooltip';
import { IconButton } from '@rmwc/icon-button';
import { queue } from './Notify.js';
import Video from './Video.js';
import Audio from './Audio.js';
import SettingsDialog from './SettingsDialog.js';

class Meeting extends Component {

  constructor(props) {
    super(props);

    const { mediaOptions } = props;

    this.state = {
      localStream: null,
      remoteStream: null,
      audio: mediaOptions.audio,
      video: mediaOptions.video,
      screen: false,
      settingsDialog: false,
      sfuMode: false,
      solo: true,
      hasPresenter: false,
      hasMutedVideoPeers: false,
    };
  }

  componentDidMount() {
    const { audio, video } = this.state;
    this.props.setLoading(true);
    eyeson.onEvent(this.handleEvent);
    eyeson.join({ audio, video });
  }

  componentWillUnmount() {
    eyeson.offEvent(this.handleEvent);
    this.setState({
      localStream: null,
      remoteStream: null
    });
  }

  handleEvent = event => {
    const { type } = event;
    console.debug(type, event);
    if (type === 'presentation_ended') {
      eyeson.send({
        type: 'start_stream',
        audio: this.state.audio,
        video: this.state.video
      });
      this.setState({ screen: false });
    }
    else if (type === 'accept') {
      this.setState({
        localStream: event.localStream,
        remoteStream: event.remoteStream
      });
      this.props.setLoading(false);
    }
    else if (type === 'stream_update') {
      if (event.localStream) {
        this.setState({ localStream: event.localStream });
      }
      if (event.stream) {
        this.setState({ remoteStream: event.stream });
      }
    }
    else if (type === 'podium') {
      this.setState({
        solo: event.solo,
        hasPresenter: event.hasPresenter,
        hasMutedVideoPeers: event.hasMutedVideoPeers,
      });
    }
    else if (type === 'remote_description_update') {
      this.setState({ sfuMode: event.update.sfu });
    }
    else if (type === 'warning') {
      queue.notify({ title: `Warning: ${event.name}`, icon: 'warning' });
    }
    else if (type === 'error') {
      queue.notify({ title: `Error: ${event.name}`, icon: 'error' });
      this.endSession();
    }
    else if (type === 'exit') {
      queue.notify({ title: 'Meeting has ended' });
      this.endSession();
    }
    else {
      console.debug('[App]', 'Ignore received event:', event.type);
    }
  };

  toggleAudio = () => {
    const { audio, localStream } = this.state;
    const audioEnabled = !audio;
    StreamHelpers.toggleAudio(localStream, audioEnabled);
    this.setState({ audio: audioEnabled });
  };

  toggleVideo = () => {
    const { audio, video, localStream } = this.state;
    const videoEnabled = !video;
    eyeson.send({
      type: 'change_stream',
      stream: localStream,
      video: videoEnabled,
      audio: audio
    });
    this.setState({ video: videoEnabled });
  };

  toggleScreen = () => {
    if (!this.state.screen) {
      eyeson.send({
        type: 'start_screen_capture',
        audio: this.state.audio,
        screenStream: null,
        screen: true
      });
      this.setState({ screen: true });
    } else {
      eyeson.send({ type: 'stop_presenting' });
    }
  };

  showSettings = () => {
    this.setState({ settingsDialog: true });
  };

  closeSettings = (updateStream = false) => {
    this.setState({ settingsDialog: false });
    if (updateStream && !this.state.screen) {
      eyeson.send({
        type: 'start_stream',
        audio: this.state.audio,
        video: this.state.video
      });
    }
  };

  endSession = () => {
    this.props.exitMeeting();
  };

  renderMainView() {
    const { remoteStream, localStream, video, sfuMode, solo, hasMutedVideoPeers } = this.state;
    return [{
      condition: () => solo && video,
      component: () => (
        <Video stream={localStream} muted />
      )
    }, {
      condition: () => sfuMode && hasMutedVideoPeers,
      component: () => (
        <div className="empty-video-container">
          <div className="video empty">
            <Audio stream={remoteStream} />
          </div>
        </div>
      )
    }, {
      condition: () => true,
      component: () => (
        <Video stream={remoteStream} />
      )
    }]
    .find(component => component.condition())
    .component();
  };

  render() {
    const { localStream, audio, video, screen, sfuMode, solo, hasPresenter, settingsDialog } = this.state;
    const showSelfView = video && sfuMode && !solo && !hasPresenter;
    return (
      <>
        <Grid>
          <GridCell span="11">
            {this.renderMainView()}
            {showSelfView && (
              <div id="self-view">
                <Video stream={localStream} muted />
              </div>
            )}
          </GridCell>
          <GridCell span="1" className="app-sidebar">
            <Tooltip content={audio ? 'Mute' : 'Unmute'} align="left">
              <IconButton
                checked={audio}
                onClick={this.toggleAudio}
                label="Toggle audio"
                icon={audio ? 'mic' : 'mic_off'}
              />
            </Tooltip>
            <Tooltip content={video ? 'Turn off camera' : 'Turn on camera'} align="left">
              <IconButton
                checked={video}
                disabled={screen}
                onClick={this.toggleVideo}
                label="Toggle video"
                icon={video ? 'videocam' : 'videocam_off'}
              />
            </Tooltip>
            <Tooltip content={screen ? 'Stop screenshare' : 'Start screenshare'} align="left">
              <IconButton
                checked={screen}
                onClick={this.toggleScreen}
                label="Share screen"
                icon={screen ? 'stop_screen_share' : 'screen_share'}
              />
            </Tooltip>
            <Tooltip content="Device settings" align="left">
              <IconButton
                disabled={screen}
                onClick={this.showSettings}
                label="Device settings"
                icon="settings"
              />
            </Tooltip>
            <Tooltip content="Leave Meeting" align="left">
              <IconButton
                onClick={this.endSession}
                label="Leave Meeting"
                icon="logout"
              />
            </Tooltip>
          </GridCell>
        </Grid>
        <SettingsDialog
          open={settingsDialog}
          onClose={this.closeSettings}
        />
      </>
    );
  }
} 

export default Meeting;
