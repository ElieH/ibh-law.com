const https = require('https');

const spaceId = '1gg7zabitij5';
const accessToken = 'BfEI2gj_QE3dimfkkZ6Z93oeYEP_84k4eP7pllgdGsg';
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('--- START JSON ---');
            if (json.sys && json.sys.type === 'Error') {
                console.error('API Error:', json);
            } else if (json.items) {
                console.log(`Found ${json.items.length} items`);
                json.items.forEach((item, i) => {
                    console.log(`Item ${i}: Content Type = ${item.sys.contentType.sys.id}`);
                    console.log(JSON.stringify(item.fields, null, 2));
                });
            } else {
                console.log('Unknown response structure:', Object.keys(json));
            }
            console.log('--- END JSON ---');
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw data:', data.substring(0, 500));
        }
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
