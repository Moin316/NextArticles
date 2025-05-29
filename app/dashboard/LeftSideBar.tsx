"use client"
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { BarChart, FileText, LayoutDashboard, MessageCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const LeftSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={'outline'} className='md:hidden m-4'>
                    <LayoutDashboard className='w-6 h-6'/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[250px] md:hidden'>
            <DialogTitle className="sr-only">Sidebar Menu</DialogTitle>
                <DashboardSideBar />
            </SheetContent>
          </Sheet>
          <div className='hidden md:block h-screen w-[250px]  border-r border-r-gray-200'>
            <DashboardSideBar />
          </div>
    </div>
  )
}
export default LeftSideBar
const DashboardSideBar = () => {
    return (
        <div className='h-full px-4 py-6 '>
            <div className='flex items-center gap-2 px-2 mb-8'>
                <Link href='/'>
                        <span className='text-xl font-bold'>
                            Code Blogs
                        </span>
                </Link>
            </div>
            <nav>
                <Link href='/dashboard'>
                    <Button variant='ghost' className='w-full justify-start'>
                        <LayoutDashboard className='w-5 h-5 mr-2'/>
                        overview
                    </Button>
                </Link>
                <Link href='/dashboard/articles/create '>
                    <Button variant='ghost' className='w-full justify-start'>
                        <FileText className='w-5 h-5 mr-2'/>
                        Articles
                    </Button>
                </Link>
                <Link href='/dashboard'>
                    <Button variant='ghost' className='w-full justify-start'>
                        <MessageCircle className='w-5 h-5 mr-2'/>
                        Comments
                    </Button>
                </Link>
                <Link href='/dashboard'>
                    <Button variant='ghost' className='w-full justify-start'>
                        <BarChart className='w-5 h-5 mr-2'/>
                        Analytics
                    </Button>
                </Link>
                <Link href='/dashboard'>
                    <Button variant='ghost' className='w-full justify-start'>
                        <Settings className='w-5 h-5 mr-2'/>
                        Settings
                    </Button>
                </Link>
            </nav>
        </div>
    )
}
