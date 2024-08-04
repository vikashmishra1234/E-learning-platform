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
      <div>

        <h2>Welcome To <strong style={{color:"#70ff70"}}>StudentX</strong></h2>
        <p>{<Typewriter delaySpeed={49} words={['Your all study material is at one place.']}/>}</p>
       
      </div>
        {/* <div className=''>

        <Lottie className='lottie' style={{margin:'auto'}} animationData={img}/>
        </div> */}

    <Wave fill='#845712'
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 80,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
  />
    </section>
    </>

  )
}

export default Home