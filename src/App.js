import React, {Component, Fragment} from 'react';
import {TextField, TextFieldHelperText} from 'rmwc/TextField';
import {IconButton} from 'rmwc/IconButton';
import {ThemeProvider} from 'rmwc/Theme';
import {Grid, GridCell} from 'rmwc/Grid';
import {LinearProgress} from 'rmwc/LinearProgress';
import eyeson from 'eyeson';
import Toolbar from './Toolbar';
import Video from './Video';
import './App.css';

const ACCESS_KEY_LENGTH = 24;

class App extends Component {
  state = {stream: null, connecting: false, audio: true, video: true};

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  componentDidMount() {
    eyeson.onEvent(this.handleEvent);
  }

  handleEvent(event) {
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
    eyeson.send({
      type: 'change_stream',
      stream: this.state.localStream,
      video: this.state.video,
      audio: !this.state.audio,
    });
    this.setState({audio: !this.state.audio});
  }

  toggleVideo() {
    eyeson.send({
      type: 'change_stream',
      stream: this.state.localStream,
      video: !this.state.video,
      audio: this.state.audio,
    });
    this.setState({video: !this.state.video});
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
            {this.state.connecting && <LinearProgress determinate={false} />}
          </GridCell>
          <GridCell span="11">
            {!this.state.stream && (
              <Fragment>
                <TextField
                  outlined
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
                  onContent="mic"
                  offContent="mic_off"
                />
                <IconButton
                  checked={this.state.video}
                  onClick={this.toggleVideo}
                  label="Toggle video"
                  onContent="videocam"
                  offContent="videocam_off"
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
