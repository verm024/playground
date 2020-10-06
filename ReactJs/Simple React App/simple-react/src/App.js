import React, { Component } from 'react';
import Books from './components/Books.js'
import AddBook from './components/AddBook.js'

class App extends Component {
  state = {
    books: [
      {
        title: "Hello World",
        author: 'Takehiro',
        id: 1
      },
      {
        title: "Halo dunia",
        author: "Yoshi",
        id: 2
      }
    ]
  }
  addNew = (book) => {
    let books = [...this.state.books, book]
    this.setState({
      books: books
    })
  }
  deleteBook = (id) => {
    let books = this.state.books.filter(book => {
      if(book.id === id){
        return false
      }
      else{
        return true
      }
    })
    this.setState({
      books: books
    })
  }
  render(){
    return (
      <div className="App">
        <Books books={ this.state.books } deleteBook={this.deleteBook} />
        <AddBook addNew={this.addNew} />
      </div>
    );
  }
}

export default App;