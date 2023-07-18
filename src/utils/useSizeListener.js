import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ConfigActions } from '../redux';

/**
 * Listens for window resizing and submits the dimensions to the Redux
 *   global state.
 */

export default function useSizeListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleSizeChange = () => {
      dispatch(
        ConfigActions.setDimensions(window.innerWidth, window.innerHeight)
      );
    };
    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [dispatch]);
}
