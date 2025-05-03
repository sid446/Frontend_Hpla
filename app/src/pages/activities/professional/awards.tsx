import React from "react";

function Awards() {
  return (
    <main className="p-4">
    <h1 className="text-3xl">Awards and recognitions </h1>
      <hr className="my-4" />
      <div className="grid gap-3">
        <p>The association will soon commence the process of honouring senior library professionals, young professionals and active libraries of the state through awards such as: </p>
        <div>
          <ul className="list-disc p-4 text-teal-600 font-semibold">
            <li>HPLA Lifetime Achievement Award</li>
            <li>HPLA Best Librarian Award</li>
            <li>HPLA Young Librarian Award</li>
            <li>HPLA Best Library Award; and various others.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Awards;
