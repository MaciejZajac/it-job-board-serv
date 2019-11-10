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

    type UserInputData {
        email: String!
        name: String!
        password: String!
    }


    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        mutation: RootMutation
    }
`);
