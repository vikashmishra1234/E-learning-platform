import { Audio, Circles } from "react-loader-spinner"

export const Loader = ()=>{
    return (
        <div style={{position:'fixed',width:'fit-content',left:"38%",right:'50%',top:"47%"}}>
                <Circles 
                  height="90"
                  width="90"
                  
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  visible={true}
                />
                
        </div>
    )
}