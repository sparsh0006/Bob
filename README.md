# Bob - Your AI Whisky Butler

Bob is an AI-powered whisky recommendation engine built for the BAXUS ecosystem. It analyzes users' whisky collections and provides personalized bottle recommendations based on taste preferences, collection diversity, and other factors.

![Bob AI Whisky Butler](public/images/bob-avatar.svg)

## Features

- **Personalized Recommendations**: Bob analyzes your whisky collection and recommends bottles that match your taste profile.
- **Collection Visualization**: View your whisky collection with detailed information about each bottle.
- **Taste Profile Analysis**: Get insights into your whisky preferences based on your collection.
- **Interactive UI**: Smooth animations and an intuitive interface powered by Framer Motion.
- **BAXUS Integration**: Seamlessly connects with your BAXUS whisky collection.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI**: Tailwind CSS, Framer Motion, React Spring
- **State Management**: React Query
- **API**: Axios for API requests
- **Styling**: Custom Tailwind theme with glass morphism effects

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bob.git
cd bob
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1. **User Authentication**: Users enter their BAXUS username to access their collection.
2. **Collection Analysis**: Bob analyzes the user's whisky collection to understand preferences.
3. **Recommendation Engine**: Using the analysis, Bob's recommendation engine finds bottles that match the user's taste profile.
4. **Display Results**: Recommendations are displayed in an interactive card deck with detailed explanations.

## Features in Detail

### Collection Analysis

Bob analyzes various aspects of your collection:
- Region distribution
- Distiller preferences
- Whisky types
- Age distribution
- Price ranges
- Flavor profile (sweet, fruity, smoky, peaty, etc.)

### Recommendation Logic

Recommendations are generated based on:
- Similarity to existing bottles
- Complementary flavors to diversify the collection
- Value for money compared to your spending habits
- Trending bottles in the whisky community

### Bob's Personality

Bob has a distinct personality as an AI whisky butler, with:
- Animated avatar with facial expressions
- Typing animation for responses
- Thoughtful analysis of your collection
- Detailed explanations for recommendations

## API Integration

The application integrates with the BAXUS API to fetch user collections:
- Proxy API routes to handle CORS and authentication
- Error handling for user not found scenarios
- Mock data for development environments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [BAXUS](https://baxus.co) for the whisky collection API
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Next.js](https://nextjs.org) for the React framework
- [Vercel](https://vercel.com) for hosting recommendations