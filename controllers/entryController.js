import Entry from "../models/Entry.js";

// @desc    Create new entry (income or expense)
// @route   POST /api/entries
// @access  Private
export const createEntry = async (req, res) => {
  try {
    const { type, title, amount, category, date, notes, paidVia } = req.body;

    if (!type || !title || !amount || !category || !date) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const entry = await Entry.create({
      type,
      title,
      amount,
      category,
      date,
      notes,
      paidVia,
      userId: req.user.id,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all entries for logged-in user
// @route   GET /api/entries
// @access  Private
export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
