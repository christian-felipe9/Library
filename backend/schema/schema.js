const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/Book');
const Author = require('../models/Author');

const { GraphQLObjectType,  GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID, GraphQLNonNull} = graphql;

////dummy data
// var books = [
//     { name:'Name of the Wind', genre: 'Fantasy', id:'1', authorId: '1' },
//     { name:'The Final Empire', genre: 'Fantasy', id:'2', authorId: '2' },
//     { name:'The Long Earth', genre: 'Sci-Fi', id:'3', authorId: '3' },
//     { name:'The Hero of Ages', genre: 'Fantasy', id:'4', authorId: '2' },
//     { name:'The Colour of Magic', genre: 'Fantasy', id:'5', authorId: '3' },
//     { name:'The Light Fantastic', genre: 'Fantasy', id:'6', authorId: '3' }
// ];

// var authors = [
//     { name:'Patrick Rothfuss', age: 44, id:'1' },
//     { name:'Brandon Sanderson', age: 42, id:'2' },
//     { name:'Terry Pratchett', age: 66, id:'3' }
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Book Type',
    fields: () => ({
        id: {
            description: 'Id of Book',
            type: GraphQLID
        },
        name: {
            description: 'Name of the Book',
            type: GraphQLString
        },
        genre: {
            description: 'Genre of the Book',
            type: GraphQLString
        },
        author: { 
            description: 'Author relationship with Books',
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Author Type',
    fields: () => ({
        id: {
            description: 'Id of the Author',
            type: GraphQLID
        },
        name: {
            description: 'Name of the Author',
            type: GraphQLString
        },
        age: {
            description: 'Age of the Author',
            type: GraphQLInt
        },
        books: {
            description: 'List of Books written by Author',
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, { authorId: parent.id })
                return Book.find({authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Query Data',
    fields:{
        book:{
            description: 'Query Book by ID',
            type: BookType,
            args: {
                id: { 
                    description: 'Id of Book you want to Query',
                    type: GraphQLID
                    }
            },
            resolve(parent, args){
                //code to get data from db / other source
                //return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author:{
            description: 'Query Author by ID',
            type: AuthorType,
            args: {
                id: {
                    description: 'Id of the Author you want to Query',
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                //code to get data from db / other source
                //return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        books:{
            description: 'Query All Books',
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //code to get data from db / other source
                //return books;
                return Book.find({});
            }
        },
        authors:{
            description: 'Query All Authors',
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //code to get data from db / other source
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Mutation Data',
    fields:{
        addAuthor:{
            description: 'Create new Author in Database',
            type: AuthorType,
            args: {
                name: {
                    description: 'Name of the Author you want to insert in Database',
                    type: new GraphQLNonNull(GraphQLString)
                },
                age:{
                    description: 'Age of the Author you want to insert in Database',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args){
                let Authors = new Author({
                    name: args.name,
                    age: args.age
                });
                return Authors.save();
            }
        },
        addBook:{
            description: 'Create new Book in Database',
            type: BookType,
            args: {
                name: {
                    description: 'Name of the Book you want to insert in Database',
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre:{
                    description: 'Genre of the Book you want to insert in Database',
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId:{
                    description: 'Author ID of the Book',
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
                let Books = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return Books.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})