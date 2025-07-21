import { useState } from "react"

function Alert(){
    let [alertStatus,setAlert]=useState(false)
    function alertHandller(){
        setAlert((prev)=>!prev )
    }

    return(
        <>
        
            <div className="mt-20 flex justify-center flex-col items-center">

                <h1 className="text-6xl text-center font-bold">Alert</h1>
                
                <div className="mt-10 flex gap-2 justify-center">
                    <button onClick={alertHandller}  className="px-5 py-2 text-2xl text-white bg-orange-400 cursor-pointer rounded-lg w-40">{alertStatus ? 'Hide' : 'Show'} alert</button>   
                </div>
                {alertStatus ? <div className="bg-black px-6 py-3 w-fit rounded-lg text-white mt-10"> this is an Alert </div> : ""}
                
            </div>

        </>
    )
}

export default Alert