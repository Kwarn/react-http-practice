import React, { Component } from 'react'
import axios from 'axios'
import Post from '../../components/Post/Post'
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import './Blog.css'

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  }

  componentDidMount() {
    axios
      .get('/posts')
      .then(res => {
        const post = res.data.slice(0, 4)
        const updatedPosts = post.map(post => {
          return { ...post, author: 'Karl' }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: true })
      })
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id })
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something Went Wrong</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        )
      })
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost postId={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog
