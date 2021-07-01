const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: ID
		name: String
		username: String
		password: String
		createAt: String
	}

	type Item {
		id: String
		quantity: Int
		description: String
		price: Float
		subtotal: Float
	}

	type Tmpbudget {
		id: ID
		client: String!
		address: String
		city: String
		vehicle: String
		brand: String
		plate: String
		items: [Item]
	}

	type Budget {
		id: ID
		branch: Int!
		sequence: Int!
		client: String!
		address: String
		city: String
		vehicle: String
		brand: String
		plate: String
		issueDate: String
		totalAmount: Float
		items: [Item]
	}

	type Budgetnums {
		id: ID
		name: String
		branch: Int
		sequence: Int
	}

	type Token {
		token: String
	}

	input TmpbudgetInput {
		id: ID
		client: String
		address: String
		city: String
		vehicle: String
		brand: String
		plate: String
		items: [ItemInput]
	}

	input BudgetInput {
		id: ID
		branch: Int
		sequence: Int
		client: String
		address: String
		city: String
		vehicle: String
		brand: String
		plate: String
		issueDate: String
		totalAmount: Float
		items: [ItemInput]
	}

	input BudgetnumInput {
		id: ID
		name: String
		branch: Int
		sequence: Int
	}

	input ItemInput {
		id: String
		quantity: Int
		description: String
		price: Float
		subtotal: Float
	}

	input UserInput {
		name: String!
		username: String!
		password: String!
	}

	input LoginInput {
		username: String!
		password: String!
	}

	type Query {
		# User
		getUser(id: ID, username: String): User

		# TmpBudget
		getTmpbudget: [Tmpbudget]

		# Budgetnums
		getBudgetnums: Budgetnums

		# Budget
		getBudget: [Budget]
		getBudgets: [Budget]
	}

	type Mutation {
		# User
		login(input: LoginInput): Token
		register(input: UserInput): User

		# BudgetNums
		incBudgetNum: Budgetnums
		
		# Budget
		insertTmpBudget(input: TmpbudgetInput): Tmpbudget
		updateTmpBudget(input: TmpbudgetInput): Tmpbudget
		emptyTmpBudget: Boolean
		insertBudget(input: BudgetInput): Budget
	}
`;

module.exports = typeDefs;
