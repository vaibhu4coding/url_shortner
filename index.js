const express = require('express')
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connect')
const path = require('path')
const URL = require('./models/url')
const app = express()
const PORT = 5000
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly} = require('./middleware/auth')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/url', restrictToLoggedinUserOnly, urlRoute)
app.use('/', staticRoute)
app.use('/user', userRoute)

app.get('/:shortId', async (req, res) => {
    const reqId = req.params.shortId
    const entry = await URL.findOne({shortId:reqId})
    
    res.redirect(entry.redirectURL)
})

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDb connected'))
app.listen(PORT, () => console.log("Server Started At ", PORT))