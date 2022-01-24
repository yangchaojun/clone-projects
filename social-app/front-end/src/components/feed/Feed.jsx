import React, { useState, useEffect, useContext } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/api/post/profile/' + username)
        : await axios.get('/api/post/timeline/' + user._id)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }
    fetchPosts()
  }, [username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}
