import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AudioActions } from '../redux';
import { CoreAudioService } from '../services';

export default function useAudioListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const updateAudioState = () => {
      dispatch(AudioActions.setAudioState(CoreAudioService.context.state));
    };
    CoreAudioService.context.onstatechange = updateAudioState;
    updateAudioState();
  }, [dispatch]);
}
