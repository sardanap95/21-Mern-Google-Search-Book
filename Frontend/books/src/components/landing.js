import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchText, getSearchedBook, getDefaultBooks } from "../store/action";
import BookCard from "./bookCard";

export class Landing extends Component {
  onChange = (e) => {
    this.props.setSearchText(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.getSearchedBook(this.props.searchText);
  };
  componentDidMount() {
    this.props.getDefaultBooks("Artificial Intillegence.");
  }
  render() {
    const { searchedBooks } = this.props;
    return (
      <div className="container-fluid bg-dark p-5 main-container">
        <div className="row justify-content-center">
          <h1 className="mb-3 text-light">Search for a books.</h1>
        </div>
        <div className="row justify-content-center">
          <form id="searchForm" onSubmit={this.onSubmit} className="w-50">
            <div className="input-group bg-light rounded">
              <input
                type="text"
                className="form-control input-height bg-light"
                placeholder="Name, author, genere..."
                onChange={this.onChange}
              />
              <div className="input-group-append w-35" id="button-addon4">
                <button className="btn" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center mt-2">
          {searchedBooks.length > 0 && (
            <div>
              <div className="col-12">
                <p class="text-light">{searchedBooks.length} books found.</p>
              </div>
            </div>
          )}
        </div>
        <div className="row overflow-auto x">
          {searchedBooks &&
            searchedBooks.map((book) => {
              return (
                <div className="col-4">
                  <BookCard book={book} key={book.id} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchText: state.books.searchText,
  searchedBooks: state.books.searchedBooks,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (searchText) => {
    dispatch(setSearchText(searchText));
  },
  getSearchedBook: (searchText) => {
    dispatch(getSearchedBook(searchText));
  },
  getDefaultBooks: (searchText) => {
    dispatch(getDefaultBooks(searchText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);