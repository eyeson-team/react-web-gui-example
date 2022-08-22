export const getRoomToken = ACCESS_KEY_LENGTH => {
  const token = location.search.substring(1).split('&').find(line => line.length === ACCESS_KEY_LENGTH && !line.includes('='));
  return token || '';
};

export const getSelectedDeviceId = (stream, type) => {
  try {
    const tracks = stream[`get${type}Tracks`]();
    if (tracks.length > 0) {
      const settings = tracks[0].getSettings();
      return settings.deviceId;
    }
  } catch (error) {
    console.error(error);
  }
  return '';
};

export const mapDeviceList = device => ({ value: device.deviceId, label: device.label });
