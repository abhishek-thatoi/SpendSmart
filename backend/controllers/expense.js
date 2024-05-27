const expenses = require("../models/expenseModel").default;

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  console.log(req.body);

  const debits =  expenses({
    // the new keyword here is used for explicit instantiating          
    title,
    amount,
    category,
    description,
    date
  });

  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (!amount === "number" || amount <= 0) {
      return res.status(400).json({ msg: "number has to be a positive" });
    }
    await debits.save();
    res.status(200).json({ msg: "expense added" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err });
  }
  console.log(debits);
};

exports.getExpenses = async (req, res) => {// do not use paranthesis before exporting a function
                                                 // here getExpense is a function

    const debits = await expenses.find().sort({createdAt:-1});
  try{
    if(!debits)
    return res.status(404).json({msg:"No expenses found"});
    else{
        return res.status(200).json(debits)
    }
  }catch(err){
    res.status(500).json({msg:"Server Error"});
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(params);

  const debit = expenses.findById(id);
  try{
    if(!debit)
    return res.status(404).json({msg:"expense doesnt exist"});
    else{
        await expenses.deleteOne(debit);
        res.status(200).json({message:"expense is deleted"});
    }

  }catch(err){
    res.status(500).json({msg:"Server Error"});
  }
};
