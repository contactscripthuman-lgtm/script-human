const fetch = require('node-fetch');

async function testCertify() {
    console.log("Submitting test content to Trust Hub API...");

    try {
        const response = await fetch('http://localhost:3000/api/trust-hub/certify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "This is a completely original, 100% human-written test document. We are testing the forensic engine and certification API pipeline. It contains deep emotional nuance and unpredictable lexical patterns that prove it was written by a human. ".repeat(6), // long enough to pass filters
                metadata: {
                    author: "ScriptHuman Admin Test",
                    source: "System Test"
                }
            })
        });

        const data = await response.json();

        console.log("Status:", response.status);
        if (response.ok) {
            console.log("Success! Certificate generated.");
            console.log("Certificate ID:", data.certificateId);
            console.log("Verification URL:", data.verificationUrl);
            console.log("\nNext step: Please check your Firebase Console > Firestore Database to confirm:");
            console.log("1. A document exists in the 'certificates' collection with this ID.");
            console.log("2. A document exists in the 'embed_codes' collection with this ID.");
        } else {
            console.error("API Error:", data);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

testCertify();
