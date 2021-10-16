const express = require('express');
// const rendertron = require('rendertron-middleware');
const rendertron = require('./rendertron.middleware');
const path = require('path');
const app = express();

const staticFileExtensions = [
    'ai', 'avi', 'css', 'dat', 'dmg', 'doc', 'doc', 'exe', 'flv',
    'gif', 'ico', 'iso', 'jpeg', 'jpg', 'js', 'less', 'm4a', 'm4v',
    'mov', 'mp3', 'mp4', 'mpeg', 'mpg', 'pdf', 'png', 'ppt', 'psd',
    'rar', 'rss', 'svg', 'swf', 'tif', 'torrent', 'ttf', 'txt', 'wav',
    'wmv', 'woff', 'xls', 'xml', 'zip', 'json', 'map', 'php', 'xml'
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
    // 'PostmanRuntime',
];
const mobileUserAgent = ['Mobile', 'iPhone'];

app.use(rendertron.makeMiddleware({
    // proxyUrl: 'http://localhost:3000/render',
    proxyUrl: 'http://103.81.84.214:3000/render',
    userAgentPattern: new RegExp(botUserAgents.join('|'), 'i'),
    excludeUrlPattern: new RegExp(`\\.(${staticFileExtensions.join('|')})$`, 'i'),
    userAgentMobile: new RegExp(mobileUserAgent.join('|'), 'i'),
}));
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 4040);