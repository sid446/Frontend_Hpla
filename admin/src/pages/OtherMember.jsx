import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader, X, Save, Phone, Mail, Info, User, AlertTriangle, Building, Hash, Trash2 } from 'lucide-react';
import { useOtherMember } from '../context/OtherMemberContext';

function OtherMember() {
    const [type, setType] = useState("");
    const [editForm, setEditForm] = useState({
        _id: "",
        name: "",
        designation: "",
        affiliation: "",
        mobile: "",
        memberShipNumber: "",
        type: ""
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Get values and functions from context
    const { 
        members, 
        loading, 
        error, 
        selectedMember, 
        isSubmitting,
        isDeleting,
        updateError,
        deleteError,
        fetchOtherMembers, 
        selectMember, 
        clearSelectedMember, 
        updateOtherMember,
        deleteOtherMember
    } = useOtherMember();

    // Memoized categorization of members
    const categorizedMembers = useMemo(() => {
        return {
            "Student Member": members.filter(member => member.type === "Student Member"),
            "Ordinary Member": members.filter(member => member.type === "Ordinary Member"),
            "Life Member": members.filter(member => member.type === "Life Member")
        };
    }, [members]);

    const memberTypes = [
        { id: "Student Member", label: "Student Members" },
        { id: "Ordinary Member", label: "Ordinary Members" },
        { id: "Life Member", label: "Life Members" }
    ];

    const handleMemberClick = (member) => {
        selectMember(member);
        setEditForm({
            _id: member._id || "",
            name: member.name || "",
            designation: member.designation || "",
            affiliation: member.affiliation || "",
            mobile: member.mobile || "",
            memberShipNumber: member.memberShipNumber || "",
            type: member.type || ""
        });
    };

    const handleClosePopup = () => {
        clearSelectedMember();
        setShowDeleteConfirm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateOtherMember(editForm);
        if (result.success) {
            handleClosePopup();
        }
    };

    const handleDeleteClick = useCallback(() => {
        setShowDeleteConfirm(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (!selectedMember || !selectedMember._id) return;
        
        const result = await deleteOtherMember(selectedMember._id);
        if (result.success) {
            handleClosePopup();
        }
    }, [selectedMember, deleteOtherMember]);

    const handleCancelDelete = useCallback(() => {
        setShowDeleteConfirm(false);
    }, []);

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
                   Organization Membership Management
                </h1>
                <p className="text-indigo-300 text-sm mt-1">View and manage organization memberships by type</p>
            </motion.div>

            {/* Category Buttons */}
            <motion.div 
                className='flex flex-wrap justify-between items-center gap-4 text-white mb-6'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <div className='flex flex-wrap gap-3'>
                    {memberTypes.map((memberType, index) => (
                        <motion.button
                            key={memberType.id}
                            onClick={() => setType(memberType.id)}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                type === memberType.id 
                                    ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white font-medium' 
                                    : 'bg-zinc-800 text-indigo-200 hover:bg-zinc-700'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                        >
                            {memberType.label}
                        </motion.button>
                    ))}
                </div>

                <Link to="/add-other-member">
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
                        <button onClick={() => fetchOtherMembers()} className="text-sm px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mt-2">
                            Retry
                        </button>
                    </div>
                )}

                {!type && !loading && (
                    <div className="flex flex-col items-center justify-center h-64 text-indigo-300">
                        <p>Select a membership type to view members</p>
                    </div>
                )}

                {type && !loading && categorizedMembers[type] && (
                    <div className="w-full">
                        <AnimatePresence>
                            {categorizedMembers[type].length > 0 ? (
                                <motion.div 
                                    className="w-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-zinc-700 text-indigo-200">
                                                <th className="px-4 py-3 text-left font-medium border-b border-zinc-600">Name</th>
                                                <th className="px-4 py-3 text-left font-medium border-b border-zinc-600">Designation</th>
                                                <th className="px-4 py-3 text-left font-medium border-b border-zinc-600">Affiliation</th>
                                                <th className="px-4 py-3 text-left font-medium border-b border-zinc-600">Member #</th>
                                                <th className="px-4 py-3 text-left font-medium border-b border-zinc-600">Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categorizedMembers[type].map((member, index) => (
                                                <motion.tr 
                                                    key={member._id}
                                                    className="border-b border-zinc-700/50 hover:bg-zinc-700/30 cursor-pointer transition-colors"
                                                    onClick={() => handleMemberClick(member)}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                                >
                                                    <td className="px-4 py-3 font-medium text-white">{member?.name || "—"}</td>
                                                    <td className="px-4 py-3 text-indigo-300">{member?.designation || "—"}</td>
                                                    <td className="px-4 py-3 text-zinc-400">{member?.affiliation || "—"}</td>
                                                    <td className="px-4 py-3 text-zinc-400">{member?.memberShipNumber || "—"}</td>
                                                    <td className="px-4 py-3 text-zinc-400">{member?.mobile || "—"}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="flex items-center justify-center h-32 text-indigo-300"
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
                {selectedMember && !showDeleteConfirm && (
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
                                    {/* Member ID - Hidden but included in form data */}
                                    <input type="hidden" name="_id" value={editForm._id} />

                                    {/* Member ID Display */}
                                    <div className="text-center text-xs text-zinc-500 mb-4">
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

                                    {/* Designation Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={editForm.designation}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Affiliation Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Building size={14} />
                                            Affiliation
                                        </label>
                                        <input
                                            type="text"
                                            name="affiliation"
                                            value={editForm.affiliation}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Membership Type Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">Membership Type</label>
                                        <select
                                            name="type"
                                            value={editForm.type}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {memberTypes.map(type => (
                                                <option key={type.id} value={type.id}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Mobile Number Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Phone size={14} />
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={editForm.mobile}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Membership Number Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Hash size={14} />
                                            Membership Number
                                        </label>
                                        <input
                                            type="text"
                                            name="memberShipNumber"
                                            value={editForm.memberShipNumber}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between gap-3 mt-6">
                                        {/* Delete Button */}
                                        <motion.button
                                            type="button"
                                            onClick={handleDeleteClick}
                                            className="px-4 py-2 bg-red-600/70 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </motion.button>
                                        
                                        <div className="flex gap-3">
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
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500, to-indigo-500 text-white rounded-lg flex items-center gap-2 disabled:opacity-70 hover:shadow-lg hover:shadow-indigo-500/20"
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

                {/* Delete Confirmation Modal */}
                {selectedMember && showDeleteConfirm && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePopup}
                    >
                        <motion.div 
                            className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-600 shadow-xl"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-red-400">
                                    Delete Member
                                </h2>
                                <button 
                                    onClick={handleClosePopup}
                                    className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {deleteError && (
                                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    <span>{deleteError}</span>
                                </div>
                            )}
                            
                            <div className="py-4">
                                <p className="text-zinc-300 mb-2">
                                    Are you sure you want to delete this member?
                                </p>
                                <p className="text-zinc-400 text-sm">
                                    <span className="font-medium text-white">{selectedMember.name}</span>
                                    {selectedMember.memberShipNumber && (
                                        <span> (#{selectedMember.memberShipNumber})</span>
                                    )}
                                </p>
                                <p className="text-zinc-400 text-sm mt-1">
                                    This action cannot be undone.
                                </p>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6">
                                <motion.button
                                    type="button"
                                    onClick={handleCancelDelete}
                                    className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={handleConfirmDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-70 hover:bg-red-500 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader size={16} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={16} />
                                            Delete Member
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default OtherMember;