import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { id } = await params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
        return {
            title: 'Not Found'
        };
    }

    // Check if it's a video to add proper OG tags
    if (media.mimeType.startsWith('video/')) {
        const headersList = await headers();
        const host = headersList.get('x-forwarded-host') || headersList.get('host');
        const proto = headersList.get('x-forwarded-proto') || 'http';
        const baseUrl = `${proto}://${host}`;
        const videoUrl = `${baseUrl}/api/media/${id}`;

        return {
            title: media.originalName,
            openGraph: {
                type: 'video.other',
                videos: [
                    {
                        url: videoUrl,
                        secureUrl: videoUrl,
                        type: media.mimeType,
                    }
                ],
                title: media.originalName,
            },
            twitter: {
                card: 'player',
                players: [
                    {
                        streamUrl: videoUrl,
                        width: 1280, // Best guess defaults
                        height: 720
                    }
                ]
            }
        };
    }

    return {
        title: media.originalName
    };
}

export default async function MediaRedirectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Check if media exists
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0a0a0a',
                color: '#fff',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <h1>404 - File Not Found</h1>
            </div>
        );
    }

    // Construct valid URL using headers to ensure correct protocol and host behind proxies
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${proto}://${host}`;
    const userAgent = headersList.get('user-agent') || '';

    // Check for bots that might need the meta tags instead of a raw redirect
    const isBot = /bot|facebookexternalhit|whatsapp|telegram|discord/i.test(userAgent);

    // If it's a bot and a video, likely looking for OG tags
    if (isBot && media.mimeType.startsWith('video/')) {
         return (
            <div style={{ display: 'none' }}>
                {/* Empty content basically, but the metadata will be injected by generateMetadata */}
                Video Preview
            </div>
        );
    }

    // Redirect to the API endpoint that serves the raw file
    redirect(`${baseUrl}/api/media/${id}`);
}
