const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type jobOffer {
        logoUrl: String!
        jobTitle: String!
        city: String!,
        companyName: String!,
        streetName: String!,
        creationDate: String!,
        minPayment: String!,
        maxPayment: String!,
        technologies: [String!]
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        jobOffers: [jobOffer!]!

    }

    input UserInputData {
        email: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type resetPassword {
        email: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        resetPassword(email: String!): resetPassword!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
