const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

const authentication = async function (req, res, next) {
    try {
    // token sent in request header 'x-api-key'
        const token = req.headers['x-api-key'];
        const addSecure = req.headers['mai-hu'];
        if (addSecure != '5Chutya')
        {
            return res.send({
                status: false, msg: 'Authorization Failed',
            })
        }
        // if token is not provided
        if (!token) {
            return res.status(400).send({ status: false, msg: 'Token required! Please login to generate token' });
        }

        jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, async (error, decodedToken) => {
            // if token is not valid
            if (error) {
                return res.status(400).send({ status: false, msg: 'Token is invalid!' });

                // if token is valid
            }
            var user_id = decodedToken.id;
            // var role=decodedToken.role;
            // checking if token session expired
            // if (Date.now() > decodedToken.exp * 1000) {
            //   return res.status(401).send({ status: false, msg: "Session Expired" });
            // }
            var data = await users.find({ user_id });
            if (data == null)
            {
                res.send({
                    status: false,
                    message: 'Access denied',
                });
            }
            else {
                next();
            }
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Server Error', error: err.message });
    }
};


module.exports = { authentication};
