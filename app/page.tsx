import Hero from './components/hero';
import Profile_snippet from './components/profile_snippet';
import Profile_snippet_shadcn from './components/profile_snippet_shadcn';
import Section_heading from './components/section_heading';
import Top_nav from './components/top_nav';

export default function Home() {
  return (
    <div className="">
      <Top_nav />
      <div className="bg-sky-600 text-white">
        <Hero />
      </div>

      <div className="mx-5 mb-2 mt-8">
        <Section_heading heading="Top Researchers" />
        <div className="flex flex-wrap justify-around gap-5">
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <Profile_snippet_shadcn key={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
