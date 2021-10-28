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
const {GET, POST, DELETE /* , DELETE, UPDATE */} = require('../../controller/transaction.controller');

// middleware
const isIPAdmin = require('../../middleware/isIPAdmin');

// const
const transactionRouter = express.Router();
transactionRouter.route('/api/transaction').get(isIPAdmin, GET).post(isIPAdmin, POST);
transactionRouter.route('/api/transaction/:id').delete(isIPAdmin, DELETE);
module.exports = transactionRouter;
