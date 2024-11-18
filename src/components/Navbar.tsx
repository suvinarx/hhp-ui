"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"


const Navbar = () => {

    const [dialogVisible, setDialogVisible] = useState(false);

    return (
        <>
            <nav className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-3 md:py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-[#e8a79f] to-[#a7d3d3] text-transparent bg-clip-text">Help Homeless People</span>
                </div>
                <ul className="hidden md:flex space-x-6">
                    <li><Button variant="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Button></li>
                    <li><Button variant="link" onClick={() => window.scrollTo({ top: document.getElementById('about')?.offsetTop, behavior: 'smooth' })}>About</Button></li>
                    <li><Button variant="link" onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop, behavior: 'smooth' })}>Contact</Button></li>
                    
                </ul>
                <div className='flex md:hidden'>
                    <Sheet>
                        <SheetTrigger><Menu /></SheetTrigger>
                        <SheetContent>
                            <ul className="flex flex-col gap-4">
                                <li><SheetTrigger asChild><Button variant="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Button></SheetTrigger></li>
                                <li><SheetTrigger asChild><Button variant="link" onClick={() => window.scrollTo({ top: document.getElementById('about')?.offsetTop, behavior: 'smooth' })}>About</Button></SheetTrigger></li>
                                <li><SheetTrigger asChild><Button variant="link" onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop, behavior: 'smooth' })}>Contact</Button></SheetTrigger></li>
                                
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            


        </>
    )
}

export default Navbar