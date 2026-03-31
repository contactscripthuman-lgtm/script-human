import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { type } = await req.json();
        const genType = type || "elf";
        
        const response = await fetch(`https://fantasy-content-generator.p.rapidapi.com/api/generate-name?type=${genType}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY || "0bc3489bedmshfd588ff5c37e824p195b21jsn9cb02f06aac0",
                "x-rapidapi-host": "fantasy-content-generator.p.rapidapi.com",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Content Writer API error:", error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
