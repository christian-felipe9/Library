import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";

import BookList from "./components/BookList";

//Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Library</h1>
          <BookList />
          <Button variant="contained" color="primary">Olá Mundo</Button>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
