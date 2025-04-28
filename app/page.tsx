import Article_scale_section from './components/article_scale_section';
import Hero from './components/hero';
import Profile_snippet_shadcn from './components/profile_snippet_shadcn';
import Section_heading from './components/section_heading';
import Topicwise_nav from './components/topicwise_nav';

export default function Home() {
  return (
    <div className="">
      <div className="bg-custom-primary text-white">
        <Hero />
      </div>

      {/* Section Topicwise_nav */}
      <Topicwise_nav />
      {/* Section Topicwise_nav */}

      <div className="content-grid mx-5 mb-5 grid-cols-3 justify-center gap-x-7 md:mx-auto md:grid">
        <div className="col-span-2">
          <div className="pb-7">
            <Section_heading heading="Researchers" />
            <div className="flex flex-wrap justify-around gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
                <Profile_snippet_shadcn key={e} />
              ))}
            </div>
          </div>
     
          {/* Section Article_scale_section */}
          <div className="my-5">
          <Section_heading heading="Publications" />
            <Article_scale_section />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <Section_heading heading="Quick Links" />
            <ul>
              <li>
                <a
                  href="https://www.researchgate.net/"
                  className="hover:underline"
                >
                  Researchgate
                </a>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/"
                  className="hover:underline"
                >
                  Researchgate
                </a>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/"
                  className="hover:underline"
                >
                  Researchgate
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
