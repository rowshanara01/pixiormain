<h1 align="center">PIXOR</h1>

## Live Link: [Pixor](https://pixor.vercel.app)

# Overview

**Pixor** is a simple and elegant image gallery website that allows users to upload, preview, and delete their images. The app is built with a modern frontend stack and is optimized for speed and user experience. Whether you want to organize your artwork or share your snapshots, Pixor makes it easy and efficient.

# Main Features

01. Image Upload Functionality  
02. Image Preview Before Upload  
03. Delete Images from Gallery  

# Tech Stack

- **Framework:** Next.js  
- **Styling:** Tailwind CSS  
- **State Management:** React Context API  
- **Package Manager:** pnpm  
- **Language:** TypeScript  
- **Hosting:** Vercel

# To Run Locally

```bash
# Clone the project
git clone https://github.com/your-username/pixor.git

# Go to the project directory
cd pixor

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# The project will run at http://localhost:3000

# Folder Structure

pixor/
├── .next/                # Next.js build directory
├── .vercel/              # Vercel deployment configs
├── node_modules/         # Installed dependencies
├── public/               # Static files
├── src/                  # Source code
│   ├── app/              # Next.js app directory
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable components
│   ├── context/          # React context files
│   ├── layout/           # Layout components
│   ├── pages/            # Page routes
│   ├── styles/           # Tailwind and global styles
│   ├── ui/               # UI-specific components
│   └── utils/            # Utility functions
├── .env                  # Environment variables
├── .gitignore            # Files to ignore in git
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js config
├── package.json          # Project metadata and scripts
├── pnpm-lock.yaml        # pnpm lock file
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # Project overview and setup (this file)
├── tsconfig.json         # TypeScript configuration

