import Profile_top_section from '../components/profile/profile_top_section';
import Profile_navbar from '../components/profile/profile_navbar';
import Section_block from '../components/profile/section_block';

import Profile_about_block from '../components/profile/profile_about_block';

export default function Researchers() {
  return (
    <div className="">
      <Profile_top_section />
      <Profile_navbar />
      <div className="bg-gray-100 px-5 pb-5">
        <Section_block header="About">
          <Profile_about_block />
        </Section_block>
      </div>
    </div>
  );
}
