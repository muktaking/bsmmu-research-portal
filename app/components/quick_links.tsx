import React from 'react';
import Section_heading from './section_heading';

export default function QuickLinks() {
  return (
    <div>
      <Section_heading heading="Quick Links" />
      <ul>
        {QLinks?.map((qlink) => (
          <QLink key={qlink.title} title={qlink.title} link={qlink.link} />
        ))}
      </ul>
    </div>
  );
}

const QLinks = [
  { title: 'Bangladesh Medical University', link: 'http://bmu.ac.bd/' },
  { title: 'Natinal Institute of Mental Health', link: 'https://nimh.gov.bd/' },
  { title: 'ResearchGate', link: 'https://www.researchgate.net/' },
];

function QLink({ title, link }: { title: string; link: string }) {
  return (
    <li>
      <a href={link} className="link">
        {title}
      </a>
    </li>
  );
}
