import fs from 'fs';

async function testRapidApi() {
    const text = "Plagrism Chcker analyzes whether any section of your text did not properly attribute authorship to content already published on the web or in books, research papers, academic papers, or news sorces.";
    console.log("Testing text:", text);
    try {
        const response = await fetch('https://grammer-checker1.p.rapidapi.com/v1/grammer-checker', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '0bc3489bedmshfd588ff5c37e824p195b21jsn9cb02f06aac0',
                'x-rapidapi-host': 'grammer-checker1.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        console.log("API Status:", response.status);
        console.log("Response Keys:", Object.keys(data));
        console.log("Full Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

testRapidApi();
