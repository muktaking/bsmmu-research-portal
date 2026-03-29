import Image from 'next/image';
import React from 'react';
import HeroImage from '@/assets/images/hero.png';

export default function Hero() {
  return (
    <div className="container mx-auto grid-cols-12 gap-x-3 md:grid">
      <div className="col-span-8 flex items-center">
        <div className="text-center">
          <h1 className="my-2 text-3xl">
            Psychiatry Research Association of Bangladesh
          </h1>
          <p className="text-lg">
            Welcome to the official portal of the Psychiatry Research
            Association of Bangladesh (PRABD), the premier digital hub dedicated
            to advancing the landscape of psychiatric and psychological research
            within the country. Our platform serves as a centralized repository,
            meticulously accumulating a comprehensive list of ongoing and
            completed research projects, scholarly works, and critically
            acclaimed Bangla-validated scales. By bridging the gap between
            clinical practice and academic inquiry, we provide researchers and
            practitioners with the essential tools needed to conduct culturally
            relevant and scientifically rigorous studies.
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
