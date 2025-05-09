import Image from 'next/image';
import React from 'react';
import HeroImage from '@/assets/images/hero.png';

export default function Hero() {
  return (
    <div className="container mx-auto grid-cols-12 gap-x-3 md:grid">
      <div className="col-span-8 flex items-center">
        <div className="text-center">
          <h1 className="my-2 text-3xl">BSMMU PSYCHIATRY PORTAL</h1>
          <p className="text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.{' '}
          </p>
        </div>
      </div>
      <div className="col-span-4 flex items-center justify-center">
        <Image alt="hero image" src={HeroImage} className="h-72" />
        {/* <img className="h-72" src="/assets/images/hero.png" /> */}
      </div>
    </div>
  );
}
