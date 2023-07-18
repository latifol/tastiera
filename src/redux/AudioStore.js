import { configureStore } from '@reduxjs/toolkit'

import AudioReducer from './AudioReducer';
import ConfigReducer from './ConfigReducer';

const store = configureStore({ reducer: { audio: AudioReducer, config: ConfigReducer } });

export default store;
