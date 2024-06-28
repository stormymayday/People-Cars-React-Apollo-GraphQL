const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const people = [
    { id: "1", firstName: "Bill", lastName: "Gates" },
    { id: "2", firstName: "Steve", lastName: "Jobs" },
    { id: "3", firstName: "Linux", lastName: "Torvalds" },
];

const cars = [
    {
        id: "1",
        year: "2019",
        make: "Toyota",
        model: "Corolla",
        price: 40000,
        personId: "1",
    },
    {
        id: "2",
        year: "2018",
        make: "Lexus",
        model: "LX 600",
        price: 13000,
        personId: "1",
    },
    {
        id: "3",
        year: "2017",
        make: "Honda",
        model: "Civic",
        price: 20000,
        personId: "1",
    },
    {
        id: "4",
        year: "2019",
        make: "Acura",
        model: "MDX",
        price: 60000,
        personId: "2",
    },
    {
        id: "5",
        year: "2018",
        make: "Ford",
        model: "Focus",
        price: 35000,
        personId: "2",
    },
    {
        id: "6",
        year: "2017",
        make: "Honda",
        model: "Pilot",
        price: 45000,
        personId: "2",
    },
    {
        id: "7",
        year: "2019",
        make: "Volkswagen",
        model: "Golf",
        price: 40000,
        personId: "3",
    },
    {
        id: "8",
        year: "2018",
        make: "Kia",
        model: "Sorento",
        price: 45000,
        personId: "3",
    },
    {
        id: "9",
        year: "2017",
        make: "Volvo",
        model: "XC40",
        price: 55000,
        personId: "3",
    },
];

const typeDefs = gql`
    type Person {
        id: ID!
        firstName: String!
        lastName: String!
        cars: [Car]
    }

    type Car {
        id: ID!
        year: Int!
        make: String!
        model: String!
        price: Float!
        personId: String!
    }

    type Query {
        people: [Person]
        cars: [Car]
        person(id: ID!): Person
        car(id: ID!): Car
    }

    type Mutation {
        addPerson(firstName: String!, lastName: String!): Person
        updatePerson(id: ID!, firstName: String, lastName: String): Person
        deletePerson(id: ID!): Person
        addCar(
            year: Int!
            make: String!
            model: String!
            price: Float!
            personId: String!
        ): Car
        updateCar(
            id: ID!
            year: Int
            make: String
            model: String
            price: Float
            personId: String
        ): Car
        deleteCar(id: ID!): Car
    }
`;

const resolvers = {
    Query: {
        people: () => people,
        cars: () => cars,
        person: (_, { id }) => people.find((person) => person.id === id),
        car: (_, { id }) => cars.find((car) => car.id === id),
    },
    Mutation: {
        addPerson: (_, { firstName, lastName }) => {
            const person = { id: `${people.length + 1}`, firstName, lastName };
            people.push(person);
            return person;
        },
        updatePerson: (_, { id, firstName, lastName }) => {
            const person = people.find((person) => person.id === id);
            if (firstName) person.firstName = firstName;
            if (lastName) person.lastName = lastName;
            return person;
        },
        deletePerson: (_, { id }) => {
            const personIndex = people.findIndex((person) => person.id === id);
            if (personIndex !== -1) {
                const [deletedPerson] = people.splice(personIndex, 1);
                return deletedPerson;
            }
        },
        addCar: (_, { year, make, model, price, personId }) => {
            const car = {
                id: `${cars.length + 1}`,
                year,
                make,
                model,
                price,
                personId,
            };
            cars.push(car);
            return car;
        },
        updateCar: (_, { id, year, make, model, price, personId }) => {
            const car = cars.find((car) => car.id === id);
            if (year) car.year = year;
            if (make) car.make = make;
            if (model) car.model = model;
            if (price) car.price = price;
            if (personId) car.personId = personId;
            return car;
        },
        deleteCar: (_, { id }) => {
            const carIndex = cars.findIndex((car) => car.id === id);
            if (carIndex !== -1) {
                const [deletedCar] = cars.splice(carIndex, 1);
                return deletedCar;
            }
        },
    },
    Person: {
        cars: (person) => cars.filter((car) => car.personId === person.id),
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
    const app = express();

    app.use(cors({ origin: "http://localhost:5173" }));

    const server = new ApolloServer({ schema });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(
            `Server is running at http://localhost:4000${server.graphqlPath}`
        )
    );
}

startServer();
