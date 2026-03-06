// TEST SCRIPT FOR ITERATIVE HUMANIZATION
// This will test the humanization API and verify it works

const testContent = `Environmental Pollution: A Global Crisis

Environmental pollution has emerged as one of humanity's most pressing challenges, threatening ecosystems, public health, and the planet's future. From air and water contamination to soil degradation and plastic waste, pollution in its various forms affects every corner of the globe, demanding urgent action from governments, industries, and individuals.

Air Pollution: The Invisible Killer

Air pollution remains the most deadly form of environmental contamination, causing approximately 7 million premature deaths annually according to the World Health Organization. Major sources include industrial emissions, vehicle exhaust, coal-burning power plants, and agricultural activities. Particulate matter, nitrogen dioxide, sulfur dioxide, and ground-level ozone create toxic cocktails in urban atmospheres, particularly in rapidly developing nations.

Cities in South Asia, Southeast Asia, and parts of Africa frequently experience hazardous air quality levels. Delhi, Beijing, and Dhaka regularly rank among the world's most polluted cities, where residents breathe air equivalent to smoking multiple cigarettes daily.`;

async function testHumanization(mood) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TESTING MOOD: ${mood.toUpperCase()}`);
    console.log('='.repeat(60));

    try {
        const response = await fetch('http://localhost:3000/api/humanize-iterative', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: testContent, mood })
        });

        const data = await response.json();

        console.log(`\nRESULTS:`);
        console.log(`Success: ${data.success}`);
        console.log(`Final Score: ${data.score}%`);
        console.log(`Iterations: ${data.iterations}`);
        console.log(`\nHumanized Text Preview:`);
        console.log(data.humanizedText.substring(0, 300) + '...');

        return data;
    } catch (error) {
        console.error(`ERROR testing ${mood}:`, error);
        return null;
    }
}

async function runAllTests() {
    const moods = ['professional', 'casual', 'friendly'];

    for (const mood of moods) {
        await testHumanization(mood);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s between tests
    }
}

runAllTests();
