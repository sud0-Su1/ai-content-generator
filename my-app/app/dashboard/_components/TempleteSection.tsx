import React, { useEffect, useState } from 'react'
import dashboard from '../page'
import Templete from '../../(data)/Templete'
import TempleteCards from './TempleteCards'

export interface TEMPLETE{
    name: string,
    desc: string,
    icon:string,
    category: string,
    aiprompt: string,
    slugs: string,
    form?:FORM[]
}
export interface FORM {
    label: string,
    field: string,
    name: string,
    required?: boolean
}
function TempleteSection({userSearchInput}:any) {
    const[templateList,setTemplateList]=useState(Templete)
    useEffect(()=>{
        console.log(userSearchInput)
        if(userSearchInput){
            const filteredTemplates = Templete.filter((item:TEMPLETE) => 
                item.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
                item.desc.toLowerCase().includes(userSearchInput.toLowerCase()) ||
                item.category.toLowerCase().includes(userSearchInput.toLowerCase())
            );
            setTemplateList(filteredTemplates);}
        else{
            setTemplateList(Templete);
        }
    },[userSearchInput])
    
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
      {templateList.map((item:TEMPLETE,index:number) => (
        <TempleteCards {...item} key={index} />
      ))}
    </div>
  )
}

export default TempleteSection
