const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports = {
    create
}

async function create(req, res) {

    try {
        const user = await User.create(req.body)
        const token = createJWT(user);
        res.json(token);

    } catch(err){
        res.status(400).json(err)
    }
}

// Helper functions

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

function checkToken(req, res){
    res.json(req.exp)
}