import { useEffect, useRef, useState } from 'react';
import { DeviceManager } from 'eyeson';
import { Select } from '@rmwc/select';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from '@rmwc/dialog';
import { getSelectedDeviceId, mapDeviceList } from './utils.js';

const SettingsDialog = ({ open, onClose }) => {
    
  const deviceManager = useRef();
  const videoElement = useRef();
  const [cameras, setCameras] = useState([]);
  const [microphones, setMicrophones] = useState([]);
  const [selectedMicrophone, setSelectedMicrophone] = useState();
  const [selectedCamera, setSelectedCamera] = useState();

  const handleClose = event => {
    let updateStream = false;
    if (event.detail.action === 'apply') {
      deviceManager.current.storeConstraints();
      updateStream = true;
    }
    onClose(updateStream);
  };

  const changeMicrophone = event => {
    const deviceId = event.currentTarget.value;
    if (deviceManager.current && deviceId) {
      setSelectedMicrophone(deviceId);
      deviceManager.current.setAudioInput(deviceId);
    }
  };

  const changeCamera = event => {
    const deviceId = event.currentTarget.value;
    if (deviceManager.current && deviceId) {
      setSelectedCamera(deviceId);
      deviceManager.current.setVideoInput(deviceId);
    }
  };

  useEffect(() => {
    const handleChange = event => {
      const { error, stream, microphones, cameras } = event;
      console.debug(event);
      if (error) {
        console.error(error);
        return;
      }
      if (microphones) {
        setMicrophones(microphones.map(mapDeviceList));
      }
      if (cameras) {
        setCameras(cameras.map(mapDeviceList));
      }
      if (stream) {
        const microphoneId = getSelectedDeviceId(stream, 'Audio');
        const cameraId = getSelectedDeviceId(stream, 'Video');
        videoElement.current.srcObject = event.stream;
        setSelectedMicrophone(microphoneId);
        setSelectedCamera(cameraId);
      }
    };
    if (open) {
      deviceManager.current = new DeviceManager();
      deviceManager.current.onChange(handleChange);
      deviceManager.current.start();
    }
    else if (deviceManager.current) {
      deviceManager.current.removeListener(handleChange);
      deviceManager.current.stop();
      deviceManager.current = null;
      videoElement.current.srcObject = null;
    }
  }, [open]);

  return (
    <Dialog
      id="dialog-settings"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Devices</DialogTitle>
      <DialogContent>
        <video ref={videoElement} playsInline autoPlay muted />
        <Select
          label="Microphone"
          value={selectedMicrophone}
          options={microphones}
          onChange={changeMicrophone}
        />
        <Select
          label="Camera"
          value={selectedCamera}
          options={cameras}
          onChange={changeCamera}
        />
      </DialogContent>
      <DialogActions>
        <DialogButton outlined action="close">Cancel</DialogButton>
        <DialogButton unelevated action="apply" isDefaultAction>Apply</DialogButton>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
