const fs = require('fs');
const path = require('path');

// Path to the root directory where acc.txt and other files are located
const ROOT_DIR = __dirname;

/**
 * Loads Twitter account credentials from acc.txt.
 * Each line should be in the format: API_KEY,API_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET
 * @returns {Array<object>} An array of account credential objects.
 */
function loadAccounts() {
    const filePath = path.join(ROOT_DIR, 'acc.txt');
    if (!fs.existsSync(filePath)) {
        console.error('Error: acc.txt not found in the root directory.');
        return [];
    }

    const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
    return lines.map(line => {
        const [apiKey, apiSecret, accessToken, accessTokenSecret] = line.trim().split(',');
        return {
            appKey: apiKey,
            appSecret: apiSecret,
            accessToken,
            accessSecret: accessTokenSecret,
        };
    });
}

// Configuration for content sources
const config = {
    accounts: loadAccounts(),
    sources: {
        tweets: {
            url: 'https://raw.githubusercontent.com/jakijaki100200-eng/Leader1/refs/heads/main/tweets.txt',
            fallback: path.join(ROOT_DIR, 'tweets.txt'),
        },
        retweets: {
            url: 'https://raw.githubusercontent.com/jakijaki100200-eng/Leader1/refs/heads/main/retweets.txt',
            fallback: path.join(ROOT_DIR, 'retweets.txt'),
        },
        media: {
            url: 'https://raw.githubusercontent.com/jakijaki100200-eng/Leader1/refs/heads/main/media.txt',
            fallback: path.join(ROOT_DIR, 'media.txt'),
        },
        hashtags: {
            url: 'https://raw.githubusercontent.com/jakijaki100200-eng/Leader1/refs/heads/main/hashtags.txt',
            fallback: path.join(ROOT_DIR, 'hashtags.txt'),
        },
    },
};

module.exports = config;
