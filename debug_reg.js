const axios = require('axios');

const url = 'https://divisha-backend-2.onrender.com/v1/startup/register';
const timestamp = Date.now();

const tests = [
    {
        name: 'Strict Original Fields (Int CountryId)',
        payload: {
            name: `Debug Startup ${timestamp}`,
            email: `debug_${timestamp}@test.com`,
            mobile: '9876543210',
            countryId: 1
        }
    },
    {
        name: 'With Type and Agreement',
        payload: {
            name: `Debug Startup Type ${timestamp}`,
            email: `debug_type_${timestamp}@test.com`,
            mobile: '9876543210',
            countryId: 1,
            type: 'srotp',
            agreement: true
        }
    },
    {
        name: 'With Country Code',
        payload: {
            name: `Debug Startup CC ${timestamp}`,
            email: `debug_cc_${timestamp}@test.com`,
            mobile: '919876543210',
            countryId: 1,
            type: 'srotp',
            agreement: true
        }
    },
    {
        name: 'Mobile as Number',
        payload: {
            name: `Debug Startup Num ${timestamp}`,
            email: `debug_num_${timestamp}@test.com`,
            mobile: 9876543210,
            countryId: 1,
            type: 'srotp',
            agreement: true
        }
    },
    {
        name: 'With Extra Fields (Simulate Front-end Blob)',
        payload: {
            name: `Debug Startup Blob ${timestamp}`,
            email: `debug_blob_${timestamp}@test.com`,
            mobile: '9876543210',
            countryId: 1,
            type: 'srotp',
            agreement: true,
            error: "",
            otp: ""
        }
    }
];

async function runTest(test) {
    try {
        console.log(`Running: ${test.name}`);
        const res = await axios.post(url, test.payload);
        console.log(`✅ Success: ${JSON.stringify(res.data)}`);
    } catch (err) {
        console.log(`❌ Failed: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
}

async function runAll() {
    for (const test of tests) {
        await runTest(test);
        // wait a bit
        await new Promise(r => setTimeout(r, 1000));
    }
}

runAll();
