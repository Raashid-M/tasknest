import Header from '../components/Header'
import Procard from '../components/Procard'
import { getProjects } from '../services/projectService';
import { useEffect, useState } from 'react'
import { getProjectIcon } from '../utils/iconMap';
import useAuthRedirect from '../hooks/useAuthRedirect';
import useUserProjects from '../hooks/useUserProjects'; 


function ProjectsPage() {
useAuthRedirect(); // handles login protection
const projects = useUserProjects(); // handles fetching


    return (
        <>

            <div className='w-full h-screen flex flex-col '>

                <div className='flex flex-1 px-10 pt-5'>
                    {/* content */}

                    <div className='w-full flex flex-col h-full '>
                        <Header />

                        <div className='flex  flex-1 overflow-hidden'>
                            <div id='projectsdiv' className='flex flex-col '>
                                <h2 className='text-3xl'>Projects</h2>
                                <div className='mt-5 flex flex-wrap gap-8 no-scrollbar overflow-y-auto' style={{ height: 'calc(100vh - 165px)' }}>
                                    <div id="cardBorder" className=" flex items-center justify-center p-3 pb-4 w-95 h-50 rounded-xl bg-[#f3f3f3] shadow hover:bg-[#f9f9f9] cursor-pointer">
                                        <div className=" w-fit flex flex-col justify-center items-center gap-2 ">
                                            <i class="bi bi-plus-circle text-3xl text-neutral-500"></i>
                                            <p className="w-fit text-neutral-500">New Project</p>
                                        </div>
                                    </div>

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

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProjectsPage
