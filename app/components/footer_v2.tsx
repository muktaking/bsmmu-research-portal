import {
  Database,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer_v2() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand & Description */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Database size={22} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                PRABD
              </span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-slate-500 dark:text-slate-400">
              Psychiatry Research Association of Bangladesh (PRABD), the premier
              digital hub dedicated to advancing the landscape of psychiatric
              and psychological research within the country.
            </p>
            <div className="flex space-x-5">
              <SocialLink
                href="#"
                icon={<Facebook size={20} />}
                label="Facebook"
              />
              <SocialLink
                href="#"
                icon={<Twitter size={20} />}
                label="Twitter"
              />
              <SocialLink
                href="#"
                icon={<Instagram size={20} />}
                label="Instagram"
              />
              <SocialLink href="#" icon={<Github size={20} />} label="Github" />
              <SocialLink
                href="#"
                icon={<Youtube size={20} />}
                label="Youtube"
              />
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Association
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <FooterLink href="/about">About Us</FooterLink>
                  <FooterLink href="/terms">Terms & Conditions</FooterLink>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <FooterLink href="/blogs">Blog</FooterLink>
                  <FooterLink href="/article">Research Articles</FooterLink>
                  <FooterLink href="/scale">Validated Scales</FooterLink>
                  <li>
                    <span className="text-sm italic text-slate-500">
                      More coming soon...
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Quick Links
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <FooterLink href="/researcher">Our Researchers</FooterLink>
                  <FooterLink href="/institute">Institutes</FooterLink>
                  <FooterLink href="/dashboard">Portal Dashboard</FooterLink>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Contact
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <Mail size={16} className="text-blue-600" />
                    <span>admin@prabd.org</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <span>BSMMU, Shahbag, Dhaka, Bangladesh</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800/50">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} PRABD. All rights reserved.
            </p>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
              Advancing Psychiatric Research in Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
