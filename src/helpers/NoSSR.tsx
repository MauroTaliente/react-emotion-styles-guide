import React, { useState, FC, ReactNode } from 'react';

const IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
  React.useLayoutEffect = React.useEffect;
}
const useIsomorphicLayoutEffect = React.useLayoutEffect;

interface NoSSRProps {
  children: ReactNode;
  defer?: boolean;
  loading?: ReactNode;
}

const NoSSR: FC<NoSSRProps> = ({ children, defer = false, loading = null }) => {
  const [isMounted, setMountedState] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);
  return <>{isMounted ? children : loading} </>;
};

export default NoSSR;
