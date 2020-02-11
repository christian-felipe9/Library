import React, { Component } from "react";
import { graphql } from "react-apollo";
import * as compose from 'lodash.flowright';

//GraphQL Queries
import { getBooksQuery, getAuthorsQuery, addBookMutation } from "../queries/queries";

import {
  Button,
  FormControl,
  TextField,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem
} from "@material-ui/core";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors = () => {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <MenuItem>Loading Authirs...</MenuItem>;
    } else {
      return data.authors.map(author => {
        return (
          <MenuItem key={author.id} value={author.id}>
            {author.name}
          </MenuItem>
        );
      });
    }
  }

  handleChangeAuthor = (event) => {
    this.setState({ authorId: event.target.value });
  }

  handleChangeBook = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeGenre = (event) => {
    this.setState({ genre: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.addBookMutation({
      variables:{
        name: this.state.name,
        genre: this.state.genre,
        authorId:this.state.authorId
      },
      refetchQueries:[{query: getBooksQuery}]
    })
  }

  render() {
    // console.log(this.state.name);
    // console.log(this.state.genre);
    // console.log(this.state.authorId);
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <TextField
            id="outlined-basic"
            label="Book Name"
            variant="outlined"
            onChange={this.handleChangeBook.bind(this)}
          />
        </div>
        <br />
        <div className="field">
          <TextField
            id="outlined-basic2"
            label="Genre"
            variant="outlined"
            onChange={this.handleChangeGenre.bind(this)}
          />
        </div>
        <br />
        <div className="field">
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Author</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.authorId}
              onChange={this.handleChangeAuthor.bind(this)}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {this.displayAuthors()}
            </Select>
            <FormHelperText>Select an Author</FormHelperText>
          </FormControl>
        </div>
        <br />
        <Button type="submit" variant="contained" color="primary">
          +
        </Button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"}),
)(AddBook);
