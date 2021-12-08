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

    deleteReservation(_id: ID): Reservation
  }

  type Reservation {
    _id: ID
    birth: String
    phone: String
    password: String
    title: String
    date: String
    time: String
    seats: [String]
    price: Int
  }

  type Update {
    type: String
    info: Reservation
  }

  type Subscription {
    reservationUpdated: Update
  }
`;

module.exports = typeDefs;
