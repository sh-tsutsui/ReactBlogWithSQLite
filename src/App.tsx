import React, { ErrorInfo, ReactNode } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Home, PenTool, BookOpen } from 'lucide-react'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import CreatePost from './components/CreatePost'

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <BookOpen className="h-8 w-8 text-indigo-600" />
                    <span className="ml-2 text-xl font-bold text-gray-800">React SQLite Blog</span>
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    <Home className="inline-block mr-1" size={18} />
                    Home
                  </Link>
                  <Link to="/create" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    <PenTool className="inline-block mr-1" size={18} />
                    Create Post
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App