# GPT YouTube Channel Recommender

[![Screenshot of the GPT YouTube Channel Recommender interface](default_screenshot.png)](default_screenshot.png)

A React + Vite web application that leverages OpenAI's GPT-4.1-nano model to
recommend new YouTube channels based on your current subscriptions. Input your
OpenAI API key and a list of your subscribed channels to receive personalized
channel recommendations.

## Features

- Input and validate your OpenAI API key directly in the app.
- Paste your current YouTube channel subscriptions (names and URLs).
- Specify the number of new channel recommendations you want.
- Filter recommendations by entering preferred topics or keywords.
- Get AI-generated YouTube channel recommendations in JSON format.
- View recommendations with live URL status checks (valid, not found, etc.) to ensure links are active.
  This feature uses a custom backend route to fetch the HTTP status of each recommended
  channel URL and displays status icons for verified, broken, or uncertain links.
- Use the Criticizer component to get improved and refined YouTube channel recommendations
  based on your current subscriptions and previous suggestions. This component uses the
  OpenAI API to critique the initial recommendations and generate a better list, providing
  reasons for each improved suggestion.
- Toggle display of duplicate recommendations.
- Import a saved YouTube subscriptions HTML file to extract channel names and links as a copyable CSV block.
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
- `public/robots.txt` – allows search engines to crawl the site and points to the sitemap.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/louispaulet/gpt_recommender.git
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

**Note:** This project targets **Node.js 18**, matching the CI workflow.

### Environment Variable

The app checks recommended channel links using a small worker service.
You can override the default worker URL by setting `VITE_CHANNEL_CHECK_URL`
before running the dev server or building the project:

```bash
VITE_CHANNEL_CHECK_URL="https://example.com/?url=" npm run dev
```

If not set, it defaults to `https://head-checker.louispaulet13.workers.dev/?url=`.

## Linting, Building, and Testing

The `gpt_reco_app/package.json` file defines handy scripts for common development tasks.
From within the `gpt_reco_app` directory you can:

- **Lint** the codebase with **ESLint**:

  ```bash
  npm run lint
  ```

- **Build** the project for production using **Vite**:

  ```bash
  npm run build
  ```

- **Run** the test suite powered by **Vitest**:

  ```bash
  npm test
  ```

## Usage

1. On the homepage, enter your OpenAI API key in the provided input field and click "Check API Key" to validate it.
2. Paste your current YouTube channel subscriptions (names and URLs) into the text area.
3. Specify how many new channel recommendations you want.
4. (Optional) Enter your preferred topics or keywords to guide the recommendations.
5. Click "Get Recommendations" to fetch AI-generated YouTube channel suggestions.
6. View the list of recommended channels with status indicators and links.

## Extracting Subscriptions from HTML

Save your YouTube subscriptions page with `Ctrl+S` and either use the "YouTube Page Extraction" page in the app or run the helper script below to pull channel names and URLs:

```bash
python scripts/extract_subs_from_html.py path/to/YouTube.html
```

The script prints each channel name followed by its URL, separated by a tab.

In the web app, the channels are shown as a CSV block with a one-click copy button.


## Technologies Used

- React 19
- Vite
- TailwindCSS
- OpenAI JavaScript SDK
- React Router DOM
- Zod for schema validation
## Tailwind CSS with the Vite plugin

Tailwind CSS is integrated using the official Vite plugin. The plugin is added in
`vite.config.js` and the Tailwind layers are imported in `src/index.css`.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## HTML Metadata

`gpt_reco_app/index.html` defines the meta description, canonical URL and open
graph/Twitter tags used for previews. If the site's domain or screenshot image
changes, update these tags so search engines and social networks display the
correct information.


## Notes

- You need a valid OpenAI API key to use this app.
- The app uses a custom backend route to check the status of YouTube channel URLs,
  providing real-time validation of recommendation links. Status icons indicate
  verified links (HTTP 200), broken links (HTTP 404), and other HTTP statuses.
- The Criticizer component leverages the OpenAI API to generate improved recommendations
  by critiquing and refining the initial suggestions. It fetches improved recommendations
  in JSON format, including channel names, URLs, and brief reasons for each recommendation.
- Recommendations are generated using the GPT-4.1-nano model.

## License

This project is licensed under the [MIT License](LICENSE).
