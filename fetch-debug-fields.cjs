const https = require('https');

const spaceId = 'gme8kyi3yrnn';
const accessToken = 'PRgXbs35c4X4porjHDEP1WekGbKx8j_sXnKU7yuRcB0';
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&limit=3`;

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.items) {
                const post = json.items.find(item => item.fields.title === 'Blog Test 01');
                if (post) {
                    console.log('--- FOUND POST: Blog Test 01 ---');
                    console.log(JSON.stringify(post.fields.content, null, 2));
                } else {
                    console.log('Blog Test 01 not found in recent items.');
                    console.log('Available titles:', json.items.map(i => i.fields.title));
                }
            }
        } catch (e) { console.error(e); }
    });
});
