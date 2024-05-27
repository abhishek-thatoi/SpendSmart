const incomes = require("../models/incomeModel").default;

module.exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body; // destructure
  console.log(req.body);
  // for testing data

  const credits = await incomes({//here we create an instance of income(collection/model) and store our current entry
                                 
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //conditions
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ msg: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ msg: "number has to be positive" });
    }
    await credits.save();
    res.status(200).json({ msg: "credits Statement added" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error!", error: error });
  }

  console.log(credits);
};


module.exports.getIncomes = async (req, res) => {
  try {
    const credits = await incomes.find().sort({ createdAt: -1 });
    res.status(200).json(credits);
    // .sort({ createdAt: -1 }) is used to sort the retrieved documents in descending order based on the createdAt field.
    //  The -1 indicates descending order, which means that the most recently created documents will appear first in the result.
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

module.exports.deleteIncome = async (req, res) => {
  const { id } = req.params;// here params destructures the url and store id
  console.log(params);
  try {
    const income = await incomes.findById(id);
    if (!income) {
      res.status(404).json({ msg: "Income not found" });
    } else {
      await income.deleteOne();
      res.status(200).json({ msg: "Income Deleted" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error!" });
  }

};
