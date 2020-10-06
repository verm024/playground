import React from 'react'

const Books = (props) => {
    let books = props.books.map(book => {
        return (
            <div className="books" key={book.id}>
                <div>
                    { book.title}
                </div>
                <div>
                    { book.author }
                </div>
                <button onClick={() => {props.deleteBook(book.id)}}>Delete</button>
            </div>
        )
    })
    return (
        <div>
            { books }
        </div>
    )
}

export default Books