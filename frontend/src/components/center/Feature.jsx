import React from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';


const Feature = ({image,para,cat,link}) => {
    const Navigate = useNavigate();
  return (
    <motion.div 
    initial={{ scale:.7 }}
     whileInView={{scale:1 }}
    
    transition={{duration:1.2}} 
    className='feature'>
        <img src={image} alt="image" />
        <p>
            {para}
        </p>
        <div>
            <button id='btn' onClick={()=>Navigate(link)}>{cat}</button>
        </div>
    </motion.div>
  )
}

export default Feature