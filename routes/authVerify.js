const jwt = require('jsonwebtoken')


module.exports = (req, res, next) =>{
    const token = req.header("auth-token")
    if(!token)
        return res.status(401).send("Access denied")

    try{
        const verfied = jwt.verify(token, process.env.TOKEN_SECRET)
        req.employee = verfied
        next()
    }
    catch(error){
        res.send(400).send("Invalid token")
    }

}