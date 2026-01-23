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
            type: isVideo ? 'video.other' : 'website',
            images: !isVideo ? [{ url: mediaUrl }] : undefined,
            videos: isVideo ? [{ url: mediaUrl, type: media.mimeType }] : undefined,
        },
        twitter: {
            card: isVideo ? 'player' : 'summary_large_image',
            title: media.originalName,
            images: !isVideo ? [mediaUrl] : undefined,
        },
        other: {
            ...(isVideo && {
                'og:video': mediaUrl,
                'og:video:type': media.mimeType,
                'og:video:width': '1280',
                'og:video:height': '720',
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
