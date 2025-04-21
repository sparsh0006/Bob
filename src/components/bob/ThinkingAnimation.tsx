import { motion } from 'framer-motion';

const ThinkingAnimation = () => {
  const dotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: (i: number) => ({
      y: [0, -5, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  };
  
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-white rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

export default ThinkingAnimation;