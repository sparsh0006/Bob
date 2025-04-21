import React from 'react';
import { motion } from 'framer-motion';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark to-secondary">
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent bob-glow" />
            <h1 className="text-xl font-serif font-bold text-white">BAXUS <span className="text-primary-light">Butler</span></h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="https://baxus.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Powered by BAXUS
            </a>
          </motion.div>
        </div>
      </header>
      
          {children}
          
          <footer className="py-6 mt-12 border-t border-gray-800">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Bob AI Whisky Butler. All rights reserved.</p>
              <p className="mt-2">Your personal whisky connoisseur in the BAXUS ecosystem</p>
            </div>
          </footer>
        </div>
      );
    };
    
    export default Layout;