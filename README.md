# GPT YouTube Channel Recommender

[![Main Illustration](default_screenshot.png)](default_screenshot.png)

A React + Vite web application that leverages OpenAI's GPT-4.1-nano model to recommend new YouTube channels based on your current subscriptions. Input your OpenAI API key and a list of your subscribed channels to receive personalized channel recommendations.

## Features

- Input and validate your OpenAI API key directly in the app.
- Paste your current YouTube channel subscriptions (names and URLs).
- Specify the number of new channel recommendations you want.
- Get AI-generated YouTube channel recommendations in JSON format.
- View recommendations with live URL status checks (valid, not found, etc.) to ensure links are active. This feature uses a custom backend route to fetch the HTTP status of each recommended channel URL and displays status icons for verified, broken, or uncertain links.
- Use the Criticizer component to get improved and refined YouTube channel recommendations based on your current subscriptions and previous suggestions. This component uses the OpenAI API to critique the initial recommendations and generate a better list, providing reasons for each improved suggestion.
- Toggle display of duplicate recommendations.
- Simple and clean UI built with React and TailwindCSS.

## Project Structure

The repository primarily contains the web application inside the `gpt_reco_app` directory.

- `index.html` – minimal entry page referencing `/src/main.jsx`.
- `src/main.jsx` – mounts the React app and sets up React Router.
- `src/App.jsx` – defines routes for the homepage, About page, and policies.
- `src/components/` – key components:
  - `Homepage.jsx` – stores the OpenAI API key.
  - `YouTubeRecommender.jsx` – queries OpenAI for channel suggestions.
  - `YouTubeCriticizer.jsx` – asks OpenAI to refine the first list.
  - `YouTubeRecommendationList.jsx` – lists results and checks each URL with a Cloudflare worker.

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

### Environment Variable

The app checks recommended channel links using a small worker service.
You can override the default worker URL by setting `VITE_CHANNEL_CHECK_URL`
before running the dev server or building the project:

```bash
VITE_CHANNEL_CHECK_URL="https://example.com/?url=" npm run dev
```

If not set, it defaults to `https://head-checker.louispaulet13.workers.dev/?url=`.

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
## Tailwind CSS with PostCSS

This project uses Tailwind CSS as a PostCSS plugin. The plugin is loaded in `postcss.config.js` and the base, components, and utilities layers are imported in `src/index.css`.

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## Notes

- You need a valid OpenAI API key to use this app.
- The app uses a custom backend route to check the status of YouTube channel URLs, providing real-time validation of recommendation links. Status icons indicate verified links (HTTP 200), broken links (HTTP 404), and other HTTP statuses.
- The Criticizer component leverages the OpenAI API to generate improved recommendations by critiquing and refining the initial suggestions. It fetches improved recommendations in JSON format, including channel names, URLs, and brief reasons for each recommendation.
- Recommendations are generated using the GPT-4.1-nano model.

## License

This project is licensed under the [MIT License](LICENSE).
