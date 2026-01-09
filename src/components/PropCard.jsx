import React from 'react'

const PropCard = ({ data }) => {
  return (
    <div className='parent-container'>
      
      {data.map((person, index) => (
        <div className='cards' key={index}>
          <picture className='logo'>
            <img 
              src='https://images.unsplash.com/photo-1763277339854-0bf3ebfbaf39?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              width="80px"
              height="80px"
              className='logo'
            />
          </picture>

          <h2>{person.name}</h2>

          <p>Lorem ipsum dolor sit amet consectetur</p>
          <button>View Profile</button>
        </div>
      ))}
    </div>
  )
}

export default PropCard;
