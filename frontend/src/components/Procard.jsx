import { Link } from "react-router-dom"
function Procard({ img, title, members, date }) {

    return (

        <>
            <Link to={`/${title}`} className='cursor-pointer'>
                <div id="cardBorder" className=" p-3 pb-4 w-95 h-50 rounded-xl bg-[#f9f9f9] shadow hover:bg-[#f3f3f3] cursor-pointer">
                    <div id="dateMenu" className="w-full flex justify-between">
                        <p className="m-0 text-xs font-semibold">{date}</p>
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                    <div className=" flex flex-col items-center w-full gap-3 mt-3">
                        <img className="" src={img} alt="" />
                        <p className="w-fit">{title}</p>
                        <div className="flex">
                            {members && members.map((member, index) => (
                                <img key={index} src={member} className='object-cover rounded-full w-8 h-8 ' />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </>

    )

}

export default Procard