import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader, X, Save, Phone, Mail, Info, User, AlertTriangle } from 'lucide-react';
import { useMembers } from '../context/MemberContext';
import axios from 'axios';

function Member() {
    const [type, setType] = useState("");
    const { members, loading, error, fetchMembers } = useMembers();
    const [selectedMember, setSelectedMember] = useState(null);
    const [editForm, setEditForm] = useState({
        _id: "",
        name: "",
        post: "",
        category: "",
        phoneNumber: "",
        email: "",
        about: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Memoized categorization of members
    const categorizedMembers = useMemo(() => {
        return {
            advisory: members.filter(member => member.category === "advisory"),
            office: members.filter(member => member.category === "office"),
            executive: members.filter(member => member.category === "executive"),
            pro: members.filter(member => member.category === "pro"),
            focus: members.filter(member => member.category === "focus"),
            committees: members.filter(member => member.category === "committees")
        };
    }, [members]);

    const categories = [
        { id: "advisory", label: "Advisory Board" },
        { id: "office", label: "Office Bearers" },
        { id: "executive", label: "Executive Members" },
        { id: "pro", label: "PRO Office Coordinator" },
        { id: "focus", label: "Focus Groups" },
        { id: "committees", label: "Committees" }
    ];

    const handleMemberClick = (member) => {
        setSelectedMember(member);
        setEditForm({
            _id: member._id || "",
            name: member.name || "",
            post: member.post || "",
            category: member.category || "",
            phoneNumber: member.phoneNumber || "",
            email: member.email || "",
            about: member.about || ""
        });
        setAvatarPreview(member.avatar?.url || null);
        setUpdateError(null);
    };

    const handleClosePopup = () => {
        setSelectedMember(null);
        setAvatarFile(null);
        setAvatarPreview(null);
        setUpdateError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editForm._id) {
            setUpdateError("Member ID is missing");
            return;
        }
    
        setIsSubmitting(true);
        setUpdateError(null);
    
        try {
            const formData = new FormData();
            
            // Ensure _id is included
            formData.append('_id', editForm._id); 
            formData.append('name', editForm.name);
            formData.append('post', editForm.post);
            formData.append('category', editForm.category);
            formData.append('phoneNumber', editForm.phoneNumber);
            formData.append('email', editForm.email);
            formData.append('about', editForm.about);
    
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }
    
            const response = await axios.post('http://localhost:5000/member/update-member', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.data && response.data.statusCode === 200) {
                await fetchMembers();
                handleClosePopup();
            } else {
                setUpdateError('Failed to update member. Please try again.');
            }
        } catch (err) {
            console.error("Failed to update member:", err);
            setUpdateError(err.response?.data?.message || 'An error occurred while updating the member');
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <motion.div 
            className='w-full h-[91.3vh] bg-zinc-900 p-6 overflow-auto'
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
                   Organization Members Management
                </h1>
                <p className="text-indigo-300 text-sm mt-1">View and manage organization members by category</p>
            </motion.div>

            {/* Category Buttons */}
            <motion.div 
                className='flex flex-wrap justify-between items-center gap-4 text-white mb-6'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <div className='flex flex-wrap gap-3'>
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setType(category.id)}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                type === category.id 
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
                </div>

                <Link to="/add-members">
                    <motion.button 
                        className='px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center gap-2 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus size={16} />
                        Add Member
                    </motion.button>
                </Link>
            </motion.div>

            {/* Data Display */}
            <motion.div 
                className="mt-4 text-white rounded-xl bg-zinc-800/50 p-6 min-h-96 border border-zinc-700/50 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {loading && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader size={32} className="text-indigo-400 animate-spin mb-4" />
                        <p className="text-indigo-300">Loading members data...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-64 text-red-400">
                        <p className="mb-2">⚠️ {error}</p>
                        <button onClick={() => fetchMembers()} className="text-sm px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mt-2">
                            Retry
                        </button>
                    </div>
                )}

                {!type && !loading && (
                    <div className="flex flex-col items-center justify-center h-64 text-indigo-300">
                        <p>Select a category to view members</p>
                    </div>
                )}

                {type && !loading && categorizedMembers[type] && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <AnimatePresence>
                            {categorizedMembers[type].length > 0 ? (
                                categorizedMembers[type].map((member, index) => (
                                    <motion.div 
                                        key={member._id}
                                        className="bg-zinc-700/50 p-5 rounded-lg border border-zinc-600/50 hover:border-indigo-500/30 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                                        whileHover={{ y: -4, backgroundColor: "rgba(67, 56, 202, 0.1)" }}
                                        onClick={() => handleMemberClick(member)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                                    >   
                                        <div className="flex items-start gap-4">
                                            {!member.avatar ? (
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                                                    {member?.name?.charAt(0) || "M" }
                                                </div>
                                            ) : (
                                                <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-indigo-500/50">
                                                    <img 
                                                        className="w-full h-full object-cover" 
                                                        src={member?.avatar?.url} 
                                                        alt={member.name} 
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <h3 className="font-medium text-white text-lg">{member?.name || "Member Name"}</h3>
                                                <p className="text-indigo-300 text-sm mb-2">{member?.post || "Position"}</p>
                                                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                                                    <Mail size={12} className="text-indigo-400" />
                                                    <span className="truncate max-w-xs">{member?.email || "No email"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    className="col-span-3 flex items-center justify-center h-32 text-indigo-300"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>No members found in this category</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            {/* Edit Popup */}
            <AnimatePresence>
                {selectedMember && (
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
                                    Edit Member
                                </h2>
                                <button 
                                    onClick={handleClosePopup}
                                    className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {updateError && (
                                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    <span>{updateError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* Member Avatar */}
                                    <div className="flex flex-col items-center mb-4">
                                        {!avatarPreview ? (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-zinc-700 mb-3">
                                                {editForm?.name?.charAt(0) || "M"}
                                            </div>
                                        ) : (
                                            <img 
                                                src={avatarPreview} 
                                                alt={editForm.name} 
                                                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/50 mb-3"
                                            />
                                        )}
                                        
                                        <label className="cursor-pointer px-3 py-1.5 bg-zinc-700 text-indigo-200 rounded-lg text-sm hover:bg-zinc-600 transition-colors">
                                            Change Photo
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                className="hidden" 
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    </div>

                                    {/* Member ID - Hidden but included in form data */}
                                    <input type="hidden" name="_id" value={editForm._id} />

                                    {/* Member ID Display */}
                                    <div className="text-center text-xs text-zinc-500 -mt-2 mb-4">
                                        ID: {editForm._id}
                                    </div>

                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <User size={14} />
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Position/Post Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">Position</label>
                                        <input
                                            type="text"
                                            name="post"
                                            value={editForm.post}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Phone Number Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Phone size={14} />
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={editForm.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Mail size={14} />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* About Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Info size={14} />
                                            About
                                        </label>
                                        <textarea
                                            name="about"
                                            value={editForm.about}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-3 mt-6">
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
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg flex items-center gap-2 disabled:opacity-70 hover:shadow-lg hover:shadow-indigo-500/20"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader size={16} className="animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Changes
                                                </>
                                            )}
                                        </motion.button>
                                    </div>

                                    {/* Created/Updated Timestamps */}
                                    {selectedMember.createdAt && (
                                        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-4 text-xs text-zinc-500">
                                            <div>
                                                <p>Created:</p>
                                                <p>{new Date(selectedMember.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p>Last Updated:</p>
                                                <p>{new Date(selectedMember.updatedAt).toLocaleString()}</p>
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

export default Member;