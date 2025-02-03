import Hero from './components/hero';
import Profile_snippet from './components/profile_snippet';
import Top_nav from './components/top_nav';
import Top_nav_shadcn from './components/top_nav_shadcn';

export default function Home() {
  return (
    <div className="">
      <Top_nav_shadcn />
      <div className="bg-sky-600 text-white">
        <Hero />
      </div>

      <div className="my-3">
        <Profile_snippet />
      </div>
    </div>
  );
}
