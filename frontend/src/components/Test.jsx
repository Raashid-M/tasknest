import Posts from '../data/Posts';

function Test() {
    return (
        <>
            <div className='flex flex-wrap gap-4 justify-center'>{Posts.map((post, index) => (
                <div key={index} className=" w-[460px]  mt-20 p-2 rounded-xl shadow">
                    <div className="flex justify-between mb-3">
                        <div className="flex gap-2">
                            <img src={post.user.avatar} className="w-10 h-10 object-cover rounded-full" alt="" />
                            <div className="text-sm">
                                <h3 className="">{post.user.name}</h3>
                                <p className="text-gray-600 text-xs">{post.user.username}</p>
                            </div>
                        </div>
                        <i className="bi bi-three-dots-vertical text-gray-500"></i>
                    </div>
                    <img className="rounded-lg" src={post.image} alt=""/>
                    <p className="text-black mt-3">{post.caption}<span className="text-blue-600">#{post.tags.join(' #')}</span> </p>
                    <div className="text-xl flex justify-between mt-2">
                        <div className="flex gap-2">
                            <i className="bi bi-heart hover:text-red-600"></i>
                            <i className="bi bi-chat-left hover:text-blue-500"></i>
                            <i className="bi bi-send"></i>
                        </div>
                        <i className="bi bi-bookmark"></i>
                    </div>
                </div>
            ))}
            </div>

        </>
    )
}

export default Test