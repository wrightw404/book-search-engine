const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
     if(context.user) {
        const userInfo = await User.findOne({}).select('-__v -password').populate('books')
        return userInfo;
     }
     throw new AuthenticationError('not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
   

    //save book
    saveBook: async (parent, args, context) =>{
        if(context.User){
            const updateUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input }},
                { new: true }
            )
            return updateUser;
        }
        throw new AuthenticationError('not logged in');
    },


    removeBook: async (parent, args, context) => {
     if(context.user){
        const updateUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
        )
        return updateUser;
     }
     throw new AuthenticationError('not logged in');
    }
},


};

module.exports = resolvers;