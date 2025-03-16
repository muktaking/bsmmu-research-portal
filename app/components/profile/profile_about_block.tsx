export default function Profile_about_block() {
  return (
    <div className="flex flex-wrap items-center justify-around gap-3">
      <div>
        <p className="text-lg font-bold">Name: Dr. M.M.A. Shalahuddin Qusar </p>
        <p className="font-medium">Designation: Professor</p>
        <p className="font-medium">Department: Deperment of Psychiatry</p>
        <p className="font-medium">Institute: BSMMU</p>
        <p className="font-medium">Email : gongajolybiplob@yahoo..com</p>
      </div>
      <div className="flex grow flex-wrap items-center justify-around gap-x-3">
        <SubHeading header="Publications" num={65} />
        <SubHeading header="Citations" num={1048} />
      </div>
    </div>
  );
}

function SubHeading({ header, num }: { header: string; num: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold">{num}</p>
      <p>{header}</p>
    </div>
  );
}
