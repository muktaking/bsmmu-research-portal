'use client';
import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  LayoutDashboard,
  Users,
  Ruler,
  FileText,
  Building2,
  Rss,
  Database,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { hasMinimumRole } from '@/lib/access';

export default function Top_nav({
  authToggle,
}: {
  authToggle: React.ReactNode;
}) {
  const pathName = usePathname();
  const [toggleMenu, setToggleMenu] = useState(true);
  const { data: session } = authClient.useSession();

  function onToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-x-4 border-b border-slate-200/60 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <Database size={22} />
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
          PRABD
        </span>
      </div>

      <div
        className={`absolute left-0 w-full items-center transition-all duration-300 ease-in-out md:static md:flex md:w-auto ${
          toggleMenu
            ? 'top-[-400px] opacity-0 md:opacity-100'
            : 'top-[100%] opacity-100'
        } bg-white px-5 py-8 shadow-xl dark:bg-slate-950 md:bg-transparent md:p-0 md:shadow-none`}
      >
        <ul className="flex flex-col gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:gap-1 lg:gap-2">
          <NavLink href="/" active={pathName === '/'} icon={<Home size={16} />}>
            Home
          </NavLink>
          <NavLink
            href="/dashboard"
            active={pathName === '/dashboard'}
            icon={<LayoutDashboard size={16} />}
          >
            Dashboard
          </NavLink>
          <NavLink
            href="/researcher"
            active={pathName.includes('/researcher')}
            icon={<Users size={16} />}
          >
            Researchers
          </NavLink>
          <NavLink
            href="/scale"
            active={pathName.includes('/scale')}
            icon={<Ruler size={16} />}
          >
            Scales
          </NavLink>
          <NavLink
            href="/article"
            active={pathName === '/article'}
            icon={<FileText size={16} />}
          >
            Articles
          </NavLink>

          <li className="px-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none transition-colors hover:text-blue-600 focus:outline-none">
                <Building2 size={16} />
                <span>Institutes</span>
                <ChevronDown size={14} className="opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 rounded-xl p-2 shadow-2xl"
              >
                <DropdownItem href="/institute/bmu">BMU</DropdownItem>
                <DropdownItem href="/institute/nimh">NIMH</DropdownItem>
                <DropdownItem href="/institute/somch">SOMCH</DropdownItem>
                <DropdownItem href="/institute/afmc">AFMC</DropdownItem>
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800">
                    <span>Others</span>
                    <ChevronDown size={14} className="-rotate-90 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="w-40 rounded-xl p-2"
                  >
                    <DropdownItem href="/institute/foreign">
                      Foreign
                    </DropdownItem>
                    <DropdownItem href="/institute/local">Local</DropdownItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <NavLink
            href="/blogs"
            active={pathName === '/blogs'}
            icon={<Rss size={16} />}
          >
            Blogs
          </NavLink>

          {hasMinimumRole(session?.user.role, 'moderator') && (
            <li className="px-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-white outline-none transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900">
                  <Database size={16} />
                  <span>Data Entry</span>
                  <ChevronDown size={14} className="opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl p-2 shadow-2xl"
                >
                  <DropdownItem href="/manupulation/article/create-article">
                    Create Article
                  </DropdownItem>
                  <DropdownItem href="/manupulation/article/update-article">
                    Update Article
                  </DropdownItem>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <DropdownItem href="/manupulation/scale/create-scale">
                    Create Scale
                  </DropdownItem>
                  <DropdownItem href="/manupulation/scale/update-scale">
                    Update Scale
                  </DropdownItem>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <DropdownItem href="/manupulation/researcher/create-researcher">
                    Create Researcher
                  </DropdownItem>
                  <DropdownItem href="/manupulation/researcher/update-researcher">
                    Update Researcher
                  </DropdownItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-center gap-6">
        {authToggle}
        <button
          onClick={onToggleMenu}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 md:hidden"
        >
          {toggleMenu ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <li className="relative">
      <Link
        href={href}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 ${
          active
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
            : 'hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-200'
        }`}
      >
        {icon}
        {children}
        {active && (
          <span className="absolute -bottom-1 left-1/2 hidden h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600 md:block" />
        )}
      </Link>
    </li>
  );
}

function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:bg-blue-50 focus:text-blue-600 dark:focus:bg-blue-900/20">
        {children}
      </DropdownMenuItem>
    </Link>
  );
}
