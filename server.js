const path = require("path");
const express = require("express");

const {
  AppError,
  asyncHandler,
  errorHandler
} = require("express-error-kit-siri");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static("public"));

const users = [
  { id: 1, name: "Siri" },
  { id: 2, name: "Alex" }
];

// Successful response or custom 404 error
app.get("/users/:id", asyncHandler(async (req, res) => {
  const user = users.find(
    u => u.id === Number(req.params.id)
  );

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  res.json({ success: true, user });
}));

// Unexpected server error
app.get("/server-error", asyncHandler(async () => {
  throw new Error("Demonstration server error");
}));

// Error-handling middleware from your NPM package
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
