import { NextRequest, NextResponse} from 'next/server';
import { AIMediaDetector} from '@/lib/trust-hub/ai-media-detector';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided'},
                { status: 400}
            );
       }

        // Validate file type
        const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        const validVideoTypes = ['video/mp4', 'video/webm'];

        if (![...validImageTypes, ...validVideoTypes].includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload an image (JPEG, PNG, WebP) or video (MP4, WebM)'},
                { status: 400}
            );
       }

        // Check file size (max 10MB for images, 50MB for videos)
        const maxSize = validVideoTypes.includes(file.type) ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error:`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`},
                { status: 400}
            );
       }

        // Note: The AIMediaDetector runs client-side, so this endpoint
        // just validates and returns success. The actual analysis
        // happens in the browser for better performance.

        return NextResponse.json({
            success: true,
            fileType: file.type,
            fileName: file.name,
            fileSize: file.size,
            message: 'File validated successfully. Proceed with client-side analysis.'
       });

   } catch (error) {
        console.error('Media analysis error:', error);
        return NextResponse.json(
            { error: 'Failed to process media file'},
            { status: 500}
        );
   }
}
