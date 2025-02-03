import React from 'react';
import { FaMagnet } from 'react-icons/fa';

export default function Top_nav() {
  return (
    <nav className="flex items-center justify-center gap-x-4 bg-sky-200 p-5">
      <div className="">
        <ul className="flex flex-col items-center gap-x-4 md:flex-row">
          <li className="mr-3 bg-sky-50 p-3">
            <a href="">Home</a>
          </li>
          <li className="mr-3 bg-sky-50 p-3">
            <a href="">Researchers</a>
          </li>
          <li className="mr-3 bg-sky-50 p-3">
            <a href="">Institute</a>
          </li>
          <li className="mr-3 bg-sky-50 p-3">
            <a href="">Scales</a>
          </li>
          <li className="mr-3 bg-sky-50 p-3">
            <a href="">Blogs</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
