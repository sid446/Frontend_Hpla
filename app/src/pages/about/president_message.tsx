import React from "react";
import presidentImg from "../../assets/president.png";
function PresidentMessage() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">President Message</h1>
      <hr className="my-4" />
      <div className="grid gap-3">
        <img
          className="p-4"
          src={presidentImg}
          alt="President" />
        <p className="font-semibold">Dear Members and visitors, </p>

        <p>Welcome to the official website of the Himachal Pradesh Library Association (HPLA)!</p>

        <p>It is my pleasure and honour to lead the association dedicated to streamlining libraries and librarianship in our state. As we knew, libraries play an important role in fostering literacy, education, and cultural enrichment within the society. As an association, we are committed to support and empower library professionals in their endeavours to create dynamic and inclusive library environments. </p>

        <p>We invite all library professionals, students and enthusiasts to join HPLA and contribute in strengthening the libraries and librarianships in the state. </p>

        <p className="font-semibold">"Together, let's shape the future of libraries in Himachal Pradesh!"</p>
 
        <p>Join us and make a difference. </p>
        <p>
        <p>Warm regards,</p>
        <p>Prem Chand,</p>
        <p>President</p>
        </p>
        

      </div>
    </main>
  );
}

export default PresidentMessage;
