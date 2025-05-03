import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, Calendar, Clock, Eye, Share2, BookmarkPlus, ChevronRight } from 'lucide-react';
import { useNews } from '../context/NewsContext';

function NewsPreviewPage() {
  const { news } = useNews();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isReading, setIsReading] = useState(false);
  
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

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsReading(true);
    // Scroll to top when opening an article
    window.scrollTo(0, 0);
  };

  const backToList = () => {
    setIsReading(false);
    setSelectedArticle(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadingTime = (contentLength) => {
    // Estimate reading time based on average reading speed (200 words per minute)
    const wordCount = contentLength.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedArticle && selectedArticle.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedArticle.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedArticle && selectedArticle.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedArticle.images.length - 1 : prev - 1
      );
    }
  };

  // Reset current image index when selecting a new article
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedArticle]);

  // Paragraphize content
  const formatContent = (content) => {
    if (!content) return [];
    return content.split('\n\n').filter(paragraph => paragraph.trim() !== '');
  };

  return (
    <motion.div 
      className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isReading && (
                <button 
                  onClick={backToList}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {isReading ? "Article Preview" : "Library News"}
              </h1>
            </div>
            
            {!isReading && (
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-zinc-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {isReading && selectedArticle ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-md"
          >
            {/* Article Header */}
            <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-700">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                  {selectedArticle.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-zinc-500 dark:text-zinc-400 gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(selectedArticle.date)}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {formatReadingTime(selectedArticle.content)}
                </div>
              </div>
            </div>
            
            {/* Article Image Carousel */}
            {selectedArticle.images && selectedArticle.images.length > 0 && (
              <div className="relative w-full">
                <div className="w-full aspect-video md:aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={selectedArticle.images[currentImageIndex].url} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {selectedArticle.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedArticle.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            currentImageIndex === index 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {currentImageIndex + 1} / {selectedArticle.images.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 sm:p-8">
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                {formatContent(selectedArticle.content).map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                  <BookmarkPlus size={18} />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                  <Share2 size={18} />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button 
                  onClick={backToList}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors ml-auto"
                >
                  <ChevronLeft size={18} />
                  Back to News
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Category Filter Tabs */}
            <div className="mb-6 overflow-x-auto pb-1 hide-scrollbar">
              <div className="flex space-x-2">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      filterCategory === category 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium' 
                        : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* News Grid */}
            {filteredNews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-zinc-800 rounded-xl p-6 text-zinc-500 dark:text-zinc-400">
                <p className="mb-2">No news articles found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredNews.map((article, index) => (
                    <motion.div 
                      key={article.id}
                      className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
                      onClick={() => handleArticleClick(article)}
                      whileHover={{ y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <div className="h-48 overflow-hidden relative">
                        {article.images.length > 0 ? (
                          <img 
                            src={article.images[0].url} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white">
                            <span className="text-lg font-medium">No Image</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white">
                            {article.category}
                          </span>
                        </div>
                        {article.images.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            +{article.images.length - 1} photos
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4">
                          {article.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(article.date)}
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            Read more
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default NewsPreviewPage;