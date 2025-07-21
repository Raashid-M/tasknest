import Header from '../components/Header'
import Taskcard from '../components/Taskcard'
import Tasks from '../data/Tasks-data'
import useAuthRedirect from '../hooks/useAuthRedirect';
import usePersonalTasks from '../hooks/usePersonalTasks';
import useCreateTask from '../hooks/useCreateTask';
import NewTaskForm from '../components/NewTaskForm';
import { useState } from 'react';



function Taskspage() {
    useAuthRedirect(); // handles login protection
    const [refreshKey, setRefreshKey] = useState(0);
    const tasks = usePersonalTasks(refreshKey);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const {
    } = useCreateTask(() => {
        setRefreshKey(prev => prev + 1);
        setShowCreateForm(false);
    });


    return (
        <>
            <div className='w-full h-screen flex flex-col '>

                <div className='flex flex-1 px-10 pt-5'>
                    {/* content */}

                    <div className='w-full flex flex-col h-full '>
                        <Header />
                        <div className='flex flex-1 overflow-hidden gap-8' >

                            < div id='Tasks-div' className='flex-col flex-1 flex ' >

                                <div className='w-full'>
                                    <h2 className='text-3xl m-0'>All tasks</h2>
                                    <br />
                                    {/* <div className='flex items-center gap-5'>
                                        <p className='text-xl ml-1 text-gray-600'>///////////////</p>
                                        <div>
                                            <button className='bg-[#f9f9f9] px-2 py-1 rounded shadow mr-2 cursor-pointer'>
                                                <i class="bi bi-arrow-left-circle text-lg"></i>
                                            </button>
                                            <button className='bg-[#f9f9f9] px-2 py-1 rounded shadow mr-2 cursor-pointer'>
                                                <i class="bi bi-arrow-right-circle text-lg"></i>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='overflow-y-auto pr-2 no-scrollbar mt-5 w-full' style={{ height: 'calc(100vh - 200px)' }}>
                                    {showCreateForm ? (
                                        <NewTaskForm
                                            onSuccess={() => {
                                                setRefreshKey(prev => prev + 1);
                                                setShowCreateForm(false);
                                            }}
                                            onCancel={() => setShowCreateForm(false)}
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setShowCreateForm(true)}
                                            className="bg-[#f3f3f3] px-5 py-3 w-full rounded-xl h-20 shadow hover:bg-[#f9f9f9] mb-5 flex items-center justify-center cursor-pointer"
                                        >
                                            <i className="bi bi-plus-circle text-3xl text-neutral-500"></i>
                                        </div>
                                    )}



                                    {[...tasks]
                                        .sort((a, b) => {
                                            const statusOrder = {
                                                overdue: 0,
                                                pending: 1,
                                                done: 2
                                            };

                                            // Sort by status priority first
                                            if (statusOrder[a.status] !== statusOrder[b.status]) {
                                                return statusOrder[a.status] - statusOrder[b.status];
                                            }

                                            // Then sort by ID
                                            return b.id - a.id;
                                        })
                                        .map(task => (
                                            <Taskcard
                                                key={task.id}
                                                id={task.id}
                                                title={task.title}
                                                time={task.due_date}
                                                desc={task.description}
                                                status={task.status}
                                                onStatusChange={() => setRefreshKey(prev => prev + 1)}
                                            />
                                        ))}

                                </div>
                            </div >

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Taskspage


