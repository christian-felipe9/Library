import React, { Component } from "react";
import { graphql } from "react-apollo";

//GraphQL Queries
import { getBooksQuery } from "../queries/queries";

//Components
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  handleClickButton(id){
    this.setState({ selected: id });
  }

  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={() => {
              this.handleClickButton( book.id );
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    let selected = this.state.selected;
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
