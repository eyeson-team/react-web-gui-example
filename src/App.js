import React, {Component, Fragment} from 'react';
import {TextField, TextFieldHelperText} from '@rmwc/textfield';
import {IconButton} from '@rmwc/icon-button';
import {ThemeProvider} from '@rmwc/theme';
import {Grid, GridCell} from '@rmwc/grid';
import {LinearProgress} from '@rmwc/linear-progress';
import eyeson, { StreamHelpers } from 'eyeson';
import Toolbar from './Toolbar';
import Video from './Video';
import './App.css';

const ACCESS_KEY_LENGTH = 24;

class App extends Component {
  state = {local: null, stream: null, connecting: false, audio: true, video: true, screen: false};

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleScreen = this.toggleScreen.bind(this);
  }

  componentDidMount() {
    eyeson.onEvent(this.handleEvent);
  }

  handleEvent(event) {
    console.debug(event.type, event);
    if (event.type === 'presentation_ended') {
      eyeson.send({ type: 'start_stream', audio: this.state.audio,
                    video: this.state.video });
      this.setState({screen: false});
      return;
    }
    if (event.type !== 'accept') {
      console.debug('[App]', 'Ignore received event:', event.type);
      return;
    }
    this.setState({
      local: event.localStream,
      stream: event.remoteStream,
      connecting: false,
    });
  }

  toggleAudio() {
    const audioEnabled = !this.state.audio;
    if (audioEnabled) {
      StreamHelpers.enableAudio(this.state.local);
    } else {
      StreamHelpers.disableAudio(this.state.local);
    }
    this.setState({audio: audioEnabled});
  }

  toggleVideo() {
    eyeson.send({
      type: 'change_stream',
      stream: this.state.local,
      video: !this.state.video,
      audio: this.state.audio,
    });
    this.setState({video: !this.state.video});
  }

  toggleScreen() {
    if (!this.state.screen) {
      eyeson.send({ type: 'start_screen_capture', audio: this.state.audio,
                    screenStream: null, screen: true });
      this.setState({screen: true});
    } else {
      eyeson.send({ type: 'stop_presenting' });
    }
  }

  start(event) {
    const key = event.target.value.trim();
    if (key.length !== ACCESS_KEY_LENGTH) {
      return;
    }
    this.setState({connecting: true});
    eyeson.start(key);
  }

  render() {
    return (
      <ThemeProvider options={{primary: '#9e206c', secondary: '#6d6d6d'}}>
        <Toolbar title="Web GUI React App" />
        <Grid className="App">
          <GridCell span="12">
            {this.state.connecting && <LinearProgress />}
          </GridCell>
          <GridCell span="11">
            {!this.state.stream && (
              <Fragment>
                <TextField
                  label="Meeting Access Key"
                  onChange={this.start}
                  disabled={this.state.connecting}
                />
                <TextFieldHelperText>
                  Get an user access key from starting a meeting via the API or
                  use one from an active meeting.
                </TextFieldHelperText>
              </Fragment>
            )}
            {this.state.stream && <Video src={this.state.stream} />}
          </GridCell>
          <GridCell span="1" className="App-sidebar">
            {this.state.stream && (
              <Fragment>
                <IconButton
                  checked={this.state.audio}
                  onClick={this.toggleAudio}
                  label="Toggle audio"
                  icon={this.state.audio ? 'mic' : 'mic_off'}
                />
                <IconButton
                  checked={this.state.video}
                  onClick={this.toggleVideo}
                  label="Toggle video"
                  icon={this.state.video ? 'videocam' : 'videocam_off'}
                />
                <IconButton
                  checked={this.state.screen}
                  onClick={this.toggleScreen}
                  label="Share screen"
                  icon={this.state.video ? 'screen_share' : 'stop_screen_share'}
                />
              </Fragment>
            )}
          </GridCell>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;
