const app = require('./src/app')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./src/config/database')

connectDB()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
