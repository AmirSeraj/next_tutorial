"use client"
import Link from "next/link"
import { CloseIcon, MenuIcon } from '@/components/Icons'
import React, { HTMLProps, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

const NavBar: React.FC<HTMLProps<HTMLDivElement>> = () => {
    const [openNav, setOpenNav] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            if (!sidebarRef.current?.contains(event.target as Node) || (event.target as HTMLElement).tagName === "A") {
                setOpenNav(false);
            }
        }
        document.body.addEventListener('click', handleOutSideClick);
        return () => {
            document.body.removeEventListener('click', handleOutSideClick);
        }
    }, [openNav])

    return (
        <div className="w-full sticky flex justify-between items-center py-3 sm:px-10 px-5 bg-blue-600 h-[60px]">
            <div className="flex gap-2 items-center">
                <span className="font-bold text-lg">Next Js Image Gallery</span>
                <nav className="sm:flex hidden gap-2">
                    <Link href='/' className={`${pathname === '/' ? 'text-red-400' : 'text-black'}`}>
                        Home
                    </Link>
                    <Link href='/static' className={`${pathname === '/static' ? 'text-red-400' : 'text-black'}`}>
                        Static
                    </Link>
                    <Link href='/dynamic' className={`${pathname === '/dynamic' ? 'text-red-400' : 'text-black'}`}>
                        Dynamic
                    </Link>
                </nav>
            </div>
            {/* MobileView */}
            <div className="mobile-nav shadow-lg border border-slate-500 px-2 cursor-pointer sm:hidden block" onClick={() => setOpenNav(true)}>
                <MenuIcon />
            </div>

            {/* MobileView content */}
            <div ref={sidebarRef} className={`h-full bg-slate-300 py-5 fixed top-0 right-0 w-[300px] shadow-lg transform z-[5000] ${openNav ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out flex flex-col`}>
                <div className="flex items-center justify-end px-4">
                    <CloseIcon onClick={() => setOpenNav(false)} className="cursor-pointer" />
                </div>
                <ul className="w-full py-3">
                    <li className="py-4 hover:bg-slate-200 w-full border-t border-slate-600">
                        <Link href='/' className="px-4">Home</Link>
                    </li>
                    <li className="py-4 hover:bg-slate-200 w-full border-t border-slate-600">
                        <Link href='/gallery' className="px-4">Gallery</Link>
                    </li>
                    <li className="py-4 hover:bg-slate-200 w-full border-t border-b border-slate-600">
                        <Link href='/hello' className="px-4">Hello</Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default NavBar