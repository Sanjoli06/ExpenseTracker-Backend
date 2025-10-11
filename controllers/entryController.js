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


// ✅ @desc    Delete entry by ID
// @route   DELETE /api/entries/:id
// @access  Private
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    await entry.deleteOne();

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update an existing entry
// @route   PUT /api/entries/:id
// @access  Private
// ✅ UPDATE ENTRY
export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, amount, date, category, paidVia, notes } = req.body;

    const entry = await Entry.findOne({ _id: id, user: req.user._id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    entry.type = type || entry.type;
    entry.name = name || entry.name;
    entry.amount = amount || entry.amount;
    entry.date = date || entry.date;
    entry.category = category || entry.category;
    entry.paidVia = paidVia || entry.paidVia;
    entry.notes = notes || entry.notes;

    const updated = await entry.save();
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

