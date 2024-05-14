import React from 'react'
import './style.css'
import { Typewriter } from 'react-simple-typewriter'
import Lottie from 'lottie-react';
import img from '../../assets/animation.json'
const Home = () => {
  return (
    <section className='home-section'>
        <h2>{<Typewriter loop={true} words={['Welcome to StudentX']}/>}</h2>
        <p>Your all study material is at one place.</p>
        <div className=''>

        <Lottie className='lottie' style={{margin:'auto'}} animationData={img}/>
        </div>

    </section>
  )
}

export default Home