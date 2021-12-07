const Reservation = require("../models/reservation");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getReservations: () => {
      console.log("Reservation: ", Reservation);
      return Reservation.find()
        .then((reservation) => {
          return reservation;
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  Subscription: {
    reservationUpdated: {
      subscribe: () => pubsub.asyncIterator("NEW_UPDATE"),
    },
  },
  Mutation: {
    createReservation: async (_, args) => {
      return Reservation.create({
        title: args.title,
        time: args.time,
        date: args.date,
        seats: args.seats,
      })
        .then((reservation) => {
          pubsub.publish("NEW_UPDATE", {
            reservationUpdated: {
              type: "create",
              info: reservation,
            },
          });
          return reservation;
        })
        .catch((err) => {
          throw err;
        });
    },
    deleteReservation: async (_, id) => {
      return Reservation.findByIdAndDelete(id)
        .then((reservation) => {
          pubsub.publish("NEW_UPDATE", {
            reservationUpdated: {
              type: "delete",
              info: reservation,
            },
          });
          return reservation;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};

module.exports = resolvers;
