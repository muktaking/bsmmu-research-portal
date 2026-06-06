import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function UnAuthorized() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#fafafa] px-6 py-12 dark:bg-[#020617] lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] dark:opacity-[0.07]">
          <h2 className="text-[20rem] font-black tracking-tighter md:text-[35rem]">
            403
          </h2>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-2xl"></div>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
              <Lock className="absolute -right-3 -top-3 h-10 w-10 animate-bounce text-red-500" />
              <ShieldAlert className="h-16 w-16 text-red-600" />
            </div>
          </div>
        </div>

        <h1 className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-6xl font-black tracking-tight text-transparent dark:from-white dark:to-slate-400 sm:text-8xl">
          Forbidden
        </h1>

        <p className="mx-auto mt-8 max-w-md text-balance text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          This section of the portal is restricted. Your current clearance level
          doesn't grant access to these research archives.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-2xl bg-slate-900 px-8 text-base font-semibold shadow-2xl shadow-slate-900/20 transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-950 sm:w-auto"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
          <Link href="/authentication/signIn">
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-full rounded-2xl border-slate-200 bg-white px-8 text-base font-semibold transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-transparent dark:hover:bg-slate-900 sm:w-auto"
            >
              Authenticate
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </Button>
          </Link>
        </div>

        <div className="mt-24 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
          <span>403 Forbidden</span>
          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
          <span>PRABD Research Portal</span>
        </div>
      </div>
    </div>
  );
}
