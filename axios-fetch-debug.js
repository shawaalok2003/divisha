const axios = require('axios');

async function testFetch() {
    const API_URL = "http://localhost:3333";
    const BASE = `${API_URL}/v1`;
    const PUBLIC = `/public`;

    console.log("Testing fetch from:", `${BASE}${PUBLIC}/country`);

    try {
        const results = await axios.get(`${BASE}${PUBLIC}/country`);
        const startupResponse = results.data;

        console.log("Status:", startupResponse.status);
        console.log("Data Length:", startupResponse.data?.length);
        console.log("Data:", JSON.stringify(startupResponse.data));

        if (startupResponse.status === "success" && Array.isArray(startupResponse.data)) {
            console.log("FETCH SUCCESSFUL - DATA OK");
        } else {
            console.log("FETCH FAILED - UNEXPECTED STRUCTURE");
        }
    } catch (err) {
        console.error("FETCH ERROR:", err.message);
    }
}

testFetch();
