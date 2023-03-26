const jwtwebtoken = require('jsonwebtoken')
const secret = "kadam_vaibhavi"
function setUser(user) {
    return jwtwebtoken.sign({
        _id: user._id,
        email: user.email
    },secret)
}

function getUser(token) {
    if(!token) return null
    return jwtwebtoken.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}