const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const rendertron = require('./rendertron.middleware');
// const rendertron = require('rendertron-middleware');

// router
const transactionRouter = require('./router/hoanggiastart.vn/transaction.router');

const staticFileExtensions = [
    'ai', 'avi', 'css', 'dat', 'dmg', 'doc', 'doc', 'exe', 'flv',
    'gif', 'ico', 'iso', 'jpeg', 'jpg', 'js', 'less', 'm4a', 'm4v',
    'mov', 'mp3', 'mp4', 'mpeg', 'mpg', 'pdf', 'png', 'ppt', 'psd',
    'rar', 'rss', 'svg', 'swf', 'tif', 'torrent', 'ttf', 'txt', 'wav',
    'wmv', 'woff', 'xls', 'xml', 'zip', 'json', 'map', 'php', 'xml', 'html'
];

const botUserAgents = [
    'Viber',
    'coccocbot',
    'Googlebot',
    'googlebot',
    'Baiduspider',
    'bingbot',
    'Embedly',
    'facebookexternalhit',
    'LinkedInBot',
    'outbrain',
    'pinterest',
    'quora link preview',
    'rogerbot',
    'showyoubot',
    'Slackbot',
    'TelegramBot',
    'Twitterbot',
    'vkShare',
    'W3C_Validator',
    'WhatsApp',
    'whatsapp',
    'etaInspector',
    'PostmanRuntime',
];
const mobileUserAgent = ['Mobile', 'iPhone'];
const url_DBOnline = 'mongodb+srv://mongker:S211199@gmail.com@cluster0.tpvqz.gcp.mongodb.net/hoanggiastart?retryWrites=true&w=majority';
mongoose.connect(url_DBOnline, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database ' + err);
    },
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen( 4040, function () {
    console.log('Server is running on Port:', 4040);
});
app.use(transactionRouter);

// app.use(rendertron.makeMiddleware({
//     // proxyUrl: 'http://localhost:3000/render',
//     proxyUrl: 'http://103.81.84.214:3000/render',
//     userAgentPattern: new RegExp(botUserAgents.join('|'), 'i'),
//     excludeUrlPattern: new RegExp(`\\.(${staticFileExtensions.join('|')})$`, 'i'),
//     userAgentMobile: new RegExp(mobileUserAgent.join('|'), 'i'),
// }));

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
