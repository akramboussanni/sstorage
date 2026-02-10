'use client';

const ANON_TOKEN_COOKIE = 'sstorage_anon_token';

export function getOrCreateAnonToken(): string {
    // Check if token exists in cookies
    const cookies = document.cookie.split(';').map(c => c.trim());
    const existingToken = cookies
        .find(c => c.startsWith(`${ANON_TOKEN_COOKIE}=`))
        ?.split('=')[1];

    if (existingToken) {
        return existingToken;
    }

    // Generate new token
    const token = generateUUID();
    
    // Store in cookie (1 year expiry)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `${ANON_TOKEN_COOKIE}=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`;

    return token;
}

export function getAnonToken(): string | null {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const token = cookies
        .find(c => c.startsWith(`${ANON_TOKEN_COOKIE}=`))
        ?.split('=')[1];
    
    return token || null;
}

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
