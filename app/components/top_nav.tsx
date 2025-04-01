'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function Top_nav() {
  const [toggleMenu, setToggleMenu] = useState(true);
  function onToggleMenu() {
    setToggleMenu(!toggleMenu);
  }
  return (
    <nav className="flex items-center justify-between gap-x-4 bg-gray-50 p-2">
      <div>
        <img className="w-16" src="https://placehold.co/16x16" />
      </div>
      <div
        className={`absolute left-0 ${toggleMenu ? 'top-[-100%]' : 'top-[-9%]'} flex min-h-[60vh] w-full items-center bg-white px-5 text-xl md:static md:min-h-fit md:w-auto md:bg-gray-50`}
      >
        <ul className="flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vh]">
          <li className="text-sky-800 hover:text-black">
            <Link href="/">Home</Link>
          </li>
          <li className="text-gray-400 hover:text-black">
            <Link href="researchers">Researchers</Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-400 hover:text-black focus:outline-none">
                Institute
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>BSMMU</DropdownMenuItem>
                <DropdownMenuItem>NIMH</DropdownMenuItem>
                <DropdownMenuItem>SOMCH</DropdownMenuItem>
                <DropdownMenuItem>Other</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="text-gray-400 hover:text-black">
            <Link href="scales">Scales</Link>
          </li>
          <li className="text-gray-400 hover:text-black">
            <Link href="/blogs">Blogs</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <Button>Sign In</Button>
        {toggleMenu ? (
          <FaBars
            onClick={onToggleMenu}
            className="z-[10] cursor-pointer text-3xl md:hidden"
          />
        ) : (
          <FaXmark
            onClick={onToggleMenu}
            className="z-[10] cursor-pointer text-3xl md:hidden"
          />
        )}
      </div>
    </nav>
  );
}
