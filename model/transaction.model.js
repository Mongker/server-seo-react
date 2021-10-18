const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Slider = new Schema(
    {
        name: {
            type: String,
            require: true,
            default: '',
        },
        code: {
            type: String,
            require: true, // Mã sản phẩm
            default: '',
        },
        number_of_products_sold: {
            type: Number,
            default: 0,
        },
        revenue: {
            type: Number,
            default: 0,
        },
        number_of_returned_orders: {
            type: Number,
            default: 0,
        },
        value_of_returned_goods: {
            type: Number,
            default: 0,
        },
        revenue_sum: {
            type: Number,
            default: 0,
        },
        capital_spent: {
            type: Number,
            default: 0,
        },
        date: {
            type: String,
            require: true,
            default: '',
        },
        profit: {
            type: Number,
            default: 0,
        },
        create: { type : Date, default: Date.now }
    },
    {
        collection: 'slider',
    },
);
module.exports = mongoose.model('Transaction', Slider, 'transaction_dev');
