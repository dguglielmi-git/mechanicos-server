const budget = require('../controllers/budget');
const userController = require('../controllers/user');
const tmpBudget = require('../controllers/tmpbudget');


const resolvers = {
	Query: {
		getUser: 		(_, { id, username }) 	=> userController.getUser(id, username),
		getTmpbudget: 		(_,) 			=> tmpBudget.getTmpbudget(),
		getBudget: 		(_,) 			=> budget.getBudget(),
		getBudget: 		(_,) 			=> budget.getBudgets(),
		getBudgetnums: 		(_,) 			=> budget.getBudgetnums(),
	},
	Mutation: {
		login: 			(_, { input }) 		=> userController.login(input),
		register: 		(_, { input }) 		=> userController.register(input),
		insertTmpBudget: 	(_, { input }) 		=> tmpBudget.insertTmpBudget(input),
		insertBudget: 		(_, { input }) 		=> budget.insertBudget(input),
		updateTmpBudget: 	(_, { input }) 		=> tmpBudget.updateTmpBudget(input),
		emptyTmpBudget: 	(_,) 			=> tmpBudget.emptyTmpBudget(),
		incBudgetNum: 		(_,) 			=> budget.incBudgetNum(),
	},
};

module.exports = resolvers;
