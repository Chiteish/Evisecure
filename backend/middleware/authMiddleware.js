const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

            console.log(req.user);   // <-- Add this

            next();

        } else {

            return res.status(401).json({
                message: "No Token"
            });

        }

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = protect;