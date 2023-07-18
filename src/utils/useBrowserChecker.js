import { useEffect } from 'react';
import { ConfigActions } from '../redux';
import { useDispatch } from 'react-redux';

const NOTIFICATION_MESSAGE = {
  title: 'hey there',
  body: "unfortunately, the MIDI drivers for gestalt aren't supported in your browser. sorry about that! give it a shot in Chrome, Edge, or Opera. ✨",
};

const useBrowserChecker = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Opera 8.0+
    const isOpera =
      (!!window.opr && !!window.opr.addons) ||
      window.opera ||
      navigator.userAgent.indexOf(' OPR/') >= 0;

    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 71
    const isChrome = window.chrome;

    if (isEdge || isChrome || isOpera) {
    } else {
      dispatch(ConfigActions.setNotification(NOTIFICATION_MESSAGE));
      setTimeout(() => dispatch(ConfigActions.setModalVisible(true), 3000));
    }
  }, [dispatch]);
};

export default useBrowserChecker;
