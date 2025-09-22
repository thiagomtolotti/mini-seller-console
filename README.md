# Mini Seller Console (React + Tailwind)

**Technical Assessment – CoverPin**

> This project is a technical assessment for CoverPin and should **not** be used for commercial purposes.

## Overview

A lightweight frontend console to manage Leads and convert them into Opportunities. Built with **React (Vite)** and **Tailwind CSS**, using a local JSON file as the data source.

The live version is avaliable at [mini-seller-console.thiagotolotti.com](https://mini-seller-console.thiagotolotti.com/).

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS

## Features

- List of leads
  - Load leads from a local JSON file
  - Loading state (UI)
  - Empty state (UI)
  - Error state (UI)
  - Filter leads by search (name, company) and status
  - Sort leads by score
  - Edit lead details (in memory)
  - Convert leads to opportunities (in memory)
  - Persists filters and sorting in local storage
- List of opportunities
  - Load opportunities from a local JSON file
  - Loading state (UI)
  - Empty state (UI)
  - Error state (UI)
- Responsive UI
- Continuous deployment (CD) to Amazon S3
- Global setting for simulating errors in \'requests\'

## Running the Project

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open http://localhost:5173 in your browser.
