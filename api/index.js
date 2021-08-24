const app = require('express')()
const { url, university, password } = require('./configs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Admin = require('./models/admin')
const DbConnect = require('./database')
const axios = require('axios')
const qs = require('qs');

const redis = require("redis");
const client = redis.createClient();

app.use(bodyParser.json())
app.use(cookieParser());

DbConnect();
client.on("connect", function () {
    console.log("Radis connected...");
});
app.use(async (req, res, next) => {
    let user
    client.hgetall("me", function (err, object) {
        console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
        req.user = object
    });
    if (req.user) {
        next()
    } else {
        let admin = await Admin.findOne({})
        if (!admin) {
            const tokenFromApi = await getTokenFromApi()
            if (tokenFromApi.success) {
                admin = await Admin.create({ token: tokenFromApi.result.access_token })
                if (admin) {
                    req.token = admin.token
                } else {
                    return res.status(401).json({ success: false, message: 'เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง' })
                }
            } else {
                return res.status(401).json({ success: false, message: 'เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง' })
            }
        }
        req.token = admin.token
        next()
    }
})

app.post('/login', async (req, res) => {
    if (req.user) return res.status(401).json({ success: false, message: 'Unauthorize' })
    let token = req.token
    const { cid, sid } = req.body
    if (!cid || !sid) {
        return res.status(401).json({ success: false, message: 'กรุณาใส่ข้อมูลให้ครบ' })
    }
    let data = await getUserFromApi(token, { cid, sid })
    if (data.success && data.result.students.length > 0) {

        client.hmset(`${data.result.students[0].id}`, Object.keys(data.result.students[0]).map(key => key + "," + data.result.students[0][key]).join(",").split(','))

        res.json({ success: true, result: { ...data.result.students[0] } })
        return
    } else {
        return res.status(401).json({ success: false, message: 'ข้อมูลของคุณไม่ถูกต้อง' })
    }
})
app.get('/me', (req, res) => {
    if (req.user) {
        res.json({ ...req.user })
        return
    }
    return res.status(401).json({ success: false, message: 'Unauthorize' })
})
app.delete('/logout', (req, res) => {
    client.del('me');
    res.json({ success: true })
})
async function getUserFromApi(token, { cid, sid }) {
    const options = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ cid, sid }),
        url: `${url}/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json/api/v1/staff/students?format=json`,
    };
    try {
        const resp = await axios(options)
        console.log(resp.data);
        console.log('get user from api success');
        return resp.data
    } catch (err) {
        console.log('get user from api failed');
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
        console.log('get token from api success');
        return resp.data
    } catch (err) {
        console.log('get token from api failed');
        return {
            success: false
        }
    }
}
module.exports = app