import { Component } from 'react';
import './Video.css';

class Video extends Component {
  
  shouldComponentUpdate() {
    return false; // disable updates
  }

  initVideo = video => {
    if (video) {
      video.srcObject = this.props.stream;
    }
  };

  render() {
    return (
      <video className="Video" ref={this.initVideo} playsInline autoPlay />
    );
  }
}

export default Video;
