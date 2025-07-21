import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS
import Header from '../components/Header';
import Procard from '../components/Procard';
import Projects from '../data/Projects';
import Statscard from '../components/Statscard';
import Stats from '../data/Stats-data';
import Tasks from '../data/Tasks-data';
import Taskcard from '../components/Taskcard';
import { getProjects } from '../services/projectService';
import { getProjectIcon } from '../utils/iconMap';
import useAuthRedirect from '../hooks/useAuthRedirect';
import useUserProjects from '../hooks/useUserProjects';
import usePersonalTasks from '../hooks/usePersonalTasks';


function Dash() {
    const [refreshKey, setRefreshKey] = useState(0);
    useAuthRedirect(); // handles login protection
    const projects = useUserProjects(); // handles fetching
    const tasks = usePersonalTasks();


    return (
        <>

            <div className='w-full h-screen flex flex-col'>

                <div className='flex flex-1 overflow-y-hidden px-10 py-5'>   {/* flex-1 to fill remaining space */}
                    {/* content */}

                    <div className='w-full'>
                        <Header />
                        <h1 className='text-xl'>Dashboard</h1>
                        <div className='flex gap-7 mt-5'>
                            {Stats.map((stat, index) => (
                                <Statscard head={stat.title} count={stat.count} />
                            ))}
                        </div>
                        <br />
                        <div className='flex'>
                            <div id='projectsdiv' className='pb-5 w-200'>
                                <h2 className='text-3xl'>Projects</h2>

                                <div className='mt-5 flex flex-wrap gap-8 no-scrollbar overflow-y-auto h-[435px]'>

                                    {projects.map(project => {
                                        console.log("Icon name from project:", project.icon);
                                        console.log("Full project object:", project);


                                        return (
                                            <Procard
                                                key={project.id}
                                                img={getProjectIcon(project.icon)}
                                                title={project.name}
                                                members={project.members || []}
                                                date={project.due_date || "Unknown"}
                                            />
                                        );
                                    })}
                                </div>


                            </div>
                            <div id='Tasks-div' className='ml-8 flex-1  '>
                                <h2 className='text-3xl'>Today's tasks</h2>
                                <div className='overflow-y-auto pr-2 no-scrollbar h-[435px] mt-5'>
                                    {[...tasks]
                                        .filter(task => task.status !== 'done')
                                        .sort((a, b) => b.id - a.id)  //Newest task first
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dash
