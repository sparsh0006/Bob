import React from 'react';
import { motion } from 'framer-motion';
import { Bottle } from '../../types/Bottle';
import Card from '../ui/Card';

type BottleListProps = {
  bottles: Bottle[];
  compact?: boolean;
};

const BottleList = ({ bottles, compact = false }: BottleListProps) => {
  if (!bottles || bottles.length === 0) {
    return (
      <div className="text-center p-6 text-gray-400">
        No bottles in collection yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bottles.map((bottle, index) => (
        <motion.div
          key={bottle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bottle-hover overflow-hidden" hoverEffect>
            <div className="flex items-center p-4">
              <div className="h-20 w-16 bg-gray-800 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                {bottle.image_url ? (
                  <img 
                    src={bottle.image_url} 
                    alt={bottle.name} 
                    className="h-16 object-contain" 
                  />
                ) : (
                  <div className="text-accent text-xs text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Whisky
                  </div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-medium text-white truncate" title={bottle.name}>
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

                {!compact && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {bottle.tasting_notes && bottle.tasting_notes.map((note, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-gray-300 border border-gray-700"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {!compact && (
                <div className="ml-4 flex-shrink-0 text-right">
                  {bottle.price && (
                    <div className="text-accent-light font-medium">
                      ${bottle.price}
                    </div>
                  )}
                  {bottle.rating && (
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-300">{bottle.rating}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BottleList;  