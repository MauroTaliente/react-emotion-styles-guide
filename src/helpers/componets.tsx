import React, { useState, FC, ReactNode } from 'react';

const IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
  React.useLayoutEffect = React.useEffect;
}
const useIsomorphicLayoutEffect = React.useLayoutEffect;

interface WrapProps {
  children: ReactNode;
  defer?: boolean;
  loading?: ReactNode;
}

const ForceCSR: FC<WrapProps> = ({ children, defer = false, loading = null }) => {
  const [isMounted, setMountedState] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);
  return <>{isMounted ? children : loading} </>;
};

const ForceIRR: FC<WrapProps> = ({ children, defer = false }) => {
  const [isMounted, setMountedState] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);
  return <>{isMounted ? children : children} </>;
};

export { ForceCSR, ForceIRR };
