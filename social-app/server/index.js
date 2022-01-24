const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

main()
  .then(() => console.log('连接成功'))
  .catch((err) => console.log('连接失败', err))

async function main() {
  await mongoose.connect('mongodb://120.24.209.140:27017/socialapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

app.use('/images', express.static(path.join(__dirname, 'public/images')))

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
// morgan
// helmet

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File upload successfully')
  } catch (err) {
    console.error(err)
  }
})

app.listen(8080, () => {
  console.log('Backend server is running!')
})
