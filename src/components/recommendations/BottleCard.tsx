import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottleRecommendation } from '../../types/Bottle';
import Card from '../ui/Card';
import Button from '../ui/Button';

type BottleCardProps = {
  recommendation: BottleRecommendation;
  isExpanded: boolean;
  onToggleExpand: () => void;
  matchScore: number;
};

const BottleCard = ({ 
  recommendation, 
  isExpanded, 
  onToggleExpand,
  matchScore 
}: BottleCardProps) => {
  const { bottle, reasons } = recommendation;
  
  // Format match score as percentage
  const matchPercentage = Math.round(matchScore * 100);
  
  // Get icon based on recommendation type
  const getReasonIcon = (type: string) => {
    switch (type) {
      case 'similar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'complementary':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'value':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'trending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden" hoverEffect>
      <div className="p-4">
        <div className="flex items-start">
          {/* Bottle image */}
          <div className="relative h-24 w-16 bg-gray-800 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
            {bottle.image_url ? (
              <img 
                src={bottle.image_url} 
                alt={bottle.name} 
                className="h-20 object-contain" 
              />
            ) : (
              <div className="text-accent text-xs text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Whisky
              </div>
            )}
            
            {/* Match score badge */}
            <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center border-2 border-secondary-dark">
              {matchPercentage}%
            </div>
          </div>
          
          {/* Bottle info */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-medium text-white" title={bottle.name}>
              {bottle.name}
            </h3>
            
            <div className="flex flex-wrap items-center mt-1 text-sm text-gray-300">
              <span className="mr-3">{bottle.distiller}</span>
              {bottle.region && (
                <span className="mr-3 text-primary-light">{bottle.region}</span>
              )}
              {bottle.age && (
                <span className="mr-3">{bottle.age} Years</span>
              )}
            </div>
            
            {/* Price and rating */}
            <div className="flex items-center mt-2">
              {bottle.price && (
                <div className="text-accent-light font-medium mr-4">
                  ${bottle.price}
                </div>
              )}
              {bottle.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm text-gray-300">{bottle.rating}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Expand/Collapse button */}
          <button
            onClick={onToggleExpand}
            className="ml-2 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Why Bob Recommends This:
                </h4>
                
                <ul className="space-y-2 mb-4">
                  {reasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-0.5 mr-2 text-accent">
                        {getReasonIcon(reason.type)}
                      </div>
                      <span className="text-sm text-gray-300">
                        {reason.description}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* Tasting notes */}
                {bottle.tasting_notes && bottle.tasting_notes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">
                      Tasting Notes:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {bottle.tasting_notes.map((note, i) => (
                        <span 
                          key={i} 
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-gray-300 border border-gray-700"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add to wishlist button */}
                <Button variant="glass" size="sm" className="w-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default BottleCard;