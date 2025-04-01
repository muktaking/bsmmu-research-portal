import Profile_top_section from '@/app/components/profile/profile_top_section';
import Profile_navbar from '@/app/components/profile/profile_navbar';
import Section_block from '@/app/components/profile/section_block';

import Profile_about_block from '@/app/components/profile/profile_about_block';
import Article_snippet_shadcn from '@/app/components/article_snippet_shadcn';

export default function Researchers() {
  return (
    <div className="">
      <Profile_top_section />
      <Profile_navbar />
      <div className="bg-gray-100 px-5 pb-5">
        <Section_block header="About">
          <Profile_about_block />
        </Section_block>
        <Section_block header="Publications">
          <Article_snippet_shadcn />
        </Section_block>
      </div>
    </div>
  );
}
