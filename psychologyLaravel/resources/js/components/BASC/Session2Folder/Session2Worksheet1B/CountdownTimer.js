import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialCount }) => {
  const [timeLeft, setTimeLeft] = useState(initialCount);

  useEffect(() => {
    // Store the target end time based on the current time and the initial count
    const endTime = new Date().getTime() + timeLeft * 1000;

    const interval = setInterval(() => {
      // Calculate the remaining time by comparing the end time with the current time
      const now = new Date().getTime();
      const distance = endTime - now;
      const secondsLeft = Math.round(distance / 1000);

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(secondsLeft);
      }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        Time Left: {timeLeft} seconds
    </div>
  );
};

export default CountdownTimer;
