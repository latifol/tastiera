import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WebMidi } from 'webmidi';
import { ConfigActions, AudioActions } from '../redux';

const NOTIFICATION_MESSAGE = {
  title: 'hey there',
  body:
    "unfortunately, the MIDI drivers for tastiera aren't supported in your browser. sorry about that! give it a shot in Chrome, Edge, or Opera. ✨",
};

const useMidiService = () => {
  const [scanFlag, setScanFlag] = useState(false);
  // todo: buffer needs to be cleared eventually
  const [timestampBuffer, ] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      WebMidi.enable(() => {
        dispatch(ConfigActions.setScanningForDevice(true));
        // Reacting when a new device becomes available
        // The listeners are actually always listening
        WebMidi.addListener('connected', function (e) {
          // todo: store the input name in the deviceConnected field
          dispatch(ConfigActions.setDeviceConnected(true));
          dispatch(ConfigActions.setScanningForDevice(false));
          setTimeout(() => setScanFlag((s) => !s), 500);
        });
        WebMidi.addListener('disconnected', function (e) {
          if (WebMidi.inputs.length === 0) {
            dispatch(ConfigActions.setDeviceConnected(false));
            dispatch(ConfigActions.setScanningForDevice(true));
            setTimeout(() => setScanFlag((s) => !s), 500);
          }
        });
        WebMidi.inputs.forEach((input) => {
          input.addListener('noteon', 'all', (event) => {
            const payload = { velocity: event.rawVelocity, note: event.note.number };
            debounceEvent(event.timestamp, AudioActions.noteOn, payload, dispatch)
          });
          input.addListener('noteoff', 'all', (event) => {
            debounceEvent(event.timestamp, AudioActions.noteOff, event.note.number, dispatch);
          });
          input.addListener('pitchbend', 'all', (event) => {
            dispatch(AudioActions.pitchBend(event));
          });
          input.addListener('controlchange', 'all', (event) => {
            switch (event.value) {
              case 64:
                dispatch(AudioActions.togglePedal(event));
                break;
              default:
                return null;
            }
          });
        });
      });
    } catch (e) {
      dispatch(ConfigActions.setNotification(NOTIFICATION_MESSAGE));
      setTimeout(() => dispatch(ConfigActions.setModalVisible(true), 3000));
    }

    const debounceEvent = (timestamp, action, payload) => {
      if(!isDuplicate(timestamp, timestampBuffer)) {
        // no time to wait for async setState, so we're modifying state directly :-/
        timestampBuffer[timestamp] = true;
        dispatch(action(payload));
      }
    }
  }, [scanFlag, dispatch, timestampBuffer]);

};

const isDuplicate = (timestamp, timestampBuffer) => {
  if(timestampBuffer[timestamp]) {
    return true;
  }
}

export default useMidiService;
