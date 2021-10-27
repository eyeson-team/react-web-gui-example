import { Component, Fragment } from 'react';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';
import { ThemeProvider } from '@rmwc/theme';
import { Grid, GridCell } from '@rmwc/grid';
import { LinearProgress } from '@rmwc/linear-progress';
import { Snackbar } from '@rmwc/snackbar';
import eyeson, { StreamHelpers } from 'eyeson';
import Toolbar from './Toolbar';
import Video from './Video';
import SettingsDialog from './SettingsDialog';
import './App.css';

const ACCESS_KEY_LENGTH = 24;

class App extends Component {
  
  state = {
    localStream: null,
    remoteStream: null,
    connecting: false,
    audio: true,
    video: true,
    screen: false,
    settingsDialog: false,
    toastMessage: ''
  };

  componentDidMount() {
    eyeson.onEvent(this.handleEvent);
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
      return;
    }
    if (type === 'accept') {
      this.setState({
        localStream: event.localStream,
        remoteStream: event.remoteStream,
        connecting: false
      });
      return;
    }
    if (type === 'warning') {
      this.setState({ toastMessage: 'Warning: ' + event.name });
      return;
    }
    if (type === 'error') {
      this.setState({ toastMessage: 'Error: ' + event.name });
      this.endSession();
      return;
    }
    if (type === 'exit') {
      this.setState({ toastMessage: 'Meeting has ended' });
      this.endSession();
      return;
    }
    console.debug('[App]', 'Ignore received event:', event.type);
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

  handleToastClose = () => {
    this.setState({ toastMessage: '' });
  };

  start = event => {
    const key = event.target.value.trim();
    if (key.length !== ACCESS_KEY_LENGTH) {
      return;
    }
    this.setState({ connecting: true });
    eyeson.start(key);
  };

  endSession = () => {
    eyeson.offEvent(this.handleEvent);
    eyeson.destroy();
    this.setState({
      localStream: null,
      remoteStream: null,
      connecting: false
    });
    eyeson.onEvent(this.handleEvent);
  };

  render() {
    const { connecting, remoteStream, audio, video, screen, toastMessage } = this.state;
    return (
      <ThemeProvider options={{primary: '#9e206c', secondary: '#6d6d6d'}}>
        <Toolbar title="Web GUI React App" />
        <Grid className="App">
          <GridCell span="12">
            {connecting && <LinearProgress />}
          </GridCell>
          <GridCell span="11">
            {!remoteStream && (
              <Fragment>
                <TextField
                  label="Meeting Access Key"
                  disabled={connecting}
                  style={{width: '20rem'}}
                  onChange={this.start}
                  helpText={{
                    persistent: true,
                    children: "Get an user access key from starting a meeting via the API or use one from an active meeting."
                  }}
                />
              </Fragment>
            )}
            {remoteStream && <Video stream={remoteStream} />}
          </GridCell>
          <GridCell span="1" className="App-sidebar">
            {remoteStream && (
              <Fragment>
                <IconButton
                  checked={audio}
                  onClick={this.toggleAudio}
                  label="Toggle audio"
                  icon={audio ? 'mic' : 'mic_off'}
                />
                <IconButton
                  checked={video}
                  disabled={screen}
                  onClick={this.toggleVideo}
                  label="Toggle video"
                  icon={video ? 'videocam' : 'videocam_off'}
                />
                <IconButton
                  checked={screen}
                  onClick={this.toggleScreen}
                  label="Share screen"
                  icon={screen ? 'stop_screen_share' : 'screen_share'}
                />
                <IconButton
                  disabled={screen}
                  onClick={this.showSettings}
                  label="Settings"
                  icon="settings"
                />
                <IconButton
                  onClick={this.endSession}
                  label="Leave Meeting"
                  icon="logout"
                />
              </Fragment>
            )}
          </GridCell>
        </Grid>
        <SettingsDialog
          open={this.state.settingsDialog}
          onClose={this.closeSettings}
        />
        <Snackbar
          open={toastMessage !== ''}
          message={toastMessage}
          onClose={this.handleToastClose}
        />
      </ThemeProvider>
    );
  }
}

export default App;
