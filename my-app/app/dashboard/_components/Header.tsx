import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='-5 shadow-sm border-b-2 flex justify-between items-center'>
    <div className='flex gap-2 items-centre p-2 border rounded-md max-w-md'>
      <Search/>
      <input type='text' placeholder='Search...' className='outline-none' />
    </div>
    <div className='flex gap-5 items-centre'>
    <a href="/dashboard/billing">
  <h2 className='bg-primary p-1 rounded-full text-l text-white px-2'>
    Join now for $19🔥
  </h2>
</a>
      <UserButton/>
    </div>
    </div>
  )
}

export default Header
