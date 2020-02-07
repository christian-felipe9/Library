import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { Button, FormControl, TextField, Select, FormHelperText, InputLabel, MenuItem } from "@material-ui/core";

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { author: 0 };
  }

  displayAuthors() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Books...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  handleChange(event) {
    this.setState({ author: event.target.value });
  };

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <TextField id="outlined-basic" label="Book Name" variant="outlined" />
        </div>
        <br />
        <div className="field">
          <TextField id="outlined-basic2" label="Genre" variant="outlined" />
        </div>
        <br />
        <div className="field">
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Author</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.author}
              onClick={this.handleChange.bind(this)}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Select an Author</FormHelperText>
          </FormControl>
        </div>
        <br />
        <Button variant="contained" color="primary">
          +
        </Button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
