'use client';

interface DriveItem {
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    owner: { username: string };
    _count: { files: number };
    createdAt: string;
}

interface DriveCardProps {
    drive: DriveItem;
}

export function DriveCard({ drive }: DriveCardProps) {
    return (
        <a
            href={`/drives/${drive.id}`}
            style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s, background-color 0.2s',
                border: '1px solid #333',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.backgroundColor = '#252525';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#1a1a1a';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '2rem' }}>📂</span>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{drive.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                        by {drive.owner.username}
                    </div>
                </div>
            </div>

            {drive.description && (
                <p style={{
                    fontSize: '0.9rem',
                    color: '#aaa',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {drive.description}
                </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.8rem', color: '#5865f2' }}>
                    {drive._count.files} files
                </span>
                {drive.isPublic && (
                    <span style={{ fontSize: '12px', backgroundColor: '#2f3136', padding: '2px 8px', borderRadius: '10px', color: '#888' }}>
                        🌍 Public
                    </span>
                )}
            </div>
        </a>
    );
}
