import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type BobDialogProps = {
  text: string;
  isTyping?: boolean;
};

const BobDialog = ({ text, isTyping = false }: BobDialogProps) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Reset typing animation when text changes
  useEffect(() => {
    if (!isTyping) {
      setDisplayText(text);
      setCurrentIndex(text.length);
    } else {
      setDisplayText('');
      setCurrentIndex(0);
    }
  }, [text, isTyping]);
  
  // Typing effect animation
  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed of typing here
      
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, isTyping, text]);
  
  return (
    <motion.div
      className="max-w-2xl mx-auto glass-panel p-6 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Speech bubble arrow */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-glass rotate-45 border-t border-l border-white/10" />
      
      <p className="text-lg text-gray-200 leading-relaxed font-light">
        {displayText}
        {isTyping && currentIndex < text.length && (
          <span className="typing-animation"></span>
        )}
      </p>
    </motion.div>
  );
};

export default BobDialog;