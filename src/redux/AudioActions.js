const AudioActions = {
  addEffect: (payload) => {
    return {
      type: 'ADD_EFFECT',
      payload: payload,
    };
  },
  clearAudioBuffer: () => {
    return {
      type: 'CLEAR_AUDIO_BUFFER',
    };
  },
  noteOn: (event) => {
    return {
      type: 'ADD_NOTE',
      payload: event,
    };
  },
  noteOff: (event) => {
    return {
      type: 'REMOVE_NOTE',
      payload: event,
    };
  },
  pitchBend: (event) => {
    return {
      type: 'PITCH_BEND',
      payload: event,
    };
  },
  removeEffect: (payload) => {
    return {
      type: 'REMOVE_EFFECT',
      payload: payload,
    };
  },
  setTempo: (payload) => {
    return {
      type: 'SET_TEMPO',
      payload: payload,
    };
  },
  setVolume: (payload, scale) => {
    return {
      type: 'SET_VOLUME',
      scale: scale ? scale : 'MIDI',
      payload: payload,
    };
  },
  toggleEffect: (payload) => {
    return {
      type: 'TOGGLE_EFFECT',
      payload: payload,
    };
  },
  togglePedal: (event) => {
    return {
      type: 'TOGGLE_PEDAL',
      payload: event,
    };
  },
  setAudioState: (status) => {
    return {
      type: 'SET_AUDIO_STATE',
      payload: status,
    };
  },
  updateEffectParam: ({ indexOfEffect, indexOfParam, type, value }) => {
    return {
      type: 'UPDATE_EFFECT_PARAM',
      indexOfEffect: indexOfEffect,
      indexOfParam: indexOfParam,
      typeOfParam: type,
      value: value,
    };
  },
};

export default AudioActions;
