import { Breakpoints } from '../constants';

const defaultState = {
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth <= Breakpoints.MOBILE,
  isTablet:
    window.innerWidth > Breakpoints.MOBILE &&
    window.innerWidth <= Breakpoints.TABLET,
  isDesktop: window.innerWidth > Breakpoints.TABLET,
  keyboardInput: true,
  modalVisible: false,
  notification: {},
  selectedPreset: 0,
  presetNames: [],
  deviceConnected: false,
  scanningForDevice: false,
  showHelp: true,
  effects: [],
};

const ConfigReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DEVICE_CONNECTED':
      return {
        ...state,
        deviceConnected: action.payload,
      };
    case 'SET_DIMENSIONS':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        isMobile: action.payload.width <= Breakpoints.MOBILE,
        isTablet:
          action.payload.width > Breakpoints.MOBILE &&
          action.payload.width <= Breakpoints.TABLET,
        isDesktop: action.payload.width > Breakpoints.TABLET,
      };
    case 'SET_KEYBOARD_INPUT':
      return {
        ...state,
        keyboardInput:
          action.payload === undefined ? !state.keyboardInput : action.payload,
      };
    case 'SET_MODAL_VISIBLE':
      return {
        ...state,
        modalVisible: action.payload,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };
    case 'SET_SCANNING':
      return {
        ...state,
        scanningForDevice: action.payload,
      };
    case 'SET_SHOW_HELP':
      return {
        ...state,
        showHelp:
          action.payload === undefined ? !state.showHelp : action.payload,
      };
    default:
      return { ...state };
  }
};

export default ConfigReducer;
