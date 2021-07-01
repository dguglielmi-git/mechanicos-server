const Tmpbudget = require('../models/tmpbudget');

async function getTmpbudget() {
    const tmbbudget = await Tmpbudget.find();
  
    const budgetList = [];
    for await (const data of tmbbudget) {
        budgetList.push(data);
    }

    return budgetList;
}

async function emptyTmpBudget() {
    
    try {
        await Tmpbudget.deleteMany();
        return true;
    } catch (error) {
        console.log(error);
        return false;        
    }    
}

async function insertTmpBudget(input) {
    
    await Tmpbudget.deleteMany();

    try {
        const budget = new Tmpbudget(input);
        budget.save();
        return budget;
        
	} catch (error) {
		console.log(error);
	}
	return null;
}

async function updateTmpBudget(input) {
    try {
        await Tmpbudget.findByIdAndUpdate(input.id, { items: input.items });
        return {
            status: true,
            description: "Budget Updated",
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTmpbudget,
    insertTmpBudget,
    updateTmpBudget,
    emptyTmpBudget,
};