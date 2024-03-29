/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 29/10/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const listIpAdmin = [
    '::ffff:27.79.205.99',
    '2001:ee0:471d:88d0:699b:36df:72c7:29b5',
    '14.239.229.53',
    '113.190.130.57',
];

const isIPAdmin = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('ip', ip); // MongLV log fix bug
    if (typeof ip === 'string' && listIpAdmin.includes(ip.trim())) {
        next();
    } else {
        return res.status(200).json({});
    }
};

module.exports = isIPAdmin;
