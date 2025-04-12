import app from './app.js'; // ✅ Correct - this has the Express app and routes setup

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

