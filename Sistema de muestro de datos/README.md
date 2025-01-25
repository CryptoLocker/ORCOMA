# Supabase Dashboard

## Overview
This project is a dashboard application that displays data from Supabase, including view counts, top videos, question quality percentages, and a list of video viewers. It also provides functionality to generate and download a PDF report of the dashboard data.

## Components

1. **ViewCount**: Displays the total number of views.
2. **TopVideos**: Shows a list of the top 10 videos by view count.
3. **QuestionPercentages**: Visualizes the percentage of good and bad questions.
4. **ViewerList**: Displays a scrollable list of video viewers.
5. **Skeleton**: Used for loading state placeholders.

## Dependencies

To ensure a perfect execution, make sure you have the following dependencies installed:

1. **Next.js**: The React framework for building the application.
2. **React**: The core library for building user interfaces.
3. **React DOM**: React package for working with the DOM.
4. **TypeScript**: For type-safe JavaScript development.
5. **Tailwind CSS**: For styling the components.
6. **PostCSS**: A tool for transforming CSS with JavaScript.
7. **Autoprefixer**: To parse CSS and add vendor prefixes to CSS rules.
8. **@supabase/supabase-js**: To interact with the Supabase backend.
9. **puppeteer**: For generating PDF reports.
10. **@radix-ui/react-progress**: Used for the progress bar in QuestionPercentages.
11. **@radix-ui/react-scroll-area**: Used for the scrollable area in ViewerList.
12. **@radix-ui/react-slot**: Used for component composition.
13. **@radix-ui/react-label**: Used for accessible label components.
14. **clsx**: A utility for constructing className strings conditionally.
15. **tailwind-merge**: For merging Tailwind CSS classes.
16. **class-variance-authority**: For creating variant classes.
17. **lucide-react**: For including Lucide icons.
18. **@vercel/analytics**: For adding analytics to your Next.js app.

### Installation

You can install all necessary dependencies with the following commands:

\`\`\`bash
npm install next react react-dom @supabase/supabase-js tailwindcss postcss autoprefixer @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-slot @radix-ui/react-label clsx tailwind-merge class-variance-authority lucide-react puppeteer @vercel/analytics

npm install --save-dev typescript @types/react @types/node
\`\`\`

After installing these dependencies, make sure to configure Tailwind CSS by running:

\`\`\`bash
npx tailwindcss init -p
\`\`\`

This will create the necessary configuration files for Tailwind CSS.

## Setup Instructions

1. Clone the repository:

