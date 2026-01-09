import React, {useState} from 'react'

const FunctionCounter = () => {

    const [count, setCount] = useState(0);

  return (
    <div>
        <button onClick={() => setCount(count+1 * 3)}> Count {count} </button> 
    </div>
  )
}

export default FunctionCounter