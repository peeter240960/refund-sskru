const jwt = require('jsonwebtoken');
const { secretToken } = require('../configs');

module.exports = (req, res, next) => {
    const { access_token } = req.cookies
    if (!access_token) {
        return res.status(401).json({
            success: false, message: 'หมดเวลาเข้าใช้งาน กรุณาเข้าสู่ระบบใหม่อีกครั้ง'
        });
    }
    try {
        const decodedToken = jwt.verify(access_token, secretToken);
        const { userId, role, sid } = decodedToken;
        req.authen = { userId, role, sid }
        next();
    } catch (err) {
        console.log('verify token failed', err.message);
        return res.status(401).json({
            success: false, message: 'หมดเวลาเข้าใช้งาน กรุณาเข้าสู่ระบบใหม่อีกครั้ง'
        });
    }
};