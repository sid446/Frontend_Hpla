import { Link } from "react-router-dom";

function MembershipApplication() {
  return (
    <div>
      <h1 className="text-3xl m-3">Membership Application</h1>
      <hr />
      <p className="text-xl m-3">Please fill out the Google form below to apply for membership.</p>
      <Link
        to="https://docs.google.com/forms/d/e/1FAIpQLSdY7TwDalbNr_zGz7GlZuCMrYP5flrMsq4kqyaQH7StpwRNKw/viewform?embedded=true"
      className="text-teal-500 font-semibold underline ml-2.5">Membership Form Online</Link>
    </div>
    
  );
}

export default MembershipApplication;
