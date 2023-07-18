import { useEffect } from 'react';
import { CoreAudioService } from '../services';
import { Volume } from '../constants';
import { useSelector } from 'react-redux';

export default function useAudioInitializer() {
  const volume = useSelector((state) => state.audio.volume);

  useEffect(() => {
    const initializeMasterGain = () => {
      CoreAudioService.masterGainNode.gain.setValueAtTime(
        Volume[volume],
        CoreAudioService.context.currentTime
      );
      CoreAudioService.preampGainNode.connect(CoreAudioService.masterGainNode);
      CoreAudioService.masterGainNode.connect(
        CoreAudioService.context.destination
      );
      CoreAudioService.monkeyPatch();
      CoreAudioService.unlockAudioContext();
    };
    initializeMasterGain();
  }, [volume]);
}
