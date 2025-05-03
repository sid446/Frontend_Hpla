import React from 'react';
import { User, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.div 
      className='h-16 w-full flex justify-between items-center bg-gradient-to-r from-zinc-900 to-indigo-950 border-b border-indigo-900/50 px-6'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <motion.h1 
        className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        HPLA
      </motion.h1>

      {/* Right side - search and profile */}
      <div className='flex items-center gap-6'>
        {/* Search */}
        <div className='relative hidden md:flex items-center'>
          <Search size={18} className='absolute left-3 text-zinc-400' />
          <input 
            type="text" 
            placeholder="Search..." 
            className='bg-zinc-800/50 border border-zinc-700/50 rounded-lg py-2 pl-10 pr-4 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-64 text-sm'
          />
        </div>

        {/* Notifications */}
        <motion.div
          className='relative cursor-pointer'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} className='text-indigo-200' />
          <span className='absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs'>
            3
          </span>
        </motion.div>

        {/* User Profile */}
        <motion.div 
          className='flex items-center gap-3 cursor-pointer'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className='w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md'>
            A
          </div>
          <div className='hidden md:block'>
            <p className='text-sm font-medium text-white'>Admin User</p>
            <p className='text-xs text-indigo-400'>Administrator</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Header;