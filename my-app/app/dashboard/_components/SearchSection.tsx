import { Search } from 'lucide-react';
import React from 'react';

function SearchSection({onsearchInput}:any) {
  return (
    <div className="h-64 w-full p-10 flex flex-col items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#872341] via-[#BE3144] to-[#09122C]">
     <h2 className='text-4xl font-bold '>Browse All the Templates</h2>
     <p>what would you like to create today?</p>
     <div className='flex gap-5 items-center p-2 border rounded-md my-5 w-[50%]'>
        <Search/>
        <input type='text'placeholder='Search'
        onChange={(event)=>onsearchInput(event.target.value)}
        className='bg-transparent outline-none text-white placeholder:text-white' />
     </div>
    </div>
  );
}

export default SearchSection;
