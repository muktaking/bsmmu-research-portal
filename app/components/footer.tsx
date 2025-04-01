import Share_section from './share_section';

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-start justify-center gap-x-5 bg-teal-800 pb-5 pt-10 text-white">
      <div>
        <Share_section shareUrl="www.facebook.com/abce" />
      </div>
      <div>
        <ul>
          <li>
            <a href="#" className="mb-2 mr-2">
              About Us
            </a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li></li>
        </ul>
      </div>
      <div>
        <p>Useful links</p>
        <ul>
          <li>
            <a href="#" className="mb-2 mr-2">
              Links 1
            </a>
          </li>
          <li>
            <a href="#"> Links 2</a>
          </li>
          <li>
            <a href="#"> Links 3</a>
          </li>
          <li></li>
        </ul>
      </div>
    </footer>
  );
}
