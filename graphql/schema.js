const { buildSchema } = require("graphql");

// type jobOffer {
//     logoUrl: String!
//     jobTitle: String!
//     city: String!,
//     companyName: String!,
//     streetName: String!,
//     creationDate: String!,
//     minPayment: String!,
//     maxPayment: String!,
//     technologies: [String!]
// }

module.exports = buildSchema(`

    type jobOffer {
        _id: ID!
        jobTitle: String!
        companyCity: String!
        companyName: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        jobOffers: [jobOffer!]!

    }

    input UserInputData {
        email: String!
        password: String!
    }

    input UserOfferData {
        jobTitle: String!
        companyCity: String!
        companyName: String!
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
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        resetPassword(email: String!): resetPassword!
        addNewOffer(userInput: UserOfferData): jobOffer!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
