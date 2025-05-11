import { ResearcherType } from '@/types/researcher';

export default function Profile_about_block({
  researcher,
}: {
  researcher: ResearcherType;
}) {
  return (
    <div className="flex flex-wrap items-center justify-around gap-3">
      <div>
        <p className="text-lg font-bold">
          {researcher.firstname + ' ' + researcher.lastname}
        </p>
        <p className="font-medium">{'Degree: ' + researcher.degree}</p>
        <p className="font-medium">
          {'Designation: ' + researcher.designation}
        </p>
        <p className="font-medium">{'Institute: ' + researcher.institute}</p>
        <p className="font-medium">{'Email : ' + researcher.email}</p>
      </div>
      <div className="flex grow flex-wrap items-center justify-around gap-x-3">
        <SubHeading header="Publications" num={researcher.publication_num} />
        <SubHeading header="Citations" num={researcher.citation_num} />
      </div>
    </div>
  );
}

function SubHeading({
  header,
  num,
}: {
  header: string;
  num: number | undefined;
}) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold">{num ? num : '***'}</p>
      <p>{header}</p>
    </div>
  );
}
