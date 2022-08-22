import { Component } from 'react';

const tryPlay = player => {
  return player.play().catch(() => console.log('unable to play video'));
};

class Video extends Component {
  
  constructor(props) {
    super(props);
    this.playPromise = Promise.resolve();
  }

  componentDidMount() {
    const { video } = this;
    const { stream } = this.props;
    if (stream && video && !video.srcObject) {
      video.srcObject = stream;
      this.playPromise = this.playPromise.then(tryPlay(video));
    }
  }

  componentDidUpdate(prevProps) {
    const { video } = this;
    const { stream } = this.props;
    if (stream && video && (!video.srcObject || prevProps.stream !== stream)) {
      video.srcObject = stream;
      this.playPromise = this.playPromise.then(tryPlay(video));
    }
  }

  componentWillUnmount() {
    const { video } = this;
    this.video = null;
    if (video) {
      video.srcObject = null;
    }
  }
  
  initVideo = video => {
    if (video) {
      this.video = video;
    }
  };

  render() {
    return (
      <video className="video" ref={this.initVideo} muted={this.props.muted} playsInline />
    );
  }
}

export default Video;
