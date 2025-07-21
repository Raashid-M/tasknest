function Statscard( {head, count}){

    return(
        <>
        
        <div className="bg-[#f9f9f9] px-5 py-3 w-70 rounded-xl shadow ">
            
            <p className="text-lg">{head}</p>
            <p className="text-2xl font-bold">{count}</p>

        </div>

        </>
    )

}

export default Statscard