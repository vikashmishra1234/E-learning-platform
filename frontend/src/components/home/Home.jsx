import React from 'react'
import './style.css'
import { Typewriter } from 'react-simple-typewriter'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const Navigate = useNavigate();

  return (
    <>
    <section className='home-section'>
      <div className='home-div'>

        <motion.h2
        initial={{x:-89,opacity:.6}}
        whileInView={{x:0,opacity:1}}
        transition={{duration:1}}
        >Welcome to your journey of limitless learning !</motion.h2>
       
       <motion.div
       initial={{scale:0}}
       whileInView={{scale:1}}
       transition={{duration:1}}
        className='quote'>
        {<Typewriter words={['The best view comes after the hardest climb. Each step you take brings you closer to the summit. Embrace the journey, for it shapes who you become.']} />}
       </motion.div>
      <motion.div
         initial={{y:19,opacity:0}}
         whileInView={{y:0,opacity:1}}
         transition={{duration:1,delay:1}}
       className='add-notes'>
        <button  onClick={()=>Navigate('/add/notes')}>Share Files</button>
      </motion.div>
      </div>
        {/* <div className=''>

        <Lottie className='lottie' style={{margin:'auto'}} animationData={img}/>
        </div> */}

    

    </section>
    </>

  )
}

export default Home