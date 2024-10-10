import initSqlJs from 'sql.js'

let db: any = null

export const initDb = async () => {
  if (db) return

  try {
    console.log('Initializing SQL.js...')
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    })
    console.log('SQL.js initialized successfully')

    const savedDb = localStorage.getItem('blogDb')
    if (savedDb) {
      console.log('Loading existing database from localStorage')
      try {
        const arrayData = JSON.parse(savedDb)
        db = new SQL.Database(new Uint8Array(arrayData))
        console.log('Existing database loaded successfully')
      } catch (parseError) {
        console.error('Error parsing saved database:', parseError)
        localStorage.removeItem('blogDb')
        db = new SQL.Database()
      }
    } else {
      console.log('Creating new database')
      db = new SQL.Database()
    }

    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Database schema initialized')

  } catch (error) {
    console.error('Failed to initialize the database:', error)
    throw error // Re-throw the error to be caught by the components
  }
}

export const saveDb = () => {
  if (db) {
    try {
      const data = db.export()
      const arr = new Uint8Array(data)
      localStorage.setItem('blogDb', JSON.stringify(Array.from(arr)))
      console.log('Database saved to localStorage')
    } catch (error) {
      console.error('Error saving database:', error)
    }
  }
}

export const getAllPosts = () => {
  if (!db) {
    console.error('Database not initialized')
    return []
  }
  try {
    const result = db.exec('SELECT * FROM posts ORDER BY created_at DESC')
    return result[0]?.values.map((row: any) => ({
      id: row[0],
      title: row[1],
      content: row[2],
      created_at: row[3]
    })) || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const getPostById = (id: number) => {
  if (!db) {
    console.error('Database not initialized')
    return null
  }
  try {
    const result = db.exec('SELECT * FROM posts WHERE id = ?', [id])
    const row = result[0]?.values[0]
    return row ? {
      id: row[0],
      title: row[1],
      content: row[2],
      created_at: row[3]
    } : null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export const createPost = (title: string, content: string) => {
  if (!db) {
    console.error('Database not initialized')
    return
  }
  try {
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content])
    saveDb()
    console.log('Post created successfully')
  } catch (error) {
    console.error('Error creating post:', error)
  }
}