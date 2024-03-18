import { DeviceManager, FeatureDetector } from 'eyeson';
import { Component } from 'react';
import { Typography } from '@rmwc/typography';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { Switch } from '@rmwc/switch';
import { Card } from '@rmwc/card';
import { queue } from './Notify.js';
import Video from './Video.js';
import { getSelectedDeviceId, mapDeviceList } from './utils.js';
import virtualBackgroundOptions from './virtualBackgroundOptions.js';

class Preview extends Component {

  constructor(props) {
    super(props);
    
    this.supportsVirtualBackground = FeatureDetector.canVirtualBackground();
    const storedVirtualBackground = DeviceManager.getStoredVirtualBackgroundType();

    this.state = {
      stream: null,
      cameras: [],
      microphones: [],
      selectedCamera: '',
      selectedMicrophone: '',
      selectedVirtualBackground: storedVirtualBackground,
      enabledAudio: true,
      enabledVideo: true,
    };
    this.deviceManager = new DeviceManager();
    this.deviceManager.setVirtualBackgroundType(storedVirtualBackground);
  }

  componentDidMount() {
    this.deviceManager.onChange(this.handleChange);
    this.deviceManager.start();
  }

  componentWillUnmount() {
    this.deviceManager.terminate();
  }

  handleChange = event => {
    const { cameras, microphones, stream, error } = event;
    const { selectedMicrophone, selectedCamera } = this.state;
    if (cameras && microphones) {
      this.setState({
        cameras: cameras.map(mapDeviceList),
        microphones: microphones.map(mapDeviceList)
      });
    }
    if (stream) {
      this.setState({
        stream,
        selectedCamera: getSelectedDeviceId(stream, 'Video'),
        selectedMicrophone: getSelectedDeviceId(stream, 'Audio')
      });
    }
    if (microphones && selectedMicrophone && !microphones.find(device => device.deviceId === selectedMicrophone) && microphones.length > 0) {
      this.onMicChange({ target: { value: microphones[0].deviceId } });
    }
    if (cameras && selectedCamera && !cameras.find(device => device.deviceId === selectedCamera) && cameras.length > 0) {
      this.onCamChange({ target: { value: cameras[0].deviceId } });
    }
    if (error) {
      queue.notify({ title: (error instanceof Error ? error.message : error), icon: 'error' });
    }
  };

  toggleAudio = ({ target }) => {
    const audio = target.checked;
    this.setState({ enabledAudio: audio });
    this.deviceManager.updateWithOptions({
      audio,
      video: this.state.enabledVideo
    });
  };

  toggleVideo = ({ target }) => {
    const video = target.checked;
    this.setState({ enabledVideo: video });
    this.deviceManager.updateWithOptions({
      audio: this.state.enabledAudio,
      video
    });
  };

  onMicChange = ({ target }) => {
    const { value } = target;
    this.setState({ selectedMicrophone: value });
    this.deviceManager.setAudioInput(value);
    this.deviceManager.storeConstraints();
  };

  onCamChange = ({ target }) => {
    const { value } = target;
    this.setState({ selectedCamera: value });
    this.deviceManager.setVideoInput(value);
    this.deviceManager.storeConstraints();
  };

  onVirtualBackgroundChange = ({ target }) => {
    const { value } = target;
    this.setState({ selectedVirtualBackground: value });
    this.deviceManager.setVirtualBackgroundType(value);
  };

  onJoin = () => {
    const { enabledAudio: audio, enabledVideo: video } = this.state;
    const virtualBackground = this.state.selectedVirtualBackground !== 'off';
    this.deviceManager.storeConstraints();
    this.props.onJoin({ audio, video, virtualBackground });
  };

  onExit = () => {
    this.props.exitMeeting();
  };

  render() {
    const { stream, enabledAudio, enabledVideo, microphones, cameras, selectedMicrophone, selectedCamera, selectedVirtualBackground } = this.state;
    return (
      <Card id="preview" className="page">
        <Typography use="headline4" tag="h4" className="page-title">Preview</Typography>
        <div>
          {enabledVideo && (
            <Video stream={stream} muted />
          )}
        </div>
        <div className="device">
          <div className="field">
            <Typography use="caption" className="title">Microphone</Typography>
            <Switch checked={enabledAudio} onChange={this.toggleAudio} />
          </div>
          <Select options={microphones} onChange={this.onMicChange} value={selectedMicrophone} disabled={!enabledAudio} />
        </div>
        <div className="device">
          <div className="field">
            <Typography use="caption" className="title">Camera</Typography>
            <Switch checked={enabledVideo} onChange={this.toggleVideo} />
          </div>
          <Select options={cameras} onChange={this.onCamChange} value={selectedCamera} disabled={!enabledVideo} />
        </div>
        {this.supportsVirtualBackground && (
          <div className="device">
            <div className="field">
              <Typography use="caption" className="title">Virtual Background</Typography>
            </div>
            <Select options={virtualBackgroundOptions} onChange={this.onVirtualBackgroundChange} value={selectedVirtualBackground} />
          </div>
        )}
        <div className="buttons">
          <Button label="Cancel" outlined onClick={this.onExit} />
          &nbsp;
          <Button label="Join" unelevated onClick={this.onJoin} />
        </div>
      </Card>
    );
  }
} 

export default Preview;
