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
      <Feature cat={'try AI'} image={ai} para={'ipsum dolor sit amet consectetur adipisicing elit. Illum accusamus dolore reprehenderit alias rerum cupiditate necessitatibus, recusandae in accusantium quia quo neque voluptatem minima ad fuga ab qui repudiandae est?'}/>
      <Feature cat={'prev year pap'} image={previous} para={'ipsum dolor sit amet consectetur adipisicing elit. Illum accusamus dolore reprehenderit alias rerum cupiditate necessitatibus, recusandae in accusantium quia quo neque voluptatem minima ad fuga ab qui repudiandae est?'}/>
      <Feature cat={"Notes"}image={notes} para={'ipsum dolor sit amet consectetur adipisicing elit. Illum accusamus dolore reprehenderit alias rerum cupiditate necessitatibus, recusandae in accusantium quia quo neque voluptatem minima ad fuga ab qui repudiandae est?'}/>
      <Feature cat={"Qauntums/Guides"}image={guide} para={'ipsum dolor sit amet consectetur adipisicing elit. Illum accusamus dolore reprehenderit alias rerum cupiditate necessitatibus, recusandae in accusantium quia quo neque voluptatem minima ad fuga ab qui repudiandae est?'}/>
    </div>
  )
}

export default Center