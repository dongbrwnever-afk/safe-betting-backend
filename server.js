const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let payments = [];

// Create payment request
app.post("/api/pay", (req, res) => {
  const payment = {
    id: Date.now(),
    ...req.body,
    status: "pending"
  };

  payments.push(payment);

  res.json({ success: true, payment });
});

// Get all payments (admin)
app.get("/api/payments", (req, res) => {
  res.json(payments);
});

// Approve payment
app.post("/api/approve/:id", (req, res) => {
  payments = payments.map(p =>
    p.id == req.params.id ? { ...p, status: "approved" } : p
  );

  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
