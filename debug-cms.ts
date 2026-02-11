import { createClient } from 'contentful';

const client = createClient({
    space: '1gg7zabitij5',
    accessToken: 'BfEI2gj_QE3dimfkkZ6Z93oeYEP_84k4eP7pllgdGsg',
});

async function run() {
    try {
        console.log("Fetching entries...");
        const response = await client.getEntries();

        if (response.items.length === 0) {
            console.log("No entries found!");
        } else {
            console.log("Found", response.items.length, "entries.");
            response.items.forEach((item, index) => {
                console.log(`\n--- Entry ${index + 1} ---`);
                console.log("Content Type ID:", item.sys.contentType.sys.id);
                console.log("Fields:", JSON.stringify(item.fields, null, 2));
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
