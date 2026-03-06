
import { NextRequest, NextResponse} from"next/server";
import { getCertificate} from"@/lib/trust-hub/storage";

export const runtime ="nodejs";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error:"Certificate ID is required"},
            { status: 400}
        );
   }

    try {
        const certificate = await getCertificate(id);

        if (!certificate) {
            return NextResponse.json(
                { error:"Certificate not found"},
                { status: 404}
            );
       }

        return NextResponse.json(certificate);
   } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error:"Internal server error"},
            { status: 500}
        );
   }
}
