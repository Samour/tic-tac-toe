import React, { useState } from 'react';

const Counter = (): React.ReactElement => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>The current count is: {count}</p>
      <div className='button-row'>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
