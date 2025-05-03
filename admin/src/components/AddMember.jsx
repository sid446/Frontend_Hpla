import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const AddMemberPage = ({ className = "" }) => {
  // Category options array
  const categories = [
    { id: "advisory", label: "Advisory Board" },
    { id: "office", label: "Office Bearers" },
    { id: "executive", label: "Executive Members" },
    { id: "pro", label: "PRO Office Coordinator" },
    { id: "focus", label: "Focus Groups" },
    { id: "committees", label: "Committees" }
  ];

  const [formData, setFormData] = useState({
    category: '',
    post: '',
    name: '',
    about: '',
    phoneNumber: '',
    email: ''
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [animateForm, setAnimateForm] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          avatar: 'File size should not exceed 5MB'
        });
        return;
      }
      
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          avatar: 'Only JPG, PNG, GIF and WebP images are allowed'
        });
        return;
      }
      
      setAvatarFile(file);
      
      if (errors.avatar) {
        setErrors({
          ...errors,
          avatar: ''
        });
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.about.trim()) newErrors.about = 'About information is required';
    
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phoneNumber && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitMessage({ type: '', message: '' });
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        
        formDataToSend.append('avatar', avatarFile);
        
        const response = await axios.post('http://localhost:5000/member/save-member', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if(response){
            setSubmitMessage({
                type: 'success',
                message: 'Member added successfully!'
              });
              
              setFormData({
                category: '',
                post: '',
                name: '',
                about: '',
                phoneNumber: '',
                email: ''
              });
              setAvatarFile(null);
              setAvatarPreview(null);
        }
       
        
      } catch (error) {
        console.error('Error submitting form:', error);
        
        let errorMessage = 'Failed to add member. Please try again.';
        
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        
        setSubmitMessage({
          type: 'error',
          message: errorMessage
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
    <div className="w-full  h-[91.3vh] bg-gradient-to-b from-indigo-950 to-zinc-900 text-gray-100 p-4 md:p-8 overflow-y-scroll">
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl shadow-2xl "
        initial="hidden"
        animate={animateForm ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-6 md:p-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Add New Member
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
                {/* Category Dropdown */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="category" className="block text-sm font-medium mb-2 text-indigo-200">
                    Category <span className="text-pink-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.category ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.category ? "true" : "false"}
                    aria-describedby={errors.category ? "category-error" : undefined}
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <motion.p 
                      id="category-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.category}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Post */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="post" className="block text-sm font-medium mb-2 text-indigo-200">
                    Post
                  </label>
                  <input
                    type="text"
                    id="post"
                    name="post"
                    value={formData.post}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g. CEO, Senior Developer, UI Designer"
                  />
                </motion.div>
                
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

                {/* Avatar Upload */}
                <motion.div 
                  variants={itemVariants}
                  className="p-5 bg-indigo-950/30 rounded-lg border border-indigo-900"
                >
                  <h3 className="text-lg font-medium mb-4 text-indigo-300">Profile Image</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="avatar" className="block text-sm font-medium mb-2 text-indigo-200">
                      Upload Avatar <span className="text-pink-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <motion.label 
                        className="cursor-pointer bg-indigo-700 px-4 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 sm:mb-0 text-center sm:text-left transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Choose File
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                          aria-invalid={errors.avatar ? "true" : "false"}
                          aria-describedby={errors.avatar ? "avatar-error" : undefined}
                        />
                      </motion.label>
                      <span className="text-sm text-indigo-300 truncate">
                        {avatarFile ? avatarFile.name : 'No file chosen'}
                      </span>
                    </div>
                    {errors.avatar && (
                      <motion.p 
                        id="avatar-error" 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.avatar}
                      </motion.p>
                    )}
                    <p className="mt-2 text-xs text-indigo-400">
                      Accepted formats: JPG, PNG, GIF, WebP. Max size: 5MB
                    </p>
                  </div>
                  
                  {/* Avatar Preview */}
                  {avatarPreview && (
                    <motion.div 
                      className="mt-4 flex items-center space-x-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-medium text-indigo-200">Preview:</p>
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/20">
                        <img 
                          src={avatarPreview} 
                          alt="Avatar preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                {/* About */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="about" className="block text-sm font-medium mb-2 text-indigo-200">
                    About <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.about ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    aria-invalid={errors.about ? "true" : "false"}
                    aria-describedby={errors.about ? "about-error" : undefined}
                    placeholder="Brief description about the member..."
                  ></textarea>
                  {errors.about && (
                    <motion.p 
                      id="about-error" 
                      className="mt-2 text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.about}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Contact info container */}
                <motion.div 
                  variants={itemVariants}
                  className="p-5 bg-indigo-950/30 rounded-lg border border-indigo-900"
                >
                  <h3 className="text-lg font-medium mb-4 text-indigo-300">Contact Information</h3>
                  
                  {/* Phone Number */}
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 text-indigo-200">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. (123) 456-7890"
                      className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.phoneNumber ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={errors.phoneNumber ? "true" : "false"}
                      aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                    />
                    {errors.phoneNumber && (
                      <motion.p 
                        id="phone-error" 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.phoneNumber}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-indigo-200">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@domain.com"
                      className={`w-full px-4 py-3 bg-zinc-800/80 border ${errors.email ? 'border-red-500' : 'border-zinc-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <motion.p 
                        id="email-error" 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.email}
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

export default AddMemberPage;