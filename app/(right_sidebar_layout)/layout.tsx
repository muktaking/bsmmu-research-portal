import QuickLinks from '../components/quick_links';

export default function Right_Sidebar_Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="content-grid mx-5 my-5 grid-cols-3 justify-center gap-x-7 md:mx-auto md:grid">
      <div className="col-span-2">{children}</div>
      <div className="col-span-1">
        <QuickLinks />
      </div>
    </div>
  );
}
