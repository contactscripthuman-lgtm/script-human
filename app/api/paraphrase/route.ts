import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        
        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const encodedText = encodeURIComponent(text);
        const bodyContent = `text=${encodedText}&lang=en&paraphrase_capital=true&protected=YOUR%3Bsomething&mode=`;

        const response = await fetch("https://rimedia-paraphraser.p.rapidapi.com/api_paraphrase.php", {
            method: "POST",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY || "0bc3489bedmshfd588ff5c37e824p195b21jsn9cb02f06aac0",
                "x-rapidapi-host": "rimedia-paraphraser.p.rapidapi.com",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyContent
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Paraphrase API error:", error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
