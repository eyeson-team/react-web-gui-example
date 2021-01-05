import React, {Component} from 'react';
import './Video.css';

class Video extends Component {
  shouldComponentUpdate() {
    return false; // disable updates
  }

  set video(ref) {
    ref.srcObject = this.props.src;
    ref.play();
  }

  render() {
    return <video className="Video" ref={ref => (this.video = ref)} playsInline />;
  }
}

export default Video;
