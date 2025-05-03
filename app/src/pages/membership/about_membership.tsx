import React from 'react';

// Reusable Component: Section with Heading and Content
const PageSection = ({ title, content }: { title: string, content: React.ReactNode }) => (
  <section>
    <h1 className="text-3xl">{title}</h1>
    <hr className="m-3" />
    {content}
  </section>
);

// Reusable Component: List with Items
const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} className="text-md mb-5">
        {item}
      </li>
    ))}
  </ul>
);

// Main Component
function AboutMembership() {
  return (
    <div className="m-3">
      {/* About Membership Section */}
      <PageSection
        title="About Membership"
        content={
          <div className='mb-5'>
            <p>
              Any person or institution or association of Himachal Pradesh or the LIS professionals who are confident residents of Himachal Pradesh but working/worked outside the state, subscribing to aims and objectives of the Association and fulfilling other prescribed eligibility criteria for seeking membership of the Association can become a member. The Governing Body shall have the power to relax the membership eligibility conditions in exceptional cases.
            </p>
            <p>
              LIS professionals who are neither the confident residents nor working professionals of Himachal Pradesh but subscribing to aims and objectives of the Association may join the HPLA. Such members shall have the privileges of attending, participating, and voting rights in all General Body meetings but cannot contest the election (Amendment 1/2020).
            </p>
          </div>
        }
      />

      {/* Membership Types Section */}
      <PageSection
        title="Membership Types"
        content={
          <BulletList
            items={membershipTypes.map((type) => (
              <span key={type.title}>
                <strong>{type.title}:</strong> {type.description}
                {type.eligibility && <BulletList items={type.eligibility} />}
              </span>
            ))}
          />
        }
      />

      {/* Membership Fee Section */}
      <PageSection
        title="Membership Fee"
        content={
          <>
            {/* Membership Fee Table */}
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Membership Type</th>
                  <th className="border px-4 py-2">Duration</th>
                  <th className="border px-4 py-2">Fee</th>
                </tr>
              </thead>
              <tbody>
                {membershipFeeDetails.map((fee) => (
                  <tr key={fee.type}>
                    <td className="border px-4 py-2">{fee.type}</td>
                    <td className="border px-4 py-2">{fee.duration}</td>
                    <td className="border px-4 py-2">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payment Information */}

            <p className="mt-10 font-extralight text-red-600">
            * Please attach a copy of professional Degree/ Diploma Certificate. The incomplete form is liable to be rejected.
            </p>

            <p className="mt-5 mb-5">
              The Cheque/Demand Draft may be drawn in favour of HIMACHAL PRADESH LIBRARY ASSOCIATION payable at SHIMLA and sent to c/o Sh. Prem Chand, Red Stone Building, Ground Floor, Near Ganga Palace, Summer Hill, Shimla, Himachal Pradesh (India) – 171 005. You may also pay through RTGS/NEFT.
            </p>

            {/* Bank Details */}
            <div>
            <p>
              <strong>Bank Name:</strong> State Bank of India
              <br />
              <strong>Branch:</strong> Boileauganj (Shimla)
              <br />
              <strong>Account No.:</strong> 39027217450
              <br />
              <strong>IFSC Code:</strong> SBIN0006785
            </p>
            </div>
            
            {/* Note */}
            <div className='mt-8 border border-2 border-slate-900 rounded p-2'>
              <p><span className='font-bold'>Note:</span> For any further information please contact to Dr. Suresh K. Chauhan (9555626161) or Dr. Vipin Sharma (9805481416) directly</p>
            </div>
          </>
        }
      />
    </div>
  );
}

// Data for Membership Types
const membershipTypes = [
  {
    title: 'Ordinary Members',
    description: 'Any library professional having at least a Certificate/Diploma in Library Science from a recognized institute/university can apply on a prescribed format for becoming a member of the Association by paying Rs. 200/- per head. Ordinary membership shall be for the period of one year only. All ordinary members of the Association shall have the privileges of attending and voting at all General Body meetings but they cannot contest the elections.',
    eligibility: [
      'Any person who is or was engaged in teaching or research in Library and Information Science and related areas.',
      'Any person, who in the opinion of the Governing Body, is actively interested or concerned with the library and information profession.',
    ],
  },
  {
    title: 'Life Members',
    description: 'Any library professional having at least a Certificate/Diploma in Library Science from a recognized institute/university can directly apply for becoming a Life member of the Association by submitting a one-time requisite fee of Rs. 1500/- along with the prescribed HPLA membership form. Ordinary members can also become Life members after paying the prescribed fee for life membership. All life members shall have presence, participation, and voting privileges in General Body meetings. Life members who are not confident residents of Himachal Pradesh may not contest the election of the General Body.',
  },
  {
    title: 'Honorary Members',
    description: 'The Governing Body may nominate any person who has rendered distinguished services to the Association or profession as an eminent library professional and academician. Scholars, writers, and researchers can also be considered as Honorary members. The ‘Honorary Membership’ may also be recommended by the Executive Committee to be placed before the General Body meeting for consideration. Honorary Members need not pay any type of membership fee. Honorary members shall have presence, participation, and voting privileges in all General Body meetings but they cannot contest the elections.',
  },
  {
    title: 'Student Members',
    description: 'Students of Library Schools from the State with the recommendation of the concerned Head of the Department can become members of the Association. The alumni of library schools need to submit a membership form with a duly self-attested photocopy of the certificate/diploma or degree they obtained from library schools of Himachal Pradesh. Student members need to pay Rs. 100/- as a membership fee for one year. All Student members of the Association shall have the privileges of presence and participation at all General Body meetings but they would not have voting rights.',
  },
  {
    title: 'Associate Members',
    description: 'The Associate members shall be the invited members in the meetings. The Library professionals from different libraries may be invited, through HoDs/Principals, to represent issues of homogenous libraries/professionals of the state. The President or General Secretary may invite the representation from various institutions/libraries on the basis of the agenda of the meetings. Associate members shall have the presence in the meeting but they would not have any participation and voting rights.',
  },
  {
    title: 'Founder Members',
    description: 'The members of the First Governing Body, approved at the time of registration of the HP Societies Registration Act, shall be known as Founder Members of the Association. They shall become Founder Members by virtue of first office bearers of Governing Body and by paying Rs.1500/- onetime fee. They shall have presence, participation and voting privileges during all (present or future) General Body elections or meetings of the Association.',
  }
];

// Data for Membership Fee Details
const membershipFeeDetails = [
  { type: 'Ordinary', duration: 'Annual', amount: 'Rs. 200.00' },
  { type: 'Student', duration: 'Annual', amount: 'Rs. 100.00' },
  { type: 'Life', duration: 'Life', amount: 'Rs. 1500.00' },
];

export default AboutMembership;
