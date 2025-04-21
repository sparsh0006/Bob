import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import ThinkingAnimation from './ThinkingAnimation';

type BobAvatarProps = {
  isThinking?: boolean;
};

const BobAvatar = ({ isThinking = false }: BobAvatarProps) => {
  // Floating animation for the avatar
  const floatAnimation = useSpring({
    from: { y: 0 },
    to: async (next) => {
      // Creates a continuous floating effect
      while (true) {
        await next({ y: -10 });
        await next({ y: 0 });
      }
    },
    config: { duration: 2000 },
  });

  // Pulse animation for thinking state
  const pulseAnimation = useSpring({
    opacity: isThinking ? 0.8 : 1,
    scale: isThinking ? 1.05 : 1,
    config: { duration: 1000 },
    loop: isThinking,
  });

  // Create a styled div with animations
  const AnimatedDiv = animated('div');

  return (
    <div className="relative">
      <AnimatedDiv 
        style={{
          transform: floatAnimation.y.to(y => `translateY(${y}px)`),
          opacity: pulseAnimation.opacity,
          scale: pulseAnimation.scale
        }}
      >
        <motion.div 
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-primary to-accent bob-glow flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Bob's facial features - minimalist AI-like design */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute flex space-x-12 top-1/3">
              <motion.div 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white"
                animate={{ 
                  scale: isThinking ? [1, 1.2, 1] : 1,
                  opacity: isThinking ? [1, 0.7, 1] : 1
                }}
                transition={{ repeat: isThinking ? Infinity : 0, duration: 2 }}
              />
              <motion.div 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white"
                animate={{ 
                  scale: isThinking ? [1, 1.2, 1] : 1,
                  opacity: isThinking ? [1, 0.7, 1] : 1
                }}
                transition={{ repeat: isThinking ? Infinity : 0, duration: 2, delay: 0.3 }}
              />
            </div>
            
            {/* Mouth - changes based on thinking state */}
            {isThinking ? (
              <div className="absolute top-2/3">
                <ThinkingAnimation />
              </div>
            ) : (
              <motion.div 
                className="absolute top-2/3 w-12 h-1 sm:w-16 sm:h-1.5 bg-white rounded-full"
                initial={{ width: 12 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </motion.div>
      </AnimatedDiv>
      
      {/* Animated aura when thinking */}
      {isThinking && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-accent"
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