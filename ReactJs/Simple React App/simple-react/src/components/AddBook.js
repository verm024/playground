import React, { Component } from 'react'

class AddBook extends Component{
    state = {
        title: '',
        author: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClick = () => {
        this.props.addNew({
            title: this.state.title,
            author: this.state.author,
            id: Math.random()
        })
        this.setState({
            title: "",
            author: "",
        })
    }
    render(){
        return (
            <div>
                <input id="title" placeholder="title" onChange={this.handleChange} value={this.state.title} />
                <input id="author" placeholder="author" onChange={this.handleChange} value={this.state.author} />
                <button onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}

export default AddBook