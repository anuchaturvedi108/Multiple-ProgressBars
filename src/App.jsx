import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const App = () => {
  //This will return the array of 10 item which has 5 active and 5 inactive items
  const [progressBars, setProgressBars] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      progress: Math.random() * 10 + 5, // Random progress increment
      active: i < 5, // Initially activate only the first five
    }))
  );

  const handleComplete = (id) => {
    setProgressBars((prev) => {
      // Find the first inactive progress bar to reactivate
      const nextBarToActivate = prev.find((bar) => !bar.active);
      if (!nextBarToActivate) return prev;

      return prev.map((bar) =>
        bar.id === id
          ? { ...bar, active: false }
          : bar.id === nextBarToActivate.id
          ? { ...bar, active: true }
          : bar
      );
    });
  };

  return (
    <div>
      {progressBars.map((bar) =>
        bar.active ? (
          <ProgressBar
            key={bar.id}
            id={bar.id}
            progress={bar.progress}
            onComplete={handleComplete}
          />
        ) : (
          <h2>loading...</h2>
        )
      )}
    </div>
  );
};

export default App;
