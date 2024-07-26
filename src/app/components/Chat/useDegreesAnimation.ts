import { useEffect, useRef } from 'react';

export const useDegreesAnimation = <T extends HTMLElement>(
  speed = 0.5,
  enabled = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    let degrees = 0;

    function animate() {
      if (!isMounted || !ref.current) return;

      const div = ref.current;
      div.style.setProperty('--deg', degrees + 'deg');
      degrees = (degrees + speed) % 360;
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      isMounted = false;
    };
  }, [speed, enabled]);

  return ref;
};
