import eyeson from 'eyeson';
import { Component } from 'react';
import { ThemeProvider } from '@rmwc/theme';
import { LinearProgress } from '@rmwc/linear-progress';
import { SnackbarQueue } from '@rmwc/snackbar';
import { queue } from './Notify.js';
import Toolbar from './Toolbar.js';
import StartForm from './StartForm.js';
import Preview from './Preview.js';
import Meeting from './Meeting.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      connected: false,
      inPreview: true,
      mediaOptions: { audio: true, video: true }
    };
  }

  componentDidMount() {
    eyeson.onEvent(this.handleEvent);
  }

  handleEvent = event => {
    const { type, connectionStatus } = event;

    if (type !== 'connection') {
      return;
    }

    if (!['initialize', 'fetch_room', 'received_room', 'ready'].includes(connectionStatus)) {
      this.setState({ loading: false }, () => {
        queue.notify({ title: connectionStatus, icon: 'error' });
      });
      return;
    }

    if (connectionStatus === 'ready') {
      this.setState({
        loading: false,
        connected: true
      });
    }
  };

  onStart = token => {
    this.setState({ loading: true });
    eyeson.connect(token);
  };

  onJoin = mediaOptions => {
    this.setState({ mediaOptions, inPreview: false });
  };

  exitMeeting = () => {
    eyeson.destroy();
    eyeson.onEvent(this.handleEvent);
    this.setState({ loading: false, connected: false, inPreview: true });
  };

  setLoading = loading => {
    this.setState({ loading });
  };

  renderContent() {
    return [{
      condition: () => this.state.inPreview && !this.state.connected,
      component: () => (
        <StartForm onStart={this.onStart} loading={this.state.loading} />
      )
    }, {
      condition: () => this.state.inPreview,
      component: () => (
        <Preview onJoin={this.onJoin} exitMeeting={this.exitMeeting} />
      )
    }, {
      condition: () => true,
      component: () => {
        eyeson.offEvent(this.handleEvent);
        return (
          <Meeting exitMeeting={this.exitMeeting} setLoading={this.setLoading} mediaOptions={this.state.mediaOptions} />
        );
      }
    }]
      .find(component => component.condition())
      .component();
  }

  render() {
    return (
      <ThemeProvider options={{ primary: '#9e206c', secondary: '#6d6d6d' }}>
        <Toolbar title="Web GUI React App" />
        <LinearProgress closed={!this.state.loading} />
        <main id="app">
          {this.renderContent()}
        </main>
        <SnackbarQueue messages={queue.messages} />
      </ThemeProvider>

    );
  }
} 

export default App;
