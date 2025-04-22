import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import BobAvatar from '../components/bob/BobAvatar';
import BobDialog from '../components/bob/BobDialog';
import BottleList from '../components/bar/BottleList';
import RecommendationList from '../components/recommendations/RecommendationList';
import { useBar } from '../hooks/useBar';
import { useRecommendations } from '../hooks/useRecommendations';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';

export default function Home() {
 const [username, setUsername] = useState<string>('');
 const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
 const { barData, isLoading: isBarLoading, fetchBar } = useBar();
 const { recommendations, isLoading: isRecommendationsLoading, getRecommendations } = useRecommendations();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!username) return;
   
   await fetchBar(username);
   setIsAnalyzing(true);
   
   // Simulate Bob "thinking" for a moment
   setTimeout(async () => {
     await getRecommendations(username);
     setIsAnalyzing(false);
   }, 2500);
 };

 return (
   <Layout>
     <Head>
       <title>Bob - Your AI Whisky Butler</title>
       <meta name="description" content="AI-powered whisky recommendations from Bob, your virtual whisky expert" />
       <link rel="icon" href="/favicon.ico" />
     </Head>

     <main className="container mx-auto px-4 py-8">
       <motion.div 
         className="text-center mb-12"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
       >
         <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
           Meet Bob
         </h1>
         <p className="text-xl md:text-2xl text-gray-300 mb-8">
           Your AI Whisky Butler in the BAXUS Ecosystem
         </p>
         
         <div className="flex justify-center mb-8">
           <BobAvatar isThinking={isAnalyzing} />
         </div>
         
         <BobDialog
           text={
             !barData 
               ? "Hello! I'm Bob, your AI whisky butler. Enter your BAXUS username, and I'll analyze your collection to recommend the perfect bottles for your wishlist."
               : barData.userNotFound
               ? `I couldn't find a BAXUS account with the username "${barData.user}". Please check the username and try again.`
               : barData.bottles.length === 0
               ? `I found your BAXUS account, but you don't have any bottles in your collection yet. Add some bottles to get personalized recommendations!`
               : isAnalyzing 
               ? "Analyzing your collection... identifying patterns in your preferences..." 
               : recommendations.length > 0 
               ? "Based on your collection, I've curated some recommendations I think you'll love. These selections complement your existing bottles and match your taste profile."
               : "I've analyzed your collection, but I need more data to make proper recommendations. Try adding more bottles to your bar!"
           }
           isTyping={isAnalyzing}
         />
       </motion.div>

       {!barData ? (
         <motion.div 
           className="max-w-md mx-auto glass-panel p-6"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.3 }}
         >
           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                 BAXUS Username
               </label>
               <input
                 type="text"
                 id="username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full bg-secondary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:outline-none"
                 placeholder="Enter your username"
               />
             </div>
             <Button type="submit" disabled={isBarLoading}>
               {isBarLoading ? <Loading size="sm" /> : "Analyze My Collection"}
             </Button>
           </form>
         </motion.div>
       ) : (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <motion.div
             className="glass-panel p-6"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
           >
             <h2 className="text-2xl font-serif font-semibold mb-4 border-b border-primary-light pb-2">
               Your Collection
             </h2>
             
             {barData.userNotFound ? (
               <div className="text-center p-6">
                 <h2 className="text-2xl font-serif font-semibold mb-4 text-primary-light">
                   User Not Found
                 </h2>
                 <p className="text-gray-300">
                   No bar data found for username: {barData.user}
                 </p>
                 <p className="mt-2 text-gray-400">
                   Try entering a different username or create a new account on BAXUS.
                 </p>
               </div>
             ) : barData.bottles.length === 0 ? (
               <div className="text-center p-6">
                 <h2 className="text-2xl font-serif font-semibold mb-4 text-primary-light">
                   Empty Collection
                 </h2>
                 <p className="text-gray-300">
                   This user doesn't have any bottles in their collection yet.
                 </p>
               </div>
             ) : (
               <BottleList bottles={barData.bottles || []} />
             )}
           </motion.div>

           <motion.div
             className="glass-panel p-6"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.7 }}
           >
             <h2 className="text-2xl font-serif font-semibold mb-4 border-b border-accent-light pb-2">
               Bob's Recommendations
             </h2>
             {barData.userNotFound || barData.bottles.length === 0 ? (
               <div className="text-center p-6">
                 <p className="text-gray-300">
                   Add bottles to your collection to see personalized recommendations.
                 </p>
               </div>
             ) : isAnalyzing || isRecommendationsLoading ? (
               <div className="flex flex-col items-center justify-center p-12">
                 <Loading size="lg" />
                 <p className="mt-4 text-gray-300">Bob is analyzing your taste profile...</p>
               </div>
             ) : recommendations.length > 0 ? (
               <RecommendationList recommendations={recommendations} />
             ) : (
               <p className="text-center p-8 text-gray-300">
                 Add more bottles to your collection for personalized recommendations.
               </p>
             )}
           </motion.div>
         </div>
       )}
     </main>
   </Layout>
 );
}