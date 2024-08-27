import Navbar from "./components/Navbaa/Navbar";
import Center from "./components/center/Center";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/work/Main";
import AddNotes from "./components/add notes/AddNotes";
import SignUpForm from "./components/auth/SignUp";
import Auth from "./components/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { lazy } from "react";
import ChatBot from "./components/AiChatBot/ChatBot";
import Wave from "react-wavify";
import Footer from "./components/footer/Footer";
import Activity from './components/Activity/Activity'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();
  const Files = () => {
    return (
      <div>
        <Home />
        <Center />
        <Footer />
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/activity"
          element={
          
              <Activity />
           
          }
        />

        <Route
          exact
          path="/chatbot"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <ChatBot />{" "}
            </Suspense>
          }
        />

        <Route path="/" element={<Files />} />
       

        <Route path="/add/notes" element={<AddNotes />} />
        <Route path="/work" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
