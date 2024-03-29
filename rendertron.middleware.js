"use strict";
/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("cors");
const request = require("request");
/**
 * A default set of user agent patterns for bots/crawlers that do not perform
 * well with pages that require JavaScript.
 */
exports.botUserAgents = [
    'baiduspider',
    'bingbot',
    'embedly',
    'facebookexternalhit',
    'linkedinbot',
    'outbrain',
    'pinterest',
    'quora link preview',
    'rogerbot',
    'showyoubot',
    'slackbot',
    'TelegramBot',
    'twitterbot',
    'vkShare',
    'W3C_Validator',
    'whatsapp',
];
/**
 * A default set of file extensions for static assets that do not need to be
 * proxied.
 */
const staticFileExtensions = [
    'ai', 'avi', 'css', 'dat', 'dmg', 'doc', 'doc', 'exe', 'flv',
    'gif', 'ico', 'iso', 'jpeg', 'jpg', 'js', 'less', 'm4a', 'm4v',
    'mov', 'mp3', 'mp4', 'mpeg', 'mpg', 'pdf', 'png', 'ppt', 'psd',
    'rar', 'rss', 'svg', 'swf', 'tif', 'torrent', 'ttf', 'txt', 'wav',
    'wmv', 'woff', 'xls', 'xml', 'zip',
];

const mobileUserAgent = ['Mobile', 'iPhone'];

/**
 * Create a new Express middleware function that proxies requests to a
 * Rendertron bot rendering service.
 */
function makeMiddleware(options) {
    if (!options || !options.proxyUrl) {
        throw new Error('Must set options.proxyUrl.');
    }
    let proxyUrl = options.proxyUrl;
    if (!proxyUrl.endsWith('/')) {
        proxyUrl += '/';
    }
    const userAgentPattern = options.userAgentPattern || new RegExp(exports.botUserAgents.join('|'), 'i');
    const userAgentMobile = options.userAgentMobile || new RegExp(mobileUserAgent.join('|'), 'i');
    const excludeUrlPattern = options.excludeUrlPattern ||
        new RegExp(`\\.(${staticFileExtensions.join('|')})$`, 'i');
    const injectShadyDom = !!options.injectShadyDom;
    // The Rendertron service itself has a hard limit of 10 seconds to render, so
    // let's give a little more time than that by default.
    const timeout = options.timeout || 11000; // Milliseconds.
    return function rendertronMiddleware(req, res, next) {
        let ua = req.headers['user-agent'];
        let refreshCache = !!req.headers['refresh-cache-seo'];
        if ((ua === undefined || !userAgentPattern.test(ua) ||
            excludeUrlPattern.test(req.path)) && !refreshCache) {
            next();
            return;
        }
        const originalUrlClearQuery = req.originalUrl.split('?')[0]
        const incomingUrl = req.protocol + '://' + req.get('host') + originalUrlClearQuery;
        let renderUrl = proxyUrl + encodeURIComponent(incomingUrl);
        if (userAgentMobile.test(ua) && refreshCache) {
            renderUrl = renderUrl + '?mobile&refreshCache=true';
        } else if (userAgentMobile.test(ua)) {
            renderUrl = renderUrl + '?mobile';
        } else if (refreshCache) {
            renderUrl = renderUrl + '?refreshCache=true';
        }

        console.log('renderUrl', renderUrl);
        console.log
        // if (injectShadyDom) {
        //     renderUrl += '?wc-inject-shadydom=true';
        // }
        request({ url: renderUrl, timeout }, (e) => {
            if (e) {
                console.error(`[rendertron middleware] ${e.code} error fetching ${renderUrl}`);
                next();
            }
        }).pipe(res);
    };
}
exports.makeMiddleware = makeMiddleware;
//# sourceMappingURL=middleware.js.map
