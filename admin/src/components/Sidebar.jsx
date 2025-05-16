import React, { useState, useEffect } from 'react';
import { User, Users, Menu, ChevronRight, Settings, Home, FileText, BarChart, Mail, BookImage, Newspaper, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

  const navItems = [
    { path: "/other-member", icon: <Users size={20} />, label: "Member" },
    { path: "/organization", icon: <Home size={20} />, label: "Organization" },
    { path: "/gallery", icon: <BookImage size={20} />, label: "Gallery" },
    { path: "/news", icon: <Newspaper size={20} />, label: "News" },
    { path: "/annual-report", icon: <FileText size={20} />, label: "Annual Report" },
    { path: "/noticeboard", icon: <Mail size={20} />, label: "Notice Board" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  // Animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div 
      className={`${expanded ? 'w-60' : 'w-20'} h-[91.3vh] bg-gradient-to-b from-indigo-950 to-zinc-900 shadow-xl transition-all duration-300 ease-in-out overflow-hidden relative`}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      variants={sidebarVariants}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-indigo-900/50">
        {expanded && (
          <motion.h1 
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Admin Panel
          </motion.h1>
        )}
        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg text-indigo-200 hover:bg-indigo-800/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {expanded ? <ChevronRight size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="py-4 px-2">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li key={item.path} variants={itemVariants}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-800/30 hover:text-white'
                    }
                  `}
                >
                  <motion.div 
                    whileHover={{ rotate: isActive ? 0 : 15 }}
                    transition={{ duration: 0.2 }}
                    className={isActive ? 'text-white' : 'text-indigo-400'}
                  >
                    {item.icon}
                  </motion.div>
                  
                  {expanded && (
                    <span className={`font-medium whitespace-nowrap ${isActive ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  )}
                  
                  {isActive && expanded && (
                    <motion.div 
                      className="absolute left-0 w-1 h-8 bg-blue-400 rounded-r-full"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="absolute bottom-0 w-full px-4 py-3 border-t border-indigo-900/40">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-indigo-300 hover:text-red-400 hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div whileHover={{ rotate: -10 }}>
            <LogOut size={20} />
          </motion.div>
          {expanded && <span className="text-sm font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Sidebar;