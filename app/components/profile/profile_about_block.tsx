import { getInstituteKey, ResearcherType } from '@/types/researcher';

export default function Profile_about_block({
  researcher,
}: {
  researcher: ResearcherType;
}) {
  return (
    <div className="pl-1">
      <p className="text-lg font-bold">
        {researcher.firstname + ' ' + researcher.lastname}
      </p>
      <p className="font-medium">{'Degree: ' + researcher.degree}</p>
      <p className="font-medium">{'Designation: ' + researcher.designation}</p>
      <p className="font-medium">
        {'Institute: ' + getInstituteKey(researcher.institute).toUpperCase()}
      </p>
      <p className="font-medium">{'Email : ' + researcher.email}</p>
    </div>
  );
}

// function SubHeading({
//   header,
//   num,
// }: {
//   header: string;
//   num: number | undefined;
// }) {
//   return (
//     <div className="text-center">
//       <p className="text-lg font-bold">{num ? num : '***'}</p>
//       <p>{header}</p>
//     </div>
//   );
// }
