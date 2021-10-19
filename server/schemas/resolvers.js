const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all users
        // users: async () => {
        //     return User.find()
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts');
        // },
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts');
        // },
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({_id: context.user._id})
            .select('-__v -password')

            return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
        // books: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return Book.find(params).sort({ createdAt: -1});
        // },
        // book: async (parent, { title }) => {
        //     return Book.findOne({ title });
        // }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                 const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: args.input} },
                    { new: true}
                );
                return updatedUser
            }
            throw new AuthenticationError('Not logged in!')
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedBooks: { bookId: args.bookId} } },
                    { new: true }
                );
                return updatedUser
            }
            throw new AuthenticationError('Not logged in!')
        }
    }
};

module.exports = resolvers;