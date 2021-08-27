const express = require('express')
const app = express()
const { url, university, password, secretToken } = require('./configs')
const cookieParser = require('cookie-parser')
const AdminToken = require('./models/adminToken')
const User = require('./models/user')
const ServerProcess = require('./models/serverProcess')
const DbConnect = require('./database')
const axios = require('axios')
const qs = require('qs');
const authen = require('./middlewares/authen')
const jwt = require('jsonwebtoken');
const admin = require('./middlewares/admin')

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
DbConnect();

app.use(async (req, res, next) => {
    let adminToken = await AdminToken.findOne({})
    if (!adminToken) {
        const tokenFromApi = await getTokenFromApi()
        if (tokenFromApi.success) {
            adminToken = await AdminToken.create({ token: tokenFromApi.result.access_token })
            if (adminToken) {
                req.token = adminToken.token
            } else {
                res.status(401).json({ success: false, message: 'เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง' })
                return
            }
        } else {
            res.status(401).json({ success: false, message: 'เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง' })
            return
        }
    }
    req.token = adminToken.token
    next()
})

app.post('/login', async (req, res) => {
    let token = req.token
    const { cid, sid } = req.body
    if (!cid || !sid) {
        res.status(401).json({ success: false, message: 'กรุณาใส่ข้อมูลให้ครบ' })
        return
    }

    // check admin
    const user = await User.findOne({ cid, sid })
    console.log(user);
    if (!user) {
        res.status(401).json({ success: false, message: 'ข้อมูลของคุณไม่ถูกต้อง' })
        return
    }
    if (user.role === 'admin') {
        siginToken(user, res)
    } else {
        let data = await getUserFromApi(token, { cid, sid })
        if (data.success && data.result.students.length > 0) {
            siginToken(user, res)
        } else {
            res.status(401).json({ success: false, message: 'ข้อมูลของคุณไม่ถูกต้อง' })
            return
        }
    }

})
app.post('/createadmin', async (req, res) => {
    const { cid, sid } = req.body
    const user = await User.create({ cid, sid, role: "admin" })
    res.json({ success: true, result: user })
})
app.get('/get_server_process', authen, async (req, res) => {
    const { type } = req.query
    const server_process = await ServerProcess.findOne({ type, active: true })
    if (server_process && server_process.max < server_process.current) {
        await server_process.update({ max: 1, current: 1, active: false })
    }
    res.json({ success: true, result: server_process ? server_process : { max: 1, current: 1, active: false } })
})
app.get('/me', authen, async (req, res) => {
    const { userId } = req.authen
    const user = await User.findOne({ _id: userId })
    res.json({ success: true, result: user })
})
app.delete('/logout', authen, async (req, res) => {
    res.clearCookie('access_token')
    res.json({ success: true })
})

app.get('/admin/students', [authen, admin], async (req, res) => {
    let { page, term } = req.query
    const options = {
        page,
        limit: 15,
        collation: {
            locale: 'en',
        },
    };
    let user
    if (page == 0) {
        user = await User.find({ role: { $ne: 'admin' } })
    } else {
        user = await User.paginate(
            {
                role: { $ne: 'admin' },
                sid: { $regex: '.*' + term + '.*' }
            },
            options
        )
    }
    res.json({ success: true, result: user })
})
app.post('/admin/student_create', [authen, admin], async (req, res) => {
    const { students } = req.body
    let checkStudent
    let errors = []
    const process = await ServerProcess.create({ max: students.length, current: 0, type: 'import_student' })
    res.json({ success: true, result: `Import file rows:${students.length} success`, process: process._id })
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        try {
            checkStudent = await User.findOne({ id: student.id })
            console.log('-- find student success --');
        } catch (err) {
            console.log('=== find student failed ===' + err.message);
            errors.push({
                process: `find student`,
                line: i,
                message: err.message
            })
        }
        if (checkStudent) {
            try {
                await checkStudent.update({ ...student })
                console.log('-- update student success --');
            } catch (err) {
                errors.push({
                    process: `update student`,
                    line: i,
                    message: err.message
                })
                console.log('=== update student failed ===' + err.message);
            }
        } else {
            try {
                const newUser = new User({ ...student })
                await newUser.save()
                console.log('-- create student success --');
            } catch (err) {
                errors.push({
                    process: `create student`,
                    line: i,
                    message: err.message
                })
                console.log('=== create student failed ===' + err.message);
            }
        }
        try {
            process.current = i + 1
            if (students.length == i + 1) {
                process.active = false
            }
            await process.save()
            console.log('-- server process update success --');
        } catch (err) {
            errors.push({
                process: `server process update`,
                line: i,
                message: err.message
            })
            console.log('=== server process update failed ===' + err.message);

        }

    }
})

function siginToken(user, res) {
    const access_token = jwt.sign(
        { userId: user._id, role: user.role },
        secretToken,
        {
            expiresIn: "3h",
        }
    );
    res.cookie('access_token', access_token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true })
    res.json({ success: true, result: user })
    return
}
async function getUserFromApi(token, { cid, sid }) {
    const options = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ cid, sid }),
        url: `${url}/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json`,
    };
    try {
        const resp = await axios(options)
        return resp.data
    } catch (err) {
        return {
            success: false
        }
    }
}

async function getTokenFromApi() {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
            "university": university,
            "password": password
        },
        url: `${url}/api/v1/staff/login`,
    };
    try {
        const resp = await axios(options)
        return resp.data
    } catch (err) {
        return {
            success: false
        }
    }
}
module.exports = app