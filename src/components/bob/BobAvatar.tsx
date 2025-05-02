import { motion } from 'framer-motion';
import ThinkingAnimation from './ThinkingAnimation';

type BobAvatarProps = {
  isThinking?: boolean;
};

const BobAvatar = ({ isThinking = false }: BobAvatarProps) => {
  return (
    <div className="relative">
      <div>
        <motion.div 
          className="relative w-32 h-40 sm:w-40 sm:h-48 beer-glass-container flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Beer Glass SVG with animations */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glass container - this is the outline */}
            <svg className="w-full h-full" viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 50C30 45 45 30 75 30C105 30 120 45 120 50L105 180H45L30 50Z" stroke="#D4B88C" strokeWidth="3" fill="rgba(30, 41, 59, 0.5)"/>
              <path className="glass-highlight" d="M45 50C45 45 55 40 75 40C95 40 105 45 105 50" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5"/>
              
              {/* Wine filling animation */}
              <motion.path 
                d="M45 180V80C45 70 55 65 75 65C95 65 105 70 105 80V180H45Z"
                fill="#8A6D3B"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ 
                  scaleY: isThinking ? 1 : 0, 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: isThinking ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
              
              {/* Froth animation */}
              <motion.path 
                d="M45 80C45 70 55 65 75 65C95 65 105 70 105 80"
                fill="#F5F5F5"
                strokeWidth="0"
                initial={{ y: 100 }}
                animate={{ 
                  y: isThinking ? 0 : 100,
                }}
                transition={{ 
                  duration: 2,
                  repeat: isThinking ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
              
              {/* Bubbles */}
              {isThinking && (
                <>
                  <motion.circle 
                    cx="60" cy="120" r="3" 
                    fill="white" fillOpacity="0.7"
                    animate={{
                      y: [-20, -60],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <motion.circle 
                    cx="75" cy="100" r="2.5" 
                    fill="white" fillOpacity="0.7"
                    animate={{
                      y: [-10, -40],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.2
                    }}
                  />
                  <motion.circle 
                    cx="90" cy="130" r="2" 
                    fill="white" fillOpacity="0.7"
                    animate={{
                      y: [-15, -50],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                </>
              )}
            </svg>
            
            {/* Thinking animation (optional - can keep or remove) */}
            {isThinking && (
              <div className="absolute bottom-8">
                <ThinkingAnimation />
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Glow effect when thinking */}
      {isThinking && (
        <motion.div 
          className="absolute inset-0 rounded-full beer-glass-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1], 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
          }}
        />
      )}
    </div>
  );
};

export default BobAvatar;