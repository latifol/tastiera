import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AudioActions } from '../redux';

/**
 * Listens for keyboard events and sends simulated note on / off messages
 * For testing without a MIDI controller connected.
 */

// just allow up to the Z key
const MAX_KEY_CODE = 90;

export default function useTestHarness() {
  const keyboardInput = useSelector((state) => state.config.keyboardInput);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleNoteOn = (e) => {
      if (!e.repeat && e.keyCode <= MAX_KEY_CODE) {
        const payload = mockMIDIPayload(e, true);
        dispatch(AudioActions.noteOn({velocity: payload.rawVelocity, note: payload.note.number}));
      }
    };
    const handleNoteOff = (e) => {
      if (!e.repeat && e.keyCode <= MAX_KEY_CODE) {
        const payload = mockMIDIPayload(e, true);
        dispatch(AudioActions.noteOff(payload.note.number));
      }
    };
    const handleLoseFocus = (e) => {
      if (document.hidden) {
        dispatch(AudioActions.clearAudioBuffer());
      }
    };
    if (keyboardInput) {
      window.addEventListener('keydown', handleNoteOn);
      window.addEventListener('keyup', handleNoteOff);
      window.addEventListener('visibilitychange', handleLoseFocus);
      window.addEventListener('onBlur', handleLoseFocus);
    } else {
      window.removeEventListener('keydown', handleNoteOn);
      window.removeEventListener('keyup', handleNoteOff);
      window.removeEventListener('visibilitychange', handleLoseFocus);
      window.removeEventListener('onBlur', handleLoseFocus);
    }
    return () => {
      window.removeEventListener('keydown', handleNoteOn);
      window.removeEventListener('keyup', handleNoteOff);
      window.removeEventListener('visibilitychange', handleLoseFocus);
      window.removeEventListener('onBlur', handleLoseFocus);
    };
  }, [dispatch, keyboardInput]);
}

const mockMIDIPayload = (event, isNoteOn) => {
  const velo = Math.floor(70 + 57 * Math.random());
  console.log(velo);
  return {
    channel: 10,
    data: [153, event.keyCode, velo],
    note: { number: event.keyCode, name: null, octave: null },
    rawVelocity: velo,
    target: null,
    timestamp: 0,
    type: isNoteOn ? 'noteon' : 'noteoff',
    velocity: 0.5511811023622047,
  };
};
