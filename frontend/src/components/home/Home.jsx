import React from 'react'
import './style.css'
import { Typewriter } from 'react-simple-typewriter'
import Lottie from 'lottie-react';
import img from '../../assets/animation.json'
import Wave from 'react-wavify';

const Home = () => {
  return (
    <>
    <section className='home-section'>
      <div className='home-div'>

        <h2>Welcome To <strong >StudentX</strong></h2>
        <p>{<Typewriter delaySpeed={49} words={['Your all study material is at one place.']}/>}</p>
       <div className='quote'>
       "The best view comes after the hardest climb. Each step you take brings you closer to the summit. Embrace the journey, for it shapes who you become."
       </div>
      </div>
        {/* <div className=''>

        <Lottie className='lottie' style={{margin:'auto'}} animationData={img}/>
        </div> */}

    

    </section>
    </>

  )
}

export default Home