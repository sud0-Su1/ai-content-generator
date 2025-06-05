"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, History, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserProfile } from '@clerk/nextjs'

function SideNav() {
  const menuList = [
    {
      name: 'Home',
      icon: Home,
      link: '/dashboard',
    },
    {
      name: 'History',
      icon: History,
      link: '/history', // Changed from '/dashboard/history' to '/history'
    },
    {
      name: 'Billing',
      icon: WalletCards,
      link: '/dashboard/billing',
    },
    {
      name: 'Profile Settings',
      icon: Settings,
      link: '/dashboard/settings',
    },
  ]

  const path = usePathname();

  useEffect(() => {}, [path])

  return (
    <div className="h-screen p-5 shadow-sm border w-64">
      <div className="flex justify-center mb-6">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>

      <div className="space-y-8 gap-6  mt-3">
        {menuList.map((menu, index) => (
          <Link key={index} href={menu.link}>
            <div
              className={`flex items-center space-x-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
                path === menu.link ? 'bg-primary text-white' : ''
              }`}
            >
              <menu.icon className="w-7 h-7" />
              <h2>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav