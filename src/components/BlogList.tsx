import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initDb, getAllPosts } from '../utils/db'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await initDb()
        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('Error initializing database:', err)
        setError('Failed to load posts. Please try refreshing the page.')
      }
    }
    fetchPosts()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Create your first post!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                <Link to={`/post/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogList