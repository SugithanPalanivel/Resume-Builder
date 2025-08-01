import React from 'react';
import Input from '../../../../components/Inputs/Input';
import { LuPlus,LuTrash2 } from 'react-icons/lu';
const ProjectsDetailsForm = ({
    projectInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem
}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
            Projects
        </h2>
        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {projectInfo.map((project,index)=>(
                <div
                  key={index}
                  className='border border-gray-200/80 p-4 rounded-lg relative'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                        <Input
                          label="Project Title"
                          placeholder="Expanse Tracker"
                          type="text"
                          value={project.title || ""}
                          onChange={({target})=>updateArrayItem(index,"title",target.value)}
                        />
                        </div>
                        <div className='col-span-2'>
                        <label className='text-xs font-medium text-slate-600'>
                            Description
                        </label>
                        <textarea
                          placeholder='short Description abut the project?'
                          className='form-input w-full mt-1'
                          rows={3}
                          value={project.description || ""}
                          onChange={({target})=>updateArrayItem(index,"description",target.value)}
                        />
                    </div>
                        <Input
                          label="Github"
                          placeholder="https://github.com/in/username"
                          value={project.github || ""}
                          onChange={({target})=>updateArrayItem(index,"github",target.value)}
                          type="text"
                        />
                        <Input
                          label="Live Demo Url"
                          placeholder="https://yourproject.live"
                          type="text"
                          value={project.liveDemo || ""}
                          onChange={({target})=>updateArrayItem(index,"liveDemo",target.value)}
                        />
                        
                    </div>

                    {projectInfo.length >1 && (
                        <button
                         type='button'
                         className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                         onClick={()=>removeArrayItem(index)}
                         >
                            <LuTrash2 />
                         </button>
                    )}
                </div>
            ))}
            <button
             type='button'
             className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
             onClick={()=>addArrayItem({
                title:"",
                description:"",
                github:"",
                liveDemo:"",
                
             })}
            >
                <LuPlus />Add Project Details
            </button>
        </div>
    </div>
  )
}

export default ProjectsDetailsForm;