import { Component } from 'react';

const noop = () => console.log('unable to play audio');

class Audio extends Component {
  
  constructor(props) {
    super(props);
    this.playPromise = Promise.resolve();
  }

  componentDidMount() {
    const { audio } = this;
    const { stream } = this.props;
    if (stream && audio && !audio.srcObject) {
      this.playPromise = this.playPromise.then(() => {
        audio.srcObject = stream;
        return audio.play().catch(noop);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { audio } = this;
    const { stream } = this.props;
    if (stream && audio && (!audio.srcObject || prevProps.stream !== stream)) {
      this.playPromise = this.playPromise.then(() => {
        audio.srcObject = stream;
        return audio.play().catch(noop);
      });
    }
  }

  componentWillUnmount() {
    const { audio } = this;
    this.audio = null;
    if (audio) {
      audio.srcObject = null;
    }
  }
  
  initAudio = audio => {
    if (audio && audio !== this.audio) {
      this.audio = audio;
    }
  };

  render() {
    return (
      <audio ref={this.initAudio} />
    );
  }
}

export default Audio;
