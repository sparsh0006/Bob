import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bottle, CollectionAnalysis } from '../../types/Bottle';
import Card from '../ui/Card';

type BarVisualizationProps = {
  bottles: Bottle[];
  analysis: CollectionAnalysis;
};

const BarVisualization = ({ bottles, analysis }: BarVisualizationProps) => {
  // Calculate region distribution for visualization
  const regionData = useMemo(() => {
    if (!analysis.regions) return [];
    
    return Object.entries(analysis.regions)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [analysis.regions]);
  
  // Format price range for display
  const priceRange = useMemo(() => {
    if (bottles.length === 0) return 'N/A';
    
    const prices = bottles
      .filter(bottle => bottle.price)
      .map(bottle => bottle.price as number);
    
    if (prices.length === 0) return 'N/A';
    
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return `$${min} - $${max}`;
  }, [bottles]);
  
  // Format flavor profile for display
  const flavorHighlights = useMemo(() => {
    if (!analysis.flavorProfile) return [];
    
    return Object.entries(analysis.flavorProfile)
      .filter(([, value]) => value > 0.3) // Only show significant flavors
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => key);
  }, [analysis.flavorProfile]);
  
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h3 className="text-lg font-serif font-medium text-white mb-3">Collection Overview</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Bottles</div>
            <div className="text-2xl font-medium text-white">{bottles.length}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Avg. Price</div>
            <div className="text-2xl font-medium text-accent-light">
              ${Math.round(analysis.averagePrice)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Price Range</div>
            <div className="text-base text-white">{priceRange}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Avg. Age</div>
            <div className="text-base text-white">
              {analysis.averageAge > 0 ? `${Math.round(analysis.averageAge)} years` : 'N/A'}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Region Visualization */}
      <Card className="p-5">
        <h3 className="text-lg font-serif font-medium text-white mb-3">Regions</h3>
        
        <div className="space-y-3">
          {regionData.map((region, index) => (
            <div key={region.label} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">{region.label}</span>
                <span className="text-gray-400">{region.value}</span>
              </div>
              <motion.div
                className="h-2 rounded-full bg-gray-700 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(region.value / Math.max(...regionData.map(r => r.value))) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                />
              </motion.div>
            </div>
          ))}
          
          {regionData.length === 0 && (
            <div className="text-center py-2 text-gray-400">
              No region data available
            </div>
          )}
        </div>
      </Card>
      
      {/* Flavor Profile */}
      <Card className="p-5">
        <h3 className="text-lg font-serif font-medium text-white mb-2">Taste Profile</h3>
        
        {flavorHighlights.length > 0 ? (
          <>
            <div className="flex gap-2 mb-3">
              {flavorHighlights.map((flavor) => (
                <span 
                  key={flavor} 
                  className="inline-block px-3 py-1 text-sm rounded-full bg-primary bg-opacity-20 text-primary-light border border-primary-light"
                >
                  {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-300">
              Your collection shows a preference for {flavorHighlights.join(', ')} characteristics.
            </p>
          </>
        ) : (
          <div className="text-center py-2 text-gray-400">
            Not enough data for flavor profile analysis
          </div>
        )}
      </Card>
    </div>
  );
};

export default BarVisualization;