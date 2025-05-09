import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader, X, Save, Image, Info, Trash2, RefreshCw } from 'lucide-react';
import axios from 'axios';

function PhotoGalleryManager() {
    // Photo listing state
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [deleteLoading, setDeleteLoading] = useState(false);
    // Upload state
    const [uploadLoading, setUploadLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('event');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Photo detail state
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [editForm, setEditForm] = useState({
        _id: "",
        description: "",
        category: ""
    });

    // Categories for filtering and organization
    const categories = [
        { id: "all", label: "All Photos" },
        { id: "event", label: "Event Photos" },
        { id: "campus", label: "Campus Photos" },
        { id: "people", label: "People" },
        { id: "achievements", label: "Achievements" }
    ];

    // Create preview when file is selected
    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // Free memory when component unmounts
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    // Fetch photos on component mount
    useEffect(() => {
        fetchPhotos();
    }, []);

    // Memoized filtered photos
    const filteredPhotos = useMemo(() => {
        if (selectedFilter === 'all') {
            return photos;
        }
        return photos.filter(photo => photo.category === selectedFilter);
    }, [photos, selectedFilter]);

    const fetchPhotos = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.get('https://hpla.in/api/gallery/get-photo');
            setPhotos(response.data.data);
        } catch (err) {
            setError('Failed to fetch photos. Please try again later.');
            console.error('Error fetching photos:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            return;
        }
        
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            setError('Please select a photo to upload');
            return;
        }
        
        setError(null);
        setSuccessMessage('');
        setUploadLoading(true);
        
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('description', description);
        formData.append('category', category);
        
        try {
            const response = await axios.post(
                'https://hpla.in/api/gallery/save-photo', 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            // Reset form
            setDescription('');
            setSelectedFile(null);
            setPreview(null);
            
            // Show success message
            setSuccessMessage('Photo uploaded successfully!');
            
            // Refresh the gallery
            fetchPhotos();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload photo. Please try again.');
            console.error('Error uploading photo:', err);
        } finally {
            setUploadLoading(false);
        }
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setEditForm({
            _id: photo._id || "",
            description: photo.description || "",
            category: photo.category || "event"
        });
    };

    const handleClosePopup = () => {
        setSelectedPhoto(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                'https://hpla.in/api/gallery/update-photo',
                editForm
            );
            
            // Refresh gallery and close popup
            fetchPhotos();
            handleClosePopup();
            
        } catch (err) {
            console.error('Error updating photo:', err);
            setError('Failed to update photo details.');
        }
    };

    const handleDeletePhoto = async (id) => {
      if (window.confirm('Are you sure you want to delete this photo?')) {
          try {
              await axios.post(`https://hpla.in/api/gallery/delete`, {id});
              fetchPhotos();
              handleClosePopup();
              setSuccessMessage('Photo deleted successfully!');
          } catch (err) {
              console.error('Delete error:', err.response?.data);
              setError(err.response?.data?.message || 'Failed to delete photo');
          }
      }
    };

    return (
        <motion.div 
            className='w-full max-h-[91.3vh] bg-zinc-900 p-6 overflow-auto no-scrollbar '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <motion.div 
                className="mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Photo Gallery Management
                </h1>
                <p className="text-indigo-300 text-sm mt-1">Upload, organize, and manage your photo collection</p>
            </motion.div>

            {/* Category Filter Buttons */}
            <motion.div 
                className='flex flex-wrap gap-3 mb-6'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                {categories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        onClick={() => setSelectedFilter(category.id)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                            selectedFilter === category.id 
                                ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white font-medium' 
                                : 'bg-zinc-800 text-indigo-200 hover:bg-zinc-700'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                    >
                        {category.label}
                    </motion.button>
                ))}
                
                <motion.button 
                    onClick={fetchPhotos}
                    className='ml-auto px-4 py-2 bg-zinc-800 rounded-lg flex items-center gap-2 text-indigo-200 hover:bg-zinc-700 transition-all'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RefreshCw size={16} />
                    Refresh
                </motion.button>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-[calc(100%-8rem)] no-scrollbar ">
                {/* Upload Form Section */}
                <motion.div 
                    className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 backdrop-blur-sm h-full  "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                        Upload New Photo
                    </h2>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 flex items-start gap-2">
                            <X size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 flex items-start gap-2">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.div>
                            <span>{successMessage}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleUploadSubmit}>
                        <div className="mb-4">
                            <label className="block text-indigo-300 text-sm font-medium mb-2 flex items-center gap-1">
                                <Image size={14} />
                                Photo
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-700 border-dashed rounded-lg hover:border-indigo-500/50 transition-colors">
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <div>
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="mx-auto h-48 object-cover rounded-lg border border-zinc-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreview(null);
                                                }}
                                                className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg
                                                className="mx-auto h-12 w-12 text-zinc-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-center justify-center">
                                                <label className="relative cursor-pointer rounded-md font-medium text-indigo-300 hover:text-indigo-200 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-zinc-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-indigo-300 text-sm font-medium mb-2 flex items-center gap-1">
                                <Info size={14} />
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                placeholder="Add a description for this photo..."
                            ></textarea>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-indigo-300 text-sm font-medium mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {categories.filter(cat => cat.id !== 'all').map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <motion.button
                            type="submit"
                            disabled={uploadLoading || !selectedFile}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {uploadLoading ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />
                                    Upload Photo
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
                
                {/* Gallery Section */}
                <motion.div 
                    className="md:col-span-2  bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 backdrop-blur-sm flex flex-col h-full overflow-auto  "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                        Photo Collection
                    </h2>
                    
                    <div className="flex-grow overflow-auto no-scrollbar ">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader size={24} className="text-indigo-400 animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-64 text-red-400">
                                <p className="mb-2">{error}</p>
                                <button 
                                    onClick={fetchPhotos} 
                                    className="text-sm px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mt-2 flex items-center gap-1"
                                >
                                    <RefreshCw size={14} />
                                    Retry
                                </button>
                            </div>
                        ) : filteredPhotos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-indigo-300">
                                <p>No photos found in this category</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <AnimatePresence>
                                    {filteredPhotos.map((photo, index) => (
                                        <motion.div 
                                            key={photo._id}
                                            className="bg-zinc-700/50 rounded-lg overflow-hidden border border-zinc-600/50 hover:border-indigo-500/30 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                                            onClick={() => handlePhotoClick(photo)}
                                            whileHover={{ y: -4, backgroundColor: "rgba(67, 56, 202, 0.1)" }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                                        >
                                            <div className="h-48 overflow-hidden relative group">
                                                <img 
                                                    src={photo.photo.url} 
                                                    alt={photo.description || 'Gallery photo'} 
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                    <span className="text-white text-sm truncate">{photo.description || 'No description'}</span>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs py-1 px-2 bg-indigo-500/20 text-indigo-300 rounded-full">
                                                        {categories.find(cat => cat.id === photo.category)?.label || photo.category}
                                                    </span>
                                                    <span className="text-xs text-zinc-500">
                                                        {new Date(photo.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Photo Detail/Edit Popup */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePopup}
                    >
                        <motion.div 
                            className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-600 shadow-xl overflow-y-auto max-h-[90vh]"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Edit Photo Details
                                </h2>
                                <button 
                                    onClick={handleClosePopup}
                                    className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <img 
                                    src={selectedPhoto?.photo?.url} 
                                    alt={selectedPhoto?.description || "Photo"} 
                                    className="w-full h-56 object-cover rounded-lg border border-zinc-600"
                                />
                            </div>

                            <form onSubmit={handleUpdateSubmit}>
                                <div className="space-y-4">
                                    {/* Hidden ID field */}
                                    <input type="hidden" name="_id" value={editForm._id} />

                                    {/* Description Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Info size={14} />
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        />
                                    </div>

                                    {/* Category Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">Category</label>
                                        <select
                                            name="category"
                                            value={editForm.category}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {categories.filter(cat => cat.id !== 'all').map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between gap-3 mt-6">
                                        <motion.button
                                            type="button"
                                            onClick={() => handleDeletePhoto(selectedPhoto._id)}
                                            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            disabled={deleteLoading}
                                        >
                                            {deleteLoading ? (
                                                <Loader size={16} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={16} />
                                            )}
                                            {deleteLoading ? "Deleting..." : "Delete"}
                                        </motion.button>
                                        
                                        <div className="flex gap-2">
                                            <motion.button
                                                type="button"
                                                onClick={handleClosePopup}
                                                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <Save size={16} />
                                                Save
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Created/Updated Timestamps */}
                                    {selectedPhoto.createdAt && (
                                        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-4 text-xs text-zinc-500">
                                            <div>
                                                <p>Uploaded:</p>
                                                <p>{new Date(selectedPhoto.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p>Last Modified:</p>
                                                <p>{new Date(selectedPhoto.updatedAt || selectedPhoto.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default PhotoGalleryManager;