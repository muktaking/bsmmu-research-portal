'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaChevronRight, FaXmark } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Top_nav({
  authToggle,
}: {
  authToggle: React.ReactNode;
}) {
  const pathName = usePathname();
  const [toggleMenu, setToggleMenu] = useState(true);
  function onToggleMenu() {
    setToggleMenu(!toggleMenu);
  }
  return (
    <nav className="flex items-center justify-between gap-x-4 p-2 shadow-md">
      <div>
        <img className="w-16" src="/assets/images/question.png" />
      </div>
      <div
        className={`absolute left-0 ${toggleMenu ? 'top-[-100%]' : 'top-[-9%]'} flex min-h-[60vh] w-full items-center bg-white px-5 text-xl md:static md:min-h-fit md:w-auto md:bg-gray-50`}
      >
        <ul className="flex flex-col gap-8 text-gray-400 md:flex-row md:items-center md:gap-[4vh]">
          <li className="">
            <Link
              href="/"
              className={`${pathName == '/' ? 'link-active' : 'link-inactive'} link-hover`}
            >
              Home
            </Link>
          </li>
          <li className="hover:text-black">
            <Link
              href="/researcher"
              className={`${pathName.includes('/researcher') ? 'link-active' : 'link-inactive'} link-hover`}
            >
              Researcher
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-nowrap items-center text-gray-400 hover:text-black focus:outline-none">
                <span
                  className={`${pathName.includes('/institute') ? 'link-active' : 'link-inactive'} link-hover`}
                >
                  Institute
                </span>
                <FaChevronRight size=".8rem" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/institute/bmu">
                  <DropdownMenuItem>BMU</DropdownMenuItem>
                </Link>
                <Link href="/institute/nimh">
                  <DropdownMenuItem>NIMH</DropdownMenuItem>
                </Link>

                <Link href="/institute/somch">
                  <DropdownMenuItem>SOMCH</DropdownMenuItem>
                </Link>
                <Link href="/institute/afmc">
                  <DropdownMenuItem>AFMC</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="felx-nowrap flex items-center">
                      <span>Others</span> <FaChevronRight size=".8rem" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href="/institute/foreign">
                        <DropdownMenuItem>Foreign</DropdownMenuItem>
                      </Link>
                      <Link href="/institute/local">
                        <DropdownMenuItem>Local</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link
              href="/scale"
              className={`${pathName.includes('/scale') ? 'link-active' : 'link-inactive'} link-hover`}
            >
              Scale
            </Link>
          </li>
          <li>
            <Link
              href="/article"
              className={`${pathName == '/article' ? 'link-active' : 'link-inactive'} link-hover`}
            >
              Article
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className={`${pathName == '/blogs' ? 'link-active' : 'link-inactive'} link-hover`}
            >
              Blogs
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-nowrap items-center text-gray-400 hover:text-black focus:outline-none">
                <span
                  className={`${pathName.includes('/manupulation') ? 'link-active' : 'link-inactive'} link-hover`}
                >
                  Data Entry
                </span>
                <FaChevronRight size=".8rem" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/manupulation/article/create-article">
                  <DropdownMenuItem>Create Article</DropdownMenuItem>
                </Link>
                <Link href="/manupulation/article/update-article">
                  <DropdownMenuItem>Update Article</DropdownMenuItem>
                </Link>

                <Link href="/manupulation/scale/create-scale">
                  <DropdownMenuItem>Create Scale</DropdownMenuItem>
                </Link>
                <Link href="/manupulation/scale/update-scale">
                  <DropdownMenuItem>Update Scale</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        {authToggle}
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
