import { Audio, Circles } from "react-loader-spinner"

export const Loader = ()=>{
    return (
        <div style={{position:'fixed',left:"45%",right:'50%',top:"47%"}}>
                <Circles 
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  visible={true}
                />
                
        </div>
    )
}