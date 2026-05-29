import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {

    try {

        const { apiKey } = req.query;

        if (!apiKey) {

            return res.status(401).json({
                success: false,
                message: 'API key is required'
            });

        }

        const user = await User.findOne({ apiKey });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: 'Invalid API key'
            });

        }

        req.user = user;

        next();

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export default authMiddleware;