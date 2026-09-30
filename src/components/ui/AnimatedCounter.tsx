'use client';
import { useEffect, useState, useRef } from 'react';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const AnimatedCounter = ({ value, duration = 1000, prefix = '', suffix = '', decimals = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    let startTime: number;
    const startValue = prevValue.current;
    const endValue = value;

    if (startValue === endValue) {
      setCount(endValue);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easedProgress = easeOutCubic(percentage);
      const currentVal = startValue + (endValue - startValue) * easedProgress;
      
      setCount(currentVal);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        prevValue.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
