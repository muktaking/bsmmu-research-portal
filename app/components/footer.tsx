import Footer_sub_section from './footer_sub_section';

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center gap-x-3 bg-teal-800 pb-5 pt-10 text-white">
      {[1, 2, 3, 4, 5, 6].map((e) => (
        <Footer_sub_section key={e} />
      ))}
    </footer>
  );
}
