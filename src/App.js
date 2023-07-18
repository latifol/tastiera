import React from 'react';
import {
  useTestHarness,
  useAudioListener,
  useAudioInitializer,
} from './utils';
import { useMidiService } from './services';

function App() {
  /****************************
   * Audio Initializers
   ****************************/
  useMidiService();
  useTestHarness();
  useAudioListener();
  useAudioInitializer();

  /****************************
   * Render
   ****************************/
  return (
    <div  />
  );
}

export default App;
