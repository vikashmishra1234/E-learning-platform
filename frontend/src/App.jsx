import Navbar from "./components/Navbaa/Navbar"
import Center from "./components/center/Center"
import Home from "./components/home/Home"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Main from "./components/work/Main"
import AddNotes from "./components/add notes/AddNotes"
import SignUpForm from "./components/auth/SignUp"
import Auth from "./components/auth/Auth"


function App() {
  
  const Files = ()=>{
   return <div>

    
      <Home/>
      <Center/>
    </div>
  }

  return (
    <BrowserRouter>

    <Navbar/>
    <Routes>
      <Route path='/' element={ <Files/>}/>
      <Route path='/add/notes' element={ <AddNotes/>}/>
      <Route path='/work' element={<Main/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
