import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:hpla.india@gmail.com?subject=New Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    window.location.href = mailtoLink;
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div>
    <div className="mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">For any Online Enquiry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
    <div className='flex gap-4' >
    <div className='shadow rounded-lg p-4'>
          <h1 className='text-2xl'>President</h1>
          <hr className='my-2' />
          <p className='text-xl font-bold my-2'>Mr. Prem Chand</p>
          <p>Librarian, Indian Institute of Advanced Studies, Summer Hill, Shimla – 171005</p>
      <p className='text-slate-700'><span className='font-semibold'>Mobile Number :</span> 9816016593; 9418045822 </p>
      <p className='text-slate-700'><span className='font-semibold'>Email :</span> chanprem@gmail.com</p>
    </div>

    <div className='shadow rounded-lg p-4'>
          <h1 className='text-2xl'>General Secretary</h1>
          <hr className='my-2' />
          <p className='text-xl font-bold my-2'>Dr. Suresh Kumar Chauhan </p>
          <p>Dy Librarian, Jaypee University of Information Technology, Waknaghat, Solan, Himachal Pradesh – 173234</p>
      <p className='text-slate-700'> <span className='font-semibold'>Mobile Number :</span>  9555626161 </p>
      <p className='text-slate-700'><span className='font-semibold'>Email :</span>  sureshbabal@gmail.com; hpla.india@gmail.com</p>
    </div>
  </div>
  </div>
  );
};

export default ContactUs;
