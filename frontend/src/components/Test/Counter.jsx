import { useState } from "react"

function Counter(){
    let [count,setCount]=useState(0)
    function add(){
        setCount((a)=>a+1)
        // console.log(count)

    }
    function sub(){
        setCount((a)=>a-1)
        console.log(count)
    }
    return(
        <>
        
            <div className=" mt-20">

                <h1 className="text-6xl text-center font-bold">Counter</h1>
                <p className="mt-10 text-5xl font-bold">{count}</p>
                <div className="mt-10 flex gap-2 justify-center">
                    <button onClick={sub}  className="px-5 py-2 text-2xl text-white bg-orange-400 cursor-pointer rounded-lg w-40">-</button>
                    <button onClick={add}  className="px-5 py-2 text-2xl text-white bg-orange-400 cursor-pointer rounded-lg w-40">+</button>
                </div>
                
            </div>

        </>
    )
}

export default Counter