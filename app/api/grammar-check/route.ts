import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: 'Missing text provided for grammar check.' },
                { status: 400 }
            );
        }

        console.log('📝 Getting Grammar Fix Suggestions...');

        const response = await fetch('https://grammer-checker1.p.rapidapi.com/v1/grammer-checker', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '0bc3489bedmshfd588ff5c37e824p195b21jsn9cb02f06aac0',
                'x-rapidapi-host': 'grammer-checker1.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            console.error(`Grammar check API returned ${response.status}`);
            return NextResponse.json(
                { error: 'Grammar fixing feature is currently unavailable. Please check grammar manually.' },
                { status: 503 }
            );
        }

        const data = await response.json();

        if (data.errors) {
            return NextResponse.json({
                success: true,
                suggestions: data.errors
            });
        }

        // Catch-all for unexpected valid shapes but no errors field 
        return NextResponse.json({
            success: true,
            suggestions: {
                correction: text,
                error: "No grammar issues found or unexpected response format."
            }
        });

    } catch (err) {
        console.error('Grammar check failed (network/parse error):', err);
        return NextResponse.json(
            { error: 'Grammar fixing feature is currently unavailable. Please check grammar manually.' },
            { status: 503 }
        );
    }
}
