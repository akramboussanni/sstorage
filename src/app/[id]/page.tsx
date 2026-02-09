import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { headers } from 'next/headers';

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

    // Redirect to the API endpoint that serves the raw file
    redirect(`${baseUrl}/api/media/${id}`);
}
