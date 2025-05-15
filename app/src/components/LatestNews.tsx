import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronRight, ExternalLink } from 'lucide-react';

interface NoticeItem {
  _id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const NoticeBoard = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeNotice, setActiveNotice] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notice/getNotice');
        if (!response.ok) throw new Error('Failed to fetch notices');
        const data = await response.json();
        setNotices(data.data || []);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    if (notices.length === 0) return;

    const container = newsRef.current;
    const handleScroll = () => {
      if (container && !isHovered) {
        container.scrollTop += 1;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        }
      }
    };

    const scrollInterval = setInterval(handleScroll, 70);
    const cycleInterval = setInterval(() => {
      if (!isHovered && notices.length > 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveNotice((prev) => (prev + 1) % notices.length);
          setIsTransitioning(false);
        }, 300);
      }
    }, 8000);

    return () => {
      clearInterval(scrollInterval);
      clearInterval(cycleInterval);
    };
  }, [isHovered, notices.length]);

  const handlePaginationClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveNotice(index);
      setIsTransitioning(false);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto  md:top-5  z-1 relative glow-effect">
        <div className="animate-border">
          <div className="relative bg-white rounded-xl overflow-hidden shadow-lg backdrop-blur-sm p-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 bg-opacity-10 p-1.5 rounded-full">
                <Bell size={16} className="text-blue-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Loading notices...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto md:top-5  z-1 relative glow-effect">
        <div className="animate-border">
          <div className="relative bg-white rounded-xl overflow-hidden shadow-lg backdrop-blur-sm p-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 bg-opacity-10 p-1.5 rounded-full">
                <Bell size={16} className="text-blue-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">No notices available</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto md:top-5  z-1 relative glow-effect">
      <div className="animate-border">
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-sky-50 to-indigo-50">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 bg-opacity-10 p-1.5 rounded-full">
                <Bell size={16} className="text-blue-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-800 tracking-tight">Notice Board</h2>
            </div>
            <div className="flex gap-1">
              {notices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePaginationClick(index)}
                  aria-label={`View notice ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                    activeNotice === index 
                      ? 'bg-blue-500 scale-110 w-3' 
                      : 'bg-gray-300 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Featured Section */}
          <div 
            className={`px-5 py-4 border-b border-gray-100 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="inline-block px-2 py-0.5 bg-blue-50 rounded-full mb-2">
              <span className="text-xs font-medium text-blue-600">Featured</span>
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1.5 leading-tight">
              {notices[activeNotice].title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {notices[activeNotice].description}
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">
                {formatDate(notices[activeNotice].createdAt)}
              </span>
              {notices[activeNotice].slug && (
                <a
                  href={notices[activeNotice].slug}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 font-medium transition-colors duration-200"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read more <ChevronRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Scrollable List */}
          <div
            ref={newsRef}
            className="max-h-[200px] overflow-y-auto divide-y divide-gray-100 scrollbar-hide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {notices.map((notice, index) => {
              if (index === activeNotice) return null;
              return (
                <div
                  key={notice._id}
                  className="px-5 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <h4 className="font-medium text-sm text-gray-800 leading-tight mb-1.5">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
                    {notice.description}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      {formatDate(notice.createdAt)}
                    </span>
                    {notice.slug && (
                      <a
                        href={notice.slug}
                        className="flex items-center gap-0.5 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500">Official announcements</span>
            <a 
              href="/announcements" 
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;