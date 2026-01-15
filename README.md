# 📝 TOEIC English Quiz

A modern, responsive quiz application for practicing TOEIC English listening comprehension skills. Built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Random Question Selection**: 13 questions randomly selected from a large question bank each quiz attempt
- **Interactive Quiz Interface**: Clean, user-friendly UI with progress tracking
- **Answer Review**: See your final score and review all answers with correct/incorrect highlighting
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 18** - UI library with functional components and hooks
- **Vite 6** - Next-generation frontend build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing with Autoprefixer

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-toeic
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |

## 📁 Project Structure

```
quiz-toeic/
├── public/
│   └── quiz.json          # Quiz questions data
├── src/
│   ├── components/        # React components
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🎮 How to Play

1. Click **"Start Quiz"** to begin
2. Read each question and select your answer
3. Navigate through all 13 questions
4. Submit your answers to see your score
5. Review your answers with correct answers highlighted
6. Click **"Try Again"** to start a new quiz with different questions

## 📄 License

This project is public and for personal/educational use.
# quiz-toeic
