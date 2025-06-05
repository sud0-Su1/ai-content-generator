"use client"
import { Search } from 'lucide-react';
import React from 'react'
import SearchSection from './_components/SearchSection';
import TempleteSection from './_components/TempleteSection';
import { History } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



function dashboard() {
  const [userSearchInput, setUserSearchInput] = React.useState<string>();
  return (
    <div>
      <SearchSection onsearchInput={(value:string)=>setUserSearchInput(value)}/>
      <TempleteSection userSearchInput={userSearchInput} />
      <div className="p-4">
        <Link href="/history">  
        </Link>
        <Link href="/billing">
        </Link>
      </div>
    </div>
  )
}

export default dashboard;