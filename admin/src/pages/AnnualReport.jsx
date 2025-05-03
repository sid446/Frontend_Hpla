import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader, X, Save, FileText, Link2, AlertTriangle, ExternalLink, Trash2 } from 'lucide-react';
import { useAnnualReportContext } from '../context/AnnualReportContext';

function AnnualReport() {
    const { 
        annualReports, 
        loading, 
        error, 
        fetchAnnualReports,     
        addAnnualReport,
        updateAnnualReport,
        deleteAnnualReport
    } = useAnnualReportContext();
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    
    const [reportForm, setReportForm] = useState({
        title: "",
        link: "",
        year: new Date().getFullYear(),
        description: ""
    });

    useEffect(() => {
        fetchAnnualReports();
    }, []);

    const handleOpenAddModal = () => {
        setSelectedReport(null);
        setReportForm({
            title: "",
            link: "",
            year: new Date().getFullYear(),
            description: ""
        });
        setUpdateError(null);
        setShowAddModal(true);
    };

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setReportForm({
            id: report._id,
            title: report.title,
            link: report.link, // Changed from link to link
            year: report.year,
            description: report.description
        });
        setUpdateError(null);
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setSelectedReport(null);
        setUpdateError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setUpdateError(null);
        
        try {
            if (selectedReport) {
                await updateAnnualReport(reportForm);
            } else {
                await addAnnualReport(reportForm);
            }
            handleCloseModal();
        } catch (err) {
            setUpdateError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReport = async (id) => {
        if (!window.confirm("Are you sure you want to delete this annual report?")) {
            return;
        }
        try {
            await deleteAnnualReport(id);
            handleCloseModal();
        } catch (err) {
            setUpdateError(err.message);
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
                   Annual Reports
                </h1>
                <p className="text-indigo-300 text-sm mt-1">View and manage organization annual reports</p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
                className='flex flex-wrap justify-end items-center gap-4 text-white mb-6'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <motion.button 
                    className='px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center gap-2 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenAddModal}
                >
                    <Plus size={16} />
                    Add Report
                </motion.button>
            </motion.div>

            {/* Reports Display */}
            <motion.div 
                className="mt-4 text-white rounded-xl bg-zinc-800/50 p-6 min-h-96 border border-zinc-700/50 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {loading && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader size={32} className="text-indigo-400 animate-spin mb-4" />
                        <p className="text-indigo-300">Loading annual reports...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-64 text-red-400">
                        <p className="mb-2">⚠️ {error}</p>
                        <button onClick={fetchAnnualReports} className="text-sm px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mt-2">
                            Retry
                        </button>
                    </div>
                )}

                {!loading && annualReports.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-indigo-300">
                        <p>No annual reports found</p>
                        <button 
                            onClick={handleOpenAddModal}
                            className="mt-3 px-3 py-1.5 bg-indigo-600 rounded-lg text-white text-sm hover:bg-indigo-500 transition-colors"
                        >
                            Add your first report
                        </button>
                    </div>
                )}

                {!loading && annualReports.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <AnimatePresence>
                            {annualReports.map((report, index) => (
                                <motion.div 
                                    key={report._id || index}
                                    className="bg-zinc-700/50 p-5 rounded-lg border border-zinc-600/50 hover:border-indigo-500/30 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                                    whileHover={{ y: -4, backgroundColor: "rgba(67, 56, 202, 0.1)" }}
                                    onClick={() => handleReportClick(report)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                                >   
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shrink-0">
                                            <FileText size={24} />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white text-lg">{report.title}</h3>
                                            <p className="text-indigo-300 text-sm mb-2">{report.year}</p>
                                            
                                            {report.description && (
                                                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{report.description}</p>
                                            )}
                                            
                                            <div className="flex items-center gap-1 text-indigo-400 text-xs">
                                                <Link2 size={12} />
                                                <a 
                                                    href={report.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="underline hover:text-indigo-300 flex items-center gap-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Report 
                                                    <ExternalLink size={10} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            {/* Add/Edit Report Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
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
                                    {selectedReport ? 'Edit Annual Report' : 'Add Annual Report'}
                                </h2>
                                <button 
                                    onClick={handleCloseModal}
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
                                    {/* Report Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                                            <FileText size={36} />
                                        </div>
                                    </div>

                                    {/* Report ID - Hidden but included in form data */}
                                    {selectedReport && <input type="hidden" name="_id" value={reportForm.id} />}

                                    {/* Title Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <FileText size={14} />
                                            Report Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={reportForm.title}
                                            onChange={handleInputChange}
                                            placeholder="Annual Report 2024"
                                            required
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Year Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={reportForm.year}
                                            onChange={handleInputChange}
                                            min="1900"
                                            max="2100"
                                            required
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Google Drive Link Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                                            <Link2 size={14} />
                                            Google Drive Link
                                        </label>
                                        <input
                                            type="url"
                                            name="link"
                                            value={reportForm.link}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/file/d/..."
                                            required
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <label className="block text-indigo-300 mb-1 text-sm font-medium">
                                            Description (Optional)
                                        </label>
                                        <textarea
                                            name="description"
                                            value={reportForm.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Brief description of this annual report..."
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-between items-center gap-3 mt-6">
                                        {selectedReport && (
                                            <motion.button
                                                type="button"
                                                onClick={() => handleDeleteReport(reportForm.id)}
                                                className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </motion.button>
                                        )}
                                        
                                        <div className={`flex gap-3 ${selectedReport ? '' : 'ml-auto'}`}>
                                            <motion.button
                                                type="button"
                                                onClick={handleCloseModal}
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
                                                        {selectedReport ? 'Update Report' : 'Add Report'}
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Created/Updated Timestamps */}
                                    {selectedReport && selectedReport.createdAt && (
                                        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-4 text-xs text-zinc-500">
                                            <div>
                                                <p>Created:</p>
                                                <p>{new Date(selectedReport.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p>Last Updated:</p>
                                                <p>{new Date(selectedReport.updatedAt).toLocaleString()}</p>
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

export default AnnualReport;