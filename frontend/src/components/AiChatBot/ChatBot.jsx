import React, { useEffect, useState } from "react";
import "./style.css";
import { IoMdSend } from "react-icons/io";
import googleGeminiService from "../configGemini/gemini";
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Import the desired theme
import 'prismjs/components/prism-javascript';  // Example: Okaidia theme
import { toast } from "react-toastify";
import load from '../../assets/loader.gif'


const arr = [];
const ChatBot = () => {
  const [problem, setProblem] = useState("");
  const [question, setQuestion] = useState('');
  const [response,setResponse] = useState('');
  const [loader,setLoader] = useState(false);

  const delayRes = (ind,word)=>{

    const myTimeout = setTimeout(function(){
      setResponse(prev=>prev+word)
     
    }, 75*ind);
  }

  const formatCode = (codeString) => {
    return codeString
      .replace(/\\n/g, '\n') 
      .replace(/\\t/g, '\t');
  };
 
  const handleKeyPress = async (e) => {
    if (e.which == 13 && question) {
      setResponse('')
      setProblem(question);
      try {
        setLoader(true)
        const result = await googleGeminiService.generateContent(question);
        setLoader(false)
        const formatedResult = formatCode(result.candidates[0].content.parts[0].text);
        const split = formatedResult.split(" ");
        for(let i = 0;i<split.length;i++){
          delayRes(i,split[i]+" ");
        }

      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong");
      }
    }
  };
  useEffect(() => {
    if (response) {
      Prism.highlightAll();
    }
  }, [response]);
  return (
    <div className="ai-section">
      <div className="chatting-area">
        
             {problem?<div className="problem">{problem}</div>:<h2>Welcome ! I am Your Ai Assistant</h2>} 
            
            {
              loader?<img id="loads" src={load} alt="" />:
              <div className="answer"> 
                {
                  response?<pre>
                  <code className="language-javascript">{response}</code>
                </pre>:""
                }
              
            </div>
            }
          
        {}
      </div>
      <div className="input-area" onKeyDown={(e) => handleKeyPress(e)}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your Problem"
        />
        <IoMdSend onClick={handleKeyPress} size={30} />
      </div>
    </div>
  );
};

export default ChatBot;
