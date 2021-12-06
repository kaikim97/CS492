const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getReservations: [Reservation]
  }

  type Mutation {
    createReservation(
      title: String
      date: String
      time: String
      seats: [String]
    ): Reservation
  }

  type Reservation {
    birth: String
    phone: String
    password: String
    title: String
    date: String
    time: String
    seats: [String]
    price: Int
  }

  type Subscription {
    reservationCreated: Reservation
  }
`;

module.exports = typeDefs;
