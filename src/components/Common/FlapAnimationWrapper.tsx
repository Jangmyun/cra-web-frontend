// FlapAnimationWrapper.tsx
import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import './Flap.css';

interface DigitProps {
  target: string;
}

const Digit: React.FC<DigitProps> = ({ target }) => {
  const [current, setCurrent] = useState<string>(target);
  const [old, setOld] = useState<string>(target);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (current !== target) {
      setOld(current);
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrent(target);
        setIsAnimating(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [target, current]);

  return (
    <div className="digit" data-num={current}>
      <div className="base">{current}</div>
      <div className={`flap ${isAnimating ? 'active' : ''}`}>
        <div className="front" data-content={old} />
        <div className="back" data-content={target} />
        <div className="under" data-content={target} />
      </div>
    </div>
  );
};

interface FlapAnimationWrapperProps {
  value: number;
  children?: ReactNode;
}

const FlapAnimationWrapper: React.FC<FlapAnimationWrapperProps> = ({
  value,
  children,
}) => {
  const [digits, setDigits] = useState<string[]>([]);
  const [targetDigits, setTargetDigits] = useState<string[]>([]);

  const generateRandomDigits = useCallback(() => {
    return String(value)
      .padStart(targetDigits.length, '0')
      .split('')
      .map(() => Math.floor(Math.random() * 10).toString());
  }, [value, targetDigits.length]);

  useEffect(() => {
    const newTarget = String(value).split('');
    setTargetDigits(newTarget);

    const interval = setInterval(() => {
      setDigits(generateRandomDigits());
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDigits(newTarget);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [value, generateRandomDigits]);

  return (
    <div className="flap-container">
      <div className="digits-group">
        {digits.map((d, i) => (
          <Digit key={i} target={d} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default FlapAnimationWrapper;
