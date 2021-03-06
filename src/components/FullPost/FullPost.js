import React, { Component } from 'react'
import axios from 'axios'

import './FullPost.css'

class FullPost extends Component {
  state = {
    post: null,
  }

  componentDidUpdate() {
    if (this.props.postId) {
      if (!this.state.post || this.state.post.id !== this.props.postId) {
        axios
          .get(
            `https://jsonplaceholder.typicode.com/posts/${this.props.postId}`
          )
          .then(res => {
            this.setState({ post: res.data })
          })
      }
    }
  }

  deletePostHandler = () => {
    axios
      .delete(`/posts/${this.props.postId}`)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>
    if (this.props.postId) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>
    }
    if (this.state.post) {
      post = (
        <div className="FullPost">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      )
    }

    return post
  }
}

export default FullPost
