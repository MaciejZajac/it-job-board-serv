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
        experience: String! 
        minPayment: String! 
        maxPayment: String! 
        companyDescription: String! 
        projectDescription: String! 
        companyPage: String! 
        companyAdress: String! 
        creationDate: String!
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
        experience: String! 
        minPayment: String! 
        maxPayment: String! 
        companyDescription: String! 
        projectDescription: String! 
        companyPage: String! 
        companyAdress: String! 
    }


    type AuthData {
        token: String!
        userId: String!
        email: String!
    }

    type resetPassword {
        email: String!
    }
    
    type JobOfferData {
        jobOffers: [jobOffer!]!
        totalOffers: Int!
    }

    type deleteInfo {
        result: Boolean!
    }

    input Filter {
        cityFilter: [String!]
        specializationFilter: [String!]
        techFilter: [String!]
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getOfferList(city: String, spec: String, tech: String): JobOfferData!
        getPrivateOfferList: JobOfferData!
        getUserInfo: User!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        resetPassword(email: String!): resetPassword!
        addNewOffer(userInput: UserOfferData): jobOffer!
        deleteOneOffer(id: ID!): deleteInfo!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
