import { useEffect, useLayoutEffect, useState } from 'react';

// const isBrowser = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

const useMediaQuery = (prefixes: string, resolution: string): boolean => {
  const query = `(${prefixes}: ${resolution})`;

  // const [isSSR, setIsSSR] = useState(true);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const mediaInitial = isBrowser ? matchMedia(query).matches : false;

  const [matches, setMatches] = useState<boolean>(mediaInitial);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
