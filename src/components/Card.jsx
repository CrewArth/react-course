import React from 'react'
import { CiBookmark } from "react-icons/ci";


const Card = () => {
  return (
<div className='card'>
        <div className='top'>
          <img src='https://e7.pngegg.com/pngimages/832/502/png-clipart-amazon-logo-text-brand-amazon-text-service-thumbnail.png'/>
          <button><CiBookmark size={15}/>Save</button>
        </div>

        <div className='center'>
          <h3>Amazon <span>5 days ago</span></h3>
          <h2>Senior UI/ UX Designer</h2>
          <div className='tags'>
            <h4>Part Time</h4>
            <h4>Senior Level</h4>
          </div>
        </div>

        <div className='bottom'>
          <div>
              <h3>$300-450k</h3>
              <p>Mumbai, India</p>
            </div>
             <button>Apply Now</button>
          </div>
      </div>
    )
}

export default Card