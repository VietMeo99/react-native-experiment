import {FC, ReactElement, useEffect, useState} from 'react';

interface Props {
  children: (elapsedTime: number) => ReactElement;
  duration: number;
}

const Timer: FC<Props> = ({children, duration}) => {
  const [elapsedTime, setElapsedTime] = useState(duration);
  useEffect(() => {
    setElapsedTime(duration);
    const interval = setInterval(() => {
      setElapsedTime(p => Math.max(p - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [duration]);
  return children(elapsedTime);
};

export default Timer;
