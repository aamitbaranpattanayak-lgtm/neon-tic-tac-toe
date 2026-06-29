# 🎮 Neon Tic-Tac-Toe

A futuristic cyberpunk-themed Tic-Tac-Toe game built using **HTML, CSS, Tailwind CSS, and JavaScript**. The project features multiple game modes, responsive design, smooth animations, and an unbeatable AI powered by the **Minimax Algorithm**.

---

## 🚀 Live Demo

🔗 [https://your-vercel-link.vercel.app](https://neon-tic-tac-toe-one.vercel.app/)

---

## ✨ Features

- 🎨 Cyberpunk / Neon UI
- 🤖 Two AI Difficulty Levels
  - Easy AI (Random Move Selection)
  - Hard AI (Minimax Algorithm)
- 👥 Play With Friend Mode
- 🏆 Live Scoreboard
- 🎬 Loading Screen Animation
- 💥 Win Popup Animation
- 📱 Responsive Design
- 🔥 Smooth Neon Effects

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6)

---

## 🧠 AI Logic

### Easy AI

The Easy AI selects a move randomly from the available empty cells. Since it does not analyze future game states, it can make mistakes, making it suitable for beginners.

### Hard AI (Minimax Algorithm)

The Hard AI uses the **Minimax Algorithm**, a classical Artificial Intelligence algorithm used in two-player games.

Instead of choosing a random move, the AI:

1. Simulates every possible move.
2. Predicts every possible player response.
3. Evaluates the final board state.
4. Assigns scores:
   - **+10** → AI Wins
   - **0** → Draw
   - **-10** → Player Wins
5. Chooses the move with the highest score.

This allows the AI to always make the optimal move and makes it extremely difficult to defeat.

---

## 📂 Project Structure

```
Neon-Tic-Tac-Toe/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

---

## 🎮 Game Modes

### 🤖 Easy AI

- Random move selection
- Beginner friendly

### 🧠 Hard AI

- Minimax Algorithm
- Recursive game-tree search
- Optimal decision making

### 👥 Friend Mode

- Two players
- Local multiplayer

---

## 🔮 Future Improvements

- Sound Effects
- Background Music
- Multiple Themes
- Online Multiplayer
- Difficulty Levels with Alpha-Beta Pruning
- Game Statistics
- Move History

---

## 👨‍💻 Author

**Aamit Baran Pattanayak**

LinkedIn:
https://www.linkedin.com/in/aamit-baran-pattanayak-2a879931a/

GitHub:
https://github.com/yourusername

---

## 📜 License

This project is created for educational purposes and internship submission.
