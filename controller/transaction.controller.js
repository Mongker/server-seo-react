/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 17/10/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
// model
const Transaction = require('../model/transaction.model');
// async function _update(catalog, req, res) {
//     await Transaction.find({}, async function (err, data) {
//         if (err) return res.status(404).json({ message: err });
//         await data.map(async (item, index) => {
//             catalog.index < item.index && (item.index = index + 1);
//             await item
//                 .save()
//                 .then()
//                 .catch((err) => {
//                     console.log('err:', err);
//                 });
//         });
//         return res.json({ message: 'SUCCESS' });
//     });
// }
module.exports = {
    GET: async function (req, res) {
        let queryDate = {};
        if (req.query && Object.keys(req.query).length > 0) {
            const day = req.query && req.query.day;
            const month = req.query && req.query.month;
            const year = req.query && req.query.year;
            const code = req.query && req.query.code;
            code && (queryDate['code'] = new RegExp(code, 'i'));
            year && (queryDate['year'] = Number(year));
            month && (queryDate['month'] = Number(month));
            day && (queryDate['day'] = Number(day));
            // const queryIds = Object.keys(queryDate).map((key) => ({[key]: queryDate[key]}));
            // if(queryIds.length === 0 && code) {
            //     query.$and = [{code: new RegExp(code, 'i')}];
            // } else if(queryIds.length > 0 && code) {
            //     console.log('query1:', queryIds); // MongLV log fix bug
            //     query.$and = [...queryIds, {code: new RegExp(code, 'i')}]
            // } else if(queryIds.length > 0) {
            //     query.$and = [...queryIds];
            // }
        }
        await Transaction.find(queryDate, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else {
                const objectData = {};
                data.map((item) => {
                    objectData[item._id] = item;
                });
                return res.status(200).json(objectData);
            }
        });

    },
    POST: async function (req, res) {
        const itemIds = req.body && req.body.data && req.body.data;
        if(Array.isArray(itemIds)) {
            const itemIdsNew = itemIds.map((item) => {
                const itemIdsDate = item.date.split('/')
                let day = '';
                let month = '';
                let year = '';
                if(itemIdsDate.length === 3) {
                    day = Number(itemIdsDate[0]);
                    month = Number(itemIdsDate[1]);
                    year = Number(itemIdsDate[2]);
                }

                return {...item, day, month, year};
            })
            Transaction.insertMany(itemIdsNew).then((array) => {
                const items = {};
                array.map((item) => {
                    items[item._id] = {create: item['create'], _id: item._id}
                    return item;
                })
                return res.status(200).json({ items: items })
            }).catch((err) => res.status(400).json({ message: err }));
        } else {
            return res.status(400).json({ message: 'error data' });
        }
    },
    DELETE: async function (req, res) {
        await Transaction.findByIdAndRemove({ _id: req.params.id }, async function (err, data) {
            if (err) res.json(err);
            else {
                return res.json({ message: 'SUCCESS' });
            }
        });
    },
    UPDATE: async function (req, res) {
        await Transaction.findById(req.params.id, function (err, Transaction) {
            if (!Transaction) res.status(404).send('data is not found');
            else {
                Transaction.name = req.body.name;
                Transaction.image_link = req.body.image_link;
                Transaction.index = req.body.index;
                Transaction.destination = req.body.destination;
                Transaction.save()
                    .then((business) => {
                        return res.json({ message: 'SUCCESS' });
                    })
                    .catch((err) => {
                        return res.status(400).send({ message: 'Failed to update Product' });
                    });
            }
        });
    },
};
