import Posts from '../data/Posts';
import Header from '../components/Header';

function Wip() {
    return (
        <>
             <div className='w-full h-screen flex flex-col '>  

                <div className='flex flex-1 px-8 pt-5'>  
                    {/* content */}

                    <div className='w-full flex flex-col h-full '>
                        <Header />
                        <br />
                        <div className='flex  flex-1 overflow-hidden justify-center items-center'>
                                <h1 className='text-5xl font-bold text-orange-500'>Work in Progress !!!</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Wip