import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottleRecommendation } from '../../types/Bottle';
import BottleCard from './BottleCard';

type RecommendationListProps = {
  recommendations: BottleRecommendation[];
};

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-6 text-gray-400">
        No recommendations available yet.
      </div>
    );
  }

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {recommendations.map((recommendation, index) => (
        <motion.div
          key={recommendation.bottle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <BottleCard 
            recommendation={recommendation}
            isExpanded={expandedId === recommendation.bottle.id}
            onToggleExpand={() => handleToggleExpand(recommendation.bottle.id)}
            matchScore={recommendation.matchScore}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RecommendationList;