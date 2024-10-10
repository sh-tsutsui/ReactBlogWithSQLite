import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initDb, getPostById } from '../utils/db'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      await initDb()
      if (id) {
        const fetchedPost = await getPostById(parseInt(id, 10))
        setPost(fetchedPost)
      }
    }
    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogPost