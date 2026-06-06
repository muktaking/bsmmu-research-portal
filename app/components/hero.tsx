import Image from 'next/image';
import React from 'react';
import HeroImage from '@/assets/images/hero.png';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-16 lg:py-24">
      {/* Subtle Background Decorations */}
      <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-[100px]"></div>

      <div className="container relative mx-auto px-4 md:grid md:grid-cols-12 md:items-center md:gap-12 lg:gap-16">
        <div className="col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-200 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Official Research Portal
            </div>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Advancing <br />
              <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                Psychiatry Research
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-blue-100/80 sm:text-xl">
              The Psychiatry Research Association of Bangladesh (PRABD) provides
              a centralized archive of scholarly projects and validated Bangla
              scales for clinicians and researchers.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-2xl bg-white px-8 text-base font-bold text-blue-900 shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:bg-blue-50"
            >
              <Link href="/dashboard">
                Enter Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-white/20 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/20"
            >
              <Link href="/scale">
                <Search className="mr-2 h-5 w-5" /> Explore Scales
              </Link>
            </Button>
          </div>
        </div>

        <div className="col-span-5 mt-12 md:mt-0">
          <div className="relative">
            {/* Glassmorphism Frame for Image */}
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-800">
                <Image
                  alt="Professional Psychiatry Research Archive Illustration"
                  src={HeroImage}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-1000 hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Thematic Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Validated Archives
                  </p>
                  <p className="text-xl font-black text-white">500+ Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
