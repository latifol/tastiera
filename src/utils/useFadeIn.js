import { useEffect } from 'react';

export default function useFadeIn(setFadeIn) {
  useEffect(() => {
    setFadeIn(true);
  }, [setFadeIn]);
}
