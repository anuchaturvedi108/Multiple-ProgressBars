import React, { useEffect, useState } from 'react';

const ProgressBar = ({ id, progress, onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval;

    if (percent < 100) {
      interval = setInterval(() => {
        setPercent((prev) => {
          //Need to check which one is lesser prev+progress  value or 100
          const newPercent = Math.min(prev + progress, 100);
          if (newPercent === 100) {
            clearInterval(interval);
            onComplete(id);
          }
          return newPercent;
        });
      }, 1000); // Update every second
    }

    // Clean up interval on component unmount or when progress completes
    return () => {
      clearInterval(interval);
    };
  }, [percent, progress, id, onComplete]);

  return (
    <div style={{ margin: '10px 0' }}>
      {/* You can write a css for this purpose */}
      {/* <div style={{ width: '100%', backgroundColor: '#eee' }}>
        <div
          style={{
            width: `${percent}%`,
            height: '20px',
            backgroundColor: '#4caf50',
            transition: 'width 1s',
          }}
        />
      </div> */}
      {/* Use this HTML progress Bar */}
      <progress  value={percent} max="100"></progress>
      <p>{`Progress: ${Math.floor(percent)}%`}</p>
    </div>
  );
};

export default ProgressBar;
