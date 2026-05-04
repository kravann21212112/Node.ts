import express from 'express'
import db from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('My name is Kravann yorm Im come from cambodia and Im 22 years old')
})

app.use('/users', userRoutes)
app.use('/products', productRoutes)

const startServer = async () => {
  try {
    await db.getConnection()
    console.log('MySQL Connected...')

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000')
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)
  }
}

startServer()
