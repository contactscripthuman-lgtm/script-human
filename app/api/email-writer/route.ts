import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const response = await fetch("https://ai-email-writer-fast-email-generation-pro-emails.p.rapidapi.com/composeNewEmail", {
            method: "POST",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY || "0bc3489bedmshfd588ff5c37e824p195b21jsn9cb02f06aac0",
                "x-rapidapi-host": "ai-email-writer-fast-email-generation-pro-emails.p.rapidapi.com",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Email Writer API error:", error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
