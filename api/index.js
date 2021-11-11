const express = require('express')
const app = express()
const { secretToken } = require('./configs')
const cookieParser = require('cookie-parser')
const User = require('./models/user')
const ServerProcess = require('./models/serverProcess')
const DbConnect = require('./database')
const authen = require('./middlewares/authen')
const jwt = require('jsonwebtoken');
const admin = require('./middlewares/admin')
const fs = require('fs')
const uploadFile = require("./middlewares/upload");

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

DbConnect();

app.post('/login', async (req, res) => {
    let token = req.token
    const { cid, sid } = req.body
    if (!cid || !sid) {
        res.status(401).json({ success: false, message: 'กรุณาใส่ข้อมูลให้ครบ' })
        return
    }

    // check admin
    const user = await User.findOne({ cid, sid })
    if (!user) {
        res.status(401).json({
            success: false,
            message: `<p class="font-bold">รหัสนักศึกษาหรือหมายเลขประจำตัวประชาชนไม่ถูกต้อง</p>`
        })
        return
    }
    const access_token = jwt.sign(
        { userId: user._id, role: user.role, sid: user.sid },
        secretToken,
        {
            expiresIn: 60 * 5,
        }
    );
    res.cookie('access_token', access_token, { maxAge: 1000 * 60 * 5, httpOnly: true })
    res.json({ success: true, result: user })
    return
})
app.post('/createadmin', async (req, res) => {
    const { cid, sid, secret } = req.body
    if (secret != secretToken) return res.json({ success: false, result: null, message: "Unauthorize" })
    const user = await User.create({ cid, sid, role: "admin" })
    res.json({ success: true, result: user })
})
app.get('/get_server_process', authen, async (req, res) => {
    const { type } = req.query
    const server_process = await ServerProcess.findOne({ type, active: true })
    if (server_process && server_process.max < server_process.current) {
        await server_process.updateOne({ max: 1, current: 1, active: false })
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
app.post('/admin/student_create', authen, async (req, res) => {
    const { students } = req.body
    let checkStudent
    let errors = []
    const process = await ServerProcess.create({ max: students.length, current: 0, type: 'import_student' })
    res.json({ success: true, result: `Import file rows:${students.length} success`, process: process._id })
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        try {
            checkStudent = await User.findOne({ cid: student.cid })
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
                await checkStudent.updateOne({ ...student })
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
app.post('/upload', authen, async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        res.status(200).send({
            success: true,
            result: req.file.filename,
        });
    } catch (err) {
        res.status(401).send({
            success: false,
            message: err.message,
        });
    }
})
app.get('/download', authen, async (req, res) => {
    let path = __dirname + '/public/pdf'
    const { userId } = req.authen
    const user = await User.findOne({ _id: userId })
    if (!user) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized',
        });
    }
    let isHasFile
    try {
        isHasFile = fs.lstatSync(`${path}/${user.sid}.pdf`).isFile()
    } catch (err) {
        console.log(err.message);
        return res.status(401).send({
            success: false,
            message: `นักศึกษาสามารถ download บัตรลงทะเบียนเพื่อชำระภายใน 3 วันนับจากที่ระบบตรวจสอบความถูกต้องเรียบร้อยค่ะ ถ้าเป็นนักศึกษาที่ยื่นกู้ กยศ. สำนักส่งเสริมและงานทะเบียนจะนำส่งบัตรลงทะเบียนให้ทางกองทุนมหาวิทยาลัย`,
        });
    }
    if (!isHasFile) {
        return res.status(401).send({
            success: false,
            message: `นักศึกษาสามารถ download บัตรลงทะเบียนเพื่อชำระภายใน 3 วันนับจากที่ระบบตรวจสอบความถูกต้องเรียบร้อยค่ะ ถ้าเป็นนักศึกษาที่ยื่นกู้ กยศ. สำนักส่งเสริมและงานทะเบียนจะนำส่งบัตรลงทะเบียนให้ทางกองทุนมหาวิทยาลัย`,
        });
    }
    res.download(`${path}/${user.sid}.pdf`)
    user.status = 1
    await user.save()
    console.log('--update status success--');
})

module.exports = app