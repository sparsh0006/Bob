import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
};

const Card = ({
  children,
  className,
  glassEffect = true,
  hoverEffect = false,
  onClick,
}: CardProps) => {
  const cardClasses = classNames(
    'rounded-xl overflow-hidden shadow-md',
    {
      'glass-panel': glassEffect,
      'bg-secondary': !glassEffect,
      'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-glow': hoverEffect
    },
    className
  );
  
  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      whileTap={hoverEffect && onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;