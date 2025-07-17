# God of Gambler

A full-stack web application for logging, tracking, and settling payments for poker games. Easily record player buy-ins and cash-outs, and instantly compute who owes whom at the end of the night.

## Features

- 🎲 **Settle Poker Payments:** Enter player buy-ins and cash-outs, and the app calculates the minimal set of payments needed to settle up.
- 🔍 **Search Past Games:** Quickly find and review previous games by player name.
- 📝 **Game History:** All games are stored and can be browsed or searched.
- 💻 **Modern Stack:** React frontend, Express/MongoDB backend, Bootstrap UI.

## Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Jaredee123/God_of_Gambler.git
cd God_of_Gambler
```

#### 2. Setup the backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI:
echo "MONGODB_URI=mongodb://localhost:27017/gog" > .env
npm run dev
```

#### 3. Setup the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:4000](http://localhost:4000).

## Usage

- **Create Game:** Enter the number of players, their names, buy-ins, and cash-outs. The app validates totals and computes settlements.
- **Search Games:** Search by player name to view all games they've participated in.
- **Navigation:** Use the navbar to switch between creating a game and searching games.

## Project Structure

```
God_of_Gambler/
  backend/
    src/
      controllers/
      models/
      routes/
      services/
      app.js
      server.js
    package.json
    .env
  frontend/
    src/
      pages/
      shared/
      App.js
      index.js
      index.css
    public/
      index.html
      favicon.png
      godofgambler_icon.png
    package.json
```

## Customization

- **Favicon:** Replace `frontend/public/favicon.png` with your own icon.
- **Logo:** Replace `frontend/public/godofgambler_icon.png` for the app logo.

---

*Built with ❤️ for poker nights!*