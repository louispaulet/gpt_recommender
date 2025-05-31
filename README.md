# GPT YouTube Channel Recommender

A React + Vite web application that leverages OpenAI's GPT-4.1-nano model to recommend new YouTube channels based on your current subscriptions. Input your OpenAI API key and a list of your subscribed channels to receive personalized channel recommendations.

## Features

- Input and validate your OpenAI API key directly in the app.
- Paste your current YouTube channel subscriptions (names and URLs).
- Specify the number of new channel recommendations you want.
- Get AI-generated YouTube channel recommendations in JSON format.
- View recommendations with live URL status checks (valid, not found, etc.).
- Toggle display of duplicate recommendations.
- Simple and clean UI built with React and TailwindCSS.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd gpt_recommender/gpt_reco_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. On the homepage, enter your OpenAI API key in the provided input field and click "Check API Key" to validate it.
2. Paste your current YouTube channel subscriptions (names and URLs) into the text area.
3. Specify how many new channel recommendations you want.
4. Click "Get Recommendations" to fetch AI-generated YouTube channel suggestions.
5. View the list of recommended channels with status indicators and links.

## Technologies Used

- React 19
- Vite
- TailwindCSS
- OpenAI JavaScript SDK
- React Router DOM
- Zod for schema validation

## Notes

- You need a valid OpenAI API key to use this app.
- The app uses a CORS proxy to check the status of YouTube channel URLs.
- Recommendations are generated using the GPT-4.1-nano model.

## License

This project does not specify a license. Please contact the author for usage rights.
