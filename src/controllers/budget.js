const Budget = require("../models/budget");
const Budgetnum = require("../models/budgetnum");

async function getBudgetnums() {
  const result = await Budgetnum.findOne({ name: "proforma" });
  result.sequence += 1;
  return result;
}

async function incBudgetNum() {
  const { sequence } = await getBudgetnums();

  try {
    const result = await Budgetnum.findOneAndUpdate(
      { name: "proforma" },
      { sequence }
    );
    result.sequence += 1;
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getBudget() {
  const budget = await Budget.find();

  const budgetList = [];
  for await (const data of budget) {
    budgetList.push(data);
  }

  return budgetList;
}

async function insertBudget(input) {
  console.log(input);
  const { branch, sequence } = await getBudgetnums();
  try {
    const budget = new Budget(input);
    budget.branch = branch;
    budget.sequence = sequence;
    budget.save();
    await incBudgetNum();
    return budget;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function getBudgets() {
  const results = await Budget.find();
  return results;
}

module.exports = {
  getBudget,
  insertBudget,
  getBudgetnums,
  incBudgetNum,
  getBudgets,
};
