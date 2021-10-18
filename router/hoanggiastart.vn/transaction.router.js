/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 17/10/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const express = require('express');

//controller
const {GET, POST, MID_POST /* , DELETE, UPDATE */} = require('../../controller/transaction.controller');

// const
const transactionRouter = express.Router();

transactionRouter.route('/api/transaction').get(GET).post(POST);
// sliderRouter.route('/api/transaction/:id').delete(DELETE).put(UPDATE);
module.exports = transactionRouter;
