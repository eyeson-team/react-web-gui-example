import { Component } from 'react';

const noop = () => console.log('unable to play video');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class Video extends Component {
  
  constructor(props) {
    super(props);
    this.playPromise = Promise.resolve();
  }

  componentDidMount() {
    const { video } = this;
    const { stream } = this.props;
    if (stream && video && !video.srcObject) {
      this.playPromise = this.playPromise.then(() => {
        video.srcObject = stream;
        return Promise.race([video.play().catch(noop), sleep(150)]);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { video } = this;
    const { stream } = this.props;
    if (stream && video && (!video.srcObject || prevProps.stream !== stream)) {
      this.playPromise = this.playPromise.then(() => {
        video.srcObject = stream;
        return Promise.race([video.play().catch(noop), sleep(150)]);
      });
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
    if (video && video !== this.video) {
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
