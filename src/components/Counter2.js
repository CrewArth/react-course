import React, { useState } from 'react'

export const Counter2 = () => {

    const initialCount = 0
    const [count, setCount] = useState(initialCount)
     

  return (
    <div>

        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>Incre</button>
        <button onClick={() => setCount(count - 1)}>Decre</button>
    </div>
  )
}
