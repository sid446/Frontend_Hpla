import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon, ChevronDown, Search, Loader, RefreshCw, X, Save, Info, Upload } from 'lucide-react';
import { useNews } from '../context/NewsContext';

function NewsAdminPage() {
  
  const { 
    news, 
    loading, 
    uploadLoading, 
    error, 
    successMessage, 
    addNews, 
    clearMessages 
  } = useNews();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    images: [],
    category: "Company News",
    imageFiles: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    content: "",
    images: [],
    category: "",
    imageFiles: []
  });
  const [isLoading, setIsLoading] = useState(false);
 
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editImagePreviews, setEditImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [previewArticle, setPreviewArticle] = useState(null);

  const categories = ["All", "Library Development & Infrastructure", "Events", "Book & Literature News", "Government Policies & Funding"];

  // Filter news based on search term and category
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [news, searchTerm, filterCategory]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImagePreviews = [];
    const newImageFiles = [...newArticle.imageFiles];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews([...imagePreviews, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
      newImageFiles.push(file);
    });

    setNewArticle({
      ...newArticle,
      imageFiles: newImageFiles
    });
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newEditImagePreviews = [];
    const newEditImageFiles = [...editForm.imageFiles];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newEditImagePreviews.push(reader.result);
        if (newEditImagePreviews.length === files.length) {
          setEditImagePreviews([...editImagePreviews, ...newEditImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
      newEditImageFiles.push(file);
    });

    setEditForm({
      ...editForm,
      imageFiles: newEditImageFiles
    });
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...newArticle.imageFiles];
    
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    
    setImagePreviews(newPreviews);
    setNewArticle({
      ...newArticle,
      imageFiles: newFiles
    });
  };

  const removeEditImage = (index, isExisting) => {
    if (isExisting) {
      const newImages = [...editForm.images];
      newImages.splice(index, 1);
      setEditForm({
        ...editForm,
        images: newImages
      });
    } else {
      const newPreviews = [...editImagePreviews];
      const newFiles = [...editForm.imageFiles];
      
      newPreviews.splice(index, 1);
      newFiles.splice(index, 1);
      
      setEditImagePreviews(newPreviews);
      setEditForm({
        ...editForm,
        imageFiles: newFiles
      });
    }
  };

  const handleAddNews = async (newArticle) => {
    console.log(newArticle)
    await addNews(newArticle);
  };

  const handleDeleteNews = async (id) => {
    try {
      console.log("Deleting article with ID:", selectedArticle,_id);
      setDeleteLoading(true);
      const response = await fetch("https://hpla.in/api/news/delete-news", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDeleteLoading(false);
          setSuccessMessage("Article deleted successfully");
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setDeleteLoading(false);
          setError(data.message || "Failed to delete article");
          setTimeout(() => setError(''), 3000);
        }
      } else {
        setDeleteLoading(false);
        setError("Failed to delete article");
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setDeleteLoading(false);
      setError("An error occurred while deleting the article");
      setTimeout(() => setError(''), 3000);
      console.error("Delete error:", error);
    }
  };
  
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setEditForm({
      id: article.id || "",
      title: article.title || "",
      content: article.content || "",
      images: article.images || [],
      category: article.category || "Company News",
      imageFiles: []
    });
    setEditImagePreviews([]);
  };
  
  const handleClosePopup = () => {
    setSelectedArticle(null);
    setImagePreviews([]);
    setEditImagePreviews([]);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API request delay with file upload
    setTimeout(() => {
      // In a real app, you would upload the imageFiles to a server here
      const uploadedImages = editForm.imageFiles.map(file => ({
        url: URL.createObjectURL(file), // Temporary for demo
        publicId: `img-${Math.random().toString(36).substr(2, 9)}`
      }));
      
      const updatedNews = news.map(item => {
        if (item.id === editForm.id) {
          return {
            ...item,
            title: editForm.title,
            content: editForm.content,
            images: [...editForm.images, ...uploadedImages],
            category: editForm.category
          };
        }
        return item;
      });
      
      setNews(updatedNews);
      setIsLoading(false);
      handleClosePopup();
      setSuccessMessage('Article updated successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 800);
  };

  return (
    <motion.div 
      className='w-full max-h-[91.3vh] bg-zinc-900 p-6 overflow-auto no-scrollbar'
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
          News Management
        </h1>
        <p className="text-indigo-300 text-sm mt-1">Create, organize, and manage your news articles</p>
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
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              filterCategory === category 
                ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white font-medium' 
                : 'bg-zinc-800 text-indigo-200 hover:bg-zinc-700'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
          >
            {category}
          </motion.button>
        ))}
        
        <div className="ml-auto flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Search news..."
              className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <motion.button 
            onClick={() => setShowAddForm(true)}
            className='px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center gap-2 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Add Article
          </motion.button>
        </div>
      </motion.div>

      {/* Success and Error Messages */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* News Article List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size={24} className="text-indigo-400 animate-spin" />
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-zinc-800/50 rounded-xl border border-zinc-700/50 backdrop-blur-sm p-6 text-indigo-300">
            <p className="mb-2">No news articles found in this category</p>
            <button 
              onClick={() => setShowAddForm(true)} 
              className="text-sm px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mt-2 flex items-center gap-1"
            >
              <Plus size={14} />
              Create New Article
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filteredNews.map((article, index) => (
                <motion.div 
                  key={article.id}
                  className="bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700/50 backdrop-blur-sm hover:border-indigo-500/30 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                  onClick={() => handleArticleClick(article)}
                  whileHover={{ y: -4, backgroundColor: "rgba(67, 56, 202, 0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                 
        <div className="flex flex-col md:flex-row">
          <div className="h-48 md:w-48 overflow-hidden relative group">
            {article.images.length > 0 && (
              <img 
                src={article.images[0].url} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            {article.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                +{article.images.length - 1} more
              </div>
            )}
          </div>
          <div className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs py-1 px-2 bg-indigo-500/20 text-indigo-300 rounded-full">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">{article.title}</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticle(article);
                  }}
                  className="text-xs px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewArticle(article);
                  }}
                  className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
            <p className="text-zinc-400 text-sm line-clamp-2">{article.content}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-zinc-500">
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      {/* News Preview Modal */}
<AnimatePresence>
  {previewArticle && (
    <motion.div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setPreviewArticle(null)}
    >
      <motion.div 
        className="bg-zinc-800 rounded-lg p-6 max-w-4xl w-full border border-zinc-600 shadow-xl overflow-y-auto max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Article Preview
          </h2>
          <button 
            onClick={() => setPreviewArticle(null)}
            className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Article Header */}
          <div>
            <span className="text-sm py-1 px-3 bg-indigo-500/20 text-indigo-300 rounded-full">
              {previewArticle.category}
            </span>
            <h1 className="text-3xl font-bold text-white mt-4 mb-2">{previewArticle.title}</h1>
            <div className="text-zinc-400 text-sm">
              Published on {new Date(previewArticle.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Image Gallery */}
          {previewArticle.images.length > 0 && (
            <div className="space-y-4">
              <div className="relative w-full h-96 rounded-xl overflow-hidden bg-zinc-700/50">
                <img 
                  src={previewArticle.images[0].url} 
                  alt={previewArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {previewArticle.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {previewArticle.images.slice(1).map((image, index) => (
                    <div key={`gallery-${index}`} className="relative h-32 rounded-lg overflow-hidden bg-zinc-700/50">
                      <img 
                        src={image.url} 
                        alt={`${previewArticle.title} - ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {previewArticle.content.split('\n').map((paragraph, i) => (
              <p key={`para-${i}`} className="mb-4 text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-zinc-700 flex justify-end">
            <button 
              onClick={() => {
                setPreviewArticle(null);
                setSelectedArticle(previewArticle);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
            >
              Edit Article
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Add Article Form Popup */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
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
                  Add New Article
                </h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleAddNews(newArticle); }}>
                <div className="space-y-4">
                  {/* Title Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <Info size={14} />
                      Title
                    </label>
                    <input
                      type="text"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter article title"
                    />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium">
                      Category
                    </label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.filter(cat => cat !== "All").map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <Info size={14} />
                      Content
                    </label>
                    <textarea
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      rows="5"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Enter article content..."
                    ></textarea>
                  </div>

                  {/* Multiple Image Upload Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <ImageIcon size={14} />
                      Article Images (Multiple)
                    </label>
                    
                    {/* Images preview grid */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={`preview-${index}`} className="relative group">
                            <img 
                              src={preview} 
                              alt={`Preview ${index}`} 
                              className="w-full h-24 object-cover rounded-lg border border-zinc-600"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        multiple
                      />
                      <motion.button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-zinc-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload size={16} />
                        {imagePreviews.length > 0 ? "Add More Images" : "Upload Images"}
                      </motion.button>
                      
                      {imagePreviews.length > 0 && (
                        <motion.button
                          type="button"
                          onClick={() => {
                            setImagePreviews([]);
                            setNewArticle({...newArticle, imageFiles: []});
                          }}
                          className="w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Remove All Images
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-3 pt-2">
                    <motion.button
                      type="button"
                      onClick={() => setShowAddForm(false)}
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
                      disabled={uploadLoading}
                    >
                      {uploadLoading ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Publish Article
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Detail/Edit Popup */}
      <AnimatePresence>
        {selectedArticle && (
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
                  Edit Article
                </h2>
                <button 
                  onClick={handleClosePopup}
                  className="text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700 p-1 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Show first image as main preview */}
              {editForm.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={editForm.images[0].url} 
                    alt={editForm.title || "Article"} 
                    className="w-full h-56 object-cover rounded-lg border border-zinc-600"
                  />
                  {editForm.images.length > 1 && (
                    <div className="text-center text-xs text-zinc-400 mt-1">
                      Showing 1 of {editForm.images.length} images
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleUpdateSubmit}>
                <div className="space-y-4">
                  {/* Hidden ID field */}
                  <input type="hidden" name="id" value={editForm.id} />

                  {/* Title Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <Info size={14} />
                      Title
                    </label>
                    <input
                      name="title"
                      value={editForm.title}
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
                      {categories.filter(cat => cat !== "All").map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <Info size={14} />
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={editForm.content}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  {/* Multiple Image Upload Field */}
                  <div>
                    <label className="block text-indigo-300 mb-1 text-sm font-medium flex items-center gap-1">
                      <ImageIcon size={14} />
                      Article Images
                    </label>
                    
                    {/* Existing images */}
                    {editForm.images.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-xs text-zinc-400 mb-1">Existing Images</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {editForm.images.map((image, index) => (
                            <div key={`existing-${index}`} className="relative group">
                              <img 
                                src={image.url} 
                                alt={`Existing ${index}`} 
                                className="w-full h-24 object-cover rounded-lg border border-zinc-600"
                              />
                              <button
                                onClick={() => removeEditImage(index, true)}
                                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* New image previews */}
                    {editImagePreviews.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-xs text-zinc-400 mb-1">New Uploads</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {editImagePreviews.map((preview, index) => (
                            <div key={`edit-preview-${index}`} className="relative group">
                              <img 
                                src={preview} 
                                alt={`New ${index}`} 
                                className="w-full h-24 object-cover rounded-lg border border-zinc-600"
                              />
                              <button
                                onClick={() => removeEditImage(index, false)}
                                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={handleEditImageUpload}
                        accept="image/*"
                        className="hidden"
                        multiple
                      />
                      <motion.button
                        type="button"
                        onClick={() => editFileInputRef.current.click()}
                        className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-zinc-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload size={16} />
                        {editImagePreviews.length > 0 ? "Add More Images" : "Upload New Images"}
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-3 mt-6">
                    <motion.button
                      type="button"
                      onClick={() => handleDeleteNews(selectedArticle.id)}
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
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Save size={16} />
                        )}
                        {isLoading ? "Saving..." : "Save"}
                      </motion.button>
                    </div>
                  </div>

                  {/* Created Timestamp */}
                  <div className="mt-4 pt-4 border-t border-zinc-700 text-xs text-zinc-500">
                    <p>Published: {selectedArticle.date}</p>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export default NewsAdminPage;