import { prisma } from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
        return { title: 'Not Found' };
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const mediaUrl = `${baseUrl}/api/media/${id}`;
    const isVideo = media.mimeType.startsWith('video/');
    const isGif = media.mimeType === 'image/gif';

    return {
        title: media.originalName,
        openGraph: {
            title: media.originalName,
            type: 'video.other',
            url: `${baseUrl}/${id}`,
            siteName: 'Simple Storage',
            images: [
                {
                    url: isVideo ? `${baseUrl}/api/media/${id}` : `${baseUrl}/api/media/${id}`,
                    width: isVideo ? 1280 : undefined,
                    height: isVideo ? 720 : undefined,
                }
            ],
            videos: isVideo ? [
                {
                    url: mediaUrl,
                    secureUrl: mediaUrl,
                    type: media.mimeType,
                    width: 1280,
                    height: 720,
                }
            ] : undefined,
        },
        twitter: {
            card: isVideo ? 'player' : 'summary_large_image',
            title: media.originalName,
            description: media.originalName,
            images: [mediaUrl], // Twitter/Discord often use this for the poster
            players: isVideo ? [
                {
                    playerUrl: mediaUrl,
                    streamUrl: mediaUrl,
                    width: 1280,
                    height: 720,
                }
            ] : undefined,
        },
        other: {
            ...(isVideo && {
                // Discord/Telegram sometimes look for these specifically
                'og:video:type': media.mimeType,
                'og:video:width': '1280',
                'og:video:height': '720',
                'og:video:url': mediaUrl,
                'og:video:secure_url': mediaUrl,
            }),
        },
    };
}

export default async function MediaPage({ params }: Props) {
    const { id } = await params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
        notFound();
    }

    const mediaUrl = `/api/media/${id}`;
    const isVideo = media.mimeType.startsWith('video/');

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            padding: '20px',
        }}>
            {isVideo ? (
                <video
                    src={mediaUrl}
                    controls
                    autoPlay
                    loop
                    style={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        borderRadius: '8px',
                    }}
                />
            ) : (
                <img
                    src={mediaUrl}
                    alt={media.originalName}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        borderRadius: '8px',
                    }}
                />
            )}
        </div>
    );
}
