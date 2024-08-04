import { Audio, Circles } from "react-loader-spinner"

export const Loader = ()=>{
    return (
        <div className="loader">
          <div className="load">

                <Circles 
                  height="90"
                  width="90"
                  
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  visible={true}
                />
          </div>
                
        </div>
    )
}