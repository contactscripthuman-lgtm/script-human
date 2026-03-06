/**
 * Test Intelligent Feedback Loop
 * Demonstrates the iterative improvement system
 */

const testAIContent = `
In today's digital landscape, it's important to note that leveraging cutting-edge solutions can deliver robust outcomes. Furthermore, the paradigm shift in our industry necessitates a multifaceted approach to innovation. Moreover, it's worth noting that delving into these opportunities requires a comprehensive understanding of the tapestry of modern business practices.

The seamless integration of AI-driven technologies represents a game-changing innovation. Additionally, this transformative solution enables organizations to optimize their operational efficiency. It's crucial to recognize that the implementation of such innovative frameworks can significantly enhance overall performance metrics.
`;

async function testFeedbackLoop() {
    console.log('🧪 TESTING INTELLIGENT FEEDBACK LOOP\n');
    console.log('='.repeat(80));
    console.log('📝 ORIGINAL AI CONTENT:');
    console.log('='.repeat(80));
    console.log(testAIContent);
    console.log('\n' + '='.repeat(80));

    try {
        const response = await fetch('http://localhost:3000/api/humanize-iterative', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: testAIContent,
                mood: 'professional'
            })
        });

        const result = await response.json();

        console.log('\n🎯 RESULTS:');
        console.log('='.repeat(80));

        if (result.success) {
            console.log(`✅ SUCCESS!`);
            console.log(`\n📊 STATISTICS:`);
            console.log(`  • Iterations: ${result.iterations}`);
            console.log(`  • Final Score: ${result.score}%`);
            console.log(`  • Domain Detected: ${result.domain}`);
            console.log(`  • Used Feedback Loop: ${result.usedFeedbackLoop ? 'Yes' : 'No'}`);

            if (result.tone) {
                console.log(`\n🎵 TONE ANALYSIS:`);
                console.log(`  • Formality: ${result.tone.formality}/100`);
                console.log(`  • Technicality: ${result.tone.technicality}/100`);
                console.log(`  • Emotion: ${result.tone.emotion}/100`);
            }

            console.log(`\n🛠️ TECHNIQUES APPLIED:`);
            result.techniques.forEach((tech, i) => {
                console.log(`  ${i + 1}. ${tech}`);
            });

            console.log('\n' + '='.repeat(80));
            console.log('✨ FINAL HUMANIZED CONTENT:');
            console.log('='.repeat(80));
            console.log(result.humanizedText);
            console.log('\n' + '='.repeat(80));

            if (result.analysis) {
                console.log('\n📈 TRUST HUB ANALYSIS:');
                console.log('='.repeat(80));
                console.log(`  • Overall Score: ${result.analysis.overallTrustScore}%`);
                console.log(`  • SDSL: ${result.analysis.layers.authenticity.sdsl.toFixed(2)}`);
                console.log(`  • AI Likelihood: ${result.analysis.layers.authenticity.aiLikelihood}%`);
                console.log(`  • Burstiness: ${result.analysis.layers.authenticity.burstiness.toFixed(2)}`);
                console.log(`  • Smog Density: ${result.analysis.layers.authenticity.smogDensity.toFixed(2)}`);
                console.log(`  • Hedging Score: ${result.analysis.layers.authenticity.hedgingScore}`);
                console.log(`  • Rare Word Ratio: ${result.analysis.layers.authenticity.rareWordRatio.toFixed(1)}%`);
            }

        } else {
            console.log(`❌ FAILED`);
            console.log(`Score: ${result.score}%`);
        }

    } catch (error) {
        console.error('❌ ERROR:', error.message);
    }
}

// Run the test
testFeedbackLoop();
