import React from 'react';


const Feature = ({image,para,cat}) => {
  return (
    <div className='feature'>
        <img src={image} alt="image" />
        <p>
            {para}
        </p>
        <div>
            <button>{cat}</button>
        </div>
    </div>
  )
}

export default Feature