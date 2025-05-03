import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOtherMember } from '../context/OtherMemberContext'; // Adjust the import path as needed

const AddOtherMemberPage = () => {
  const { addOtherMember } = useOtherMember();
  
  const memberTypes = [
    { value: 'Life Member', label: 'Life Member' },
    { value: 'Ordinary Member', label: 'Ordinary Member' },
    { value: 'Student Member', label: 'Student Member' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    affiliation: '',
    mobile: '', // Added mobile field
    memberShipNumber: '',
    type: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [animateForm, setAnimateForm] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateForm(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.affiliation.trim()) newErrors.affiliation = 'Affiliation is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'; // Added validation for mobile
    if (!formData.memberShipNumber.trim()) newErrors.memberShipNumber = 'Membership number is required';
    if (!formData.type) newErrors.type = 'Member type is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitMessage({ type: '', message: '' });
      
      try {
        const result = await addOtherMember(formData);
        
        if (result.success) {
          setSubmitMessage({
            type: 'success',
            message: 'Member added successfully!'
          });
          
          // Reset form
          setFormData({
            name: '',
            designation: '',
            affiliation: '',
            mobile: '', // Reset mobile field
            memberShipNumber: '',
            type: ''
          });
        } else {
          setSubmitMessage({
            type: 'error',
            message: result.message || 'Failed to add member'
          });
        }
      } catch (error) {
        console.error('Error adding member:', error);
        setSubmitMessage({
          type: 'error',
          message: 'An unexpected error occurred. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } }
  };

  return (
    <div className="w-full h-[91.3vh] bg-gradient-to-b from-indigo-950 to-zinc-900 text-gray-100 p-4 md:p-8 overflow-y-scroll">
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl shadow-2xl"
        initial="hidden"
        animate={animateForm ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-6 md:p-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Add Other Member
            </h1>
          </motion.div>
          
          {submitMessage.message && (
            <motion.div 
              className={`mb-6 p-4 rounded-lg ${
                submitMessage.type === 'success' ? 'bg-emerald-900/60 text-emerald-100 border border-emerald-700' : 'bg-red-900/60 text-red-100 border border-red-700'
              } backdrop-blur-sm`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {submitMessage.message}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-indigo-200">
                    Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.name ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <motion.p 
                      id="name-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Designation */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="designation" className="block text-sm font-medium mb-2 text-indigo-200">
                    Designation <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.designation ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.designation ? "true" : "false"}
                    aria-describedby={errors.designation ? "designation-error" : undefined}
                    placeholder="e.g. Professor, Engineer, Director"
                  />
                  {errors.designation && (
                    <motion.p 
                      id="designation-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.designation}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Affiliation */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="affiliation" className="block text-sm font-medium mb-2 text-indigo-200">
                    Affiliation <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.affiliation ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.affiliation ? "true" : "false"}
                    aria-describedby={errors.affiliation ? "affiliation-error" : undefined}
                    placeholder="e.g. University, Organization"
                  />
                  {errors.affiliation && (
                    <motion.p 
                      id="affiliation-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.affiliation}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Mobile (Added Field) */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-indigo-200">
                    Mobile Number <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.mobile ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.mobile ? "true" : "false"}
                    aria-describedby={errors.mobile ? "mobile-error" : undefined}
                    placeholder="e.g. +1234567890"
                  />
                  {errors.mobile && (
                    <motion.p 
                      id="mobile-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.mobile}
                    </motion.p>
                  )}
                </motion.div>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                {/* Member Type */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="type" className="block text-sm font-medium mb-2 text-indigo-200">
                    Member Type <span className="text-pink-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.type ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.type ? "true" : "false"}
                    aria-describedby={errors.type ? "type-error" : undefined}
                  >
                    <option value="">Select member type</option>
                    {memberTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <motion.p 
                      id="type-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.type}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Membership Box */}
                <motion.div 
                  variants={itemVariants}
                  className="p-5 bg-indigo-950/30 rounded-lg border border-indigo-900"
                >
                  <h3 className="text-lg font-medium mb-4 text-indigo-300">Membership Details</h3>
                  
                  {/* Membership Number */}
                  <div>
                    <label htmlFor="memberShipNumber" className="block text-sm font-medium mb-2 text-indigo-200">
                      Membership Number <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="memberShipNumber"
                      name="memberShipNumber"
                      value={formData.memberShipNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.memberShipNumber ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={errors.memberShipNumber ? "true" : "false"}
                      aria-describedby={errors.memberShipNumber ? "memberShipNumber-error" : undefined}
                      placeholder="e.g. MEM12345"
                    />
                    {errors.memberShipNumber && (
                      <motion.p 
                        id="memberShipNumber-error" 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.memberShipNumber}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="pt-6"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-lg font-medium text-lg ${isSubmitting ? 'bg-indigo-700 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'} transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800`}
                aria-busy={isSubmitting ? "true" : "false"}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Member...
                  </span>
                ) : (
                  'Add Member'
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddOtherMemberPage;