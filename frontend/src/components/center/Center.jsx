import React from 'react'
import {Link} from 'react-router-dom'
import Feature from './Feature'
import './style.css'
import ai from '../../assets/ai.avif';
import notes from '../../assets/sharenotes.png';
import previous from '../../assets/previous.jpg';
import guide from '../../assets/guide.png'


const Center = () => {
  return (
    <div className='feature-container'>
      <h2>Features</h2>
      <Feature link={'/chatbot'} cat={'Try AI'} image={ai} para={'Experience a smarter, more interactive Student X. Our new AI-powered features are designed to make your learning journey smoother and more engaging.Dive into a world of enhanced learning and see how AI can transform your educational experience.'}/>
      <Feature link={`/work?q=previous`} cat={"prev year pap"}image={guide} para={'Unlock a valuable resource with our new quantums/guide books on Student X. These compact books are packed with all the important questions that may appear in your exams. They’re designed to help you focus your study efforts on key topics and ensure youre well-prepared for any exam. '}/>
      <Feature link={`/work?q=quantum`} cat={"Qauntums/Guides"}image={notes} para={'Take advantage of our new notes accessing feature on Student X. Seamlessly view, organize, and manage all your class notes in one convenient place. Whether you re reviewing for an exam or need a quick reference, our platform ensures that your notes are always within reach.'}/>
      <Feature link={`/work?q=notes`} cat={'Notes'} image={previous} para={'Unlock a treasure trove of past exam papers with our new feature on Student X. Gain valuable insights and practice with previous year’s questions to better prepare for your upcoming exams'}/>
    </div>
  )
}

export default Center