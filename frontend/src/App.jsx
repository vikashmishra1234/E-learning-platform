import Navbar from "./components/Navbaa/Navbar"
import Center from "./components/center/Center"
import Home from "./components/home/Home"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Main from "./components/work/Main"
import AddNotes from "./components/add notes/AddNotes"
import SignUpForm from "./components/auth/SignUp"
import Auth from "./components/auth/Auth"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import { lazy } from "react"
import ChatBot from "./components/AiChatBot/ChatBot"
import Wave from "react-wavify"
import Footer from "./components/footer/Footer"
import Forget from "./components/forgetPassword/Forget"


const Activity = lazy(()=>import('./components/Activity/Activity'));

function App() {
  
  const Files = ()=>{
   return <div>

    
      <Home/>
      <Center/>
      <Footer/>
    </div>
  }

  return (
    <BrowserRouter>

    <Navbar/>
    <Routes>
      
        <Route exact path="/activity" element={
          <Suspense fallback={<div>loading...</div>}><Activity/> </Suspense>}/>
      
        <Route exact path="/chatbot" element={
          <Suspense fallback={<div>loading...</div>}><ChatBot/> </Suspense>}/>

     
      <Route path='/' element={ <Files/>}/>
      <Route path='/forgetpassword' element={ <Forget/>}/>

      <Route path='/add/notes' element={ <AddNotes/>}/>
      <Route path='/work' element={<Main/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
