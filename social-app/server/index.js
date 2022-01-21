const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const helmet = require('helmet')
const morgan = require('morgan')

main()
  .then(() => console.log('连接成功'))
  .catch((err) => console.log('连接失败', err))

async function main() {
  await mongoose.connect('mongodb://120.24.209.140:27017/socialapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
// morgan
// helmet

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)

app.use('/', (req, res) => {
  res.end('<h1>hello world</h1>')
})

app.listen(8080, () => {
  console.log('Backend server is running!')
})
