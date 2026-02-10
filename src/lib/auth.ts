import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-change-me');
const COOKIE_NAME = 'sstorage_session';
const ANON_TOKEN_COOKIE = 'sstorage_anon_token';

export interface SessionUser {
    id: string;
    username: string;
    isAdmin: boolean;
}

export async function createSession(user: SessionUser): Promise<string> {
    const token = await new SignJWT({ user })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(SECRET);

    return token;
}

export async function getSession(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (!token) return null;

        const { payload } = await jwtVerify(token, SECRET);
        return (payload as any).user as SessionUser;
    } catch {
        return null;
    }
}

export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: false, // Forcing false as user requested help with mobile login (likely http)
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getOrCreateAnonToken(): Promise<string> {
    const cookieStore = await cookies();
    let token = cookieStore.get(ANON_TOKEN_COOKIE)?.value;

    if (!token) {
        token = uuidv4();
        cookieStore.set(ANON_TOKEN_COOKIE, token, {
            httpOnly: false, // Client-side JavaScript can access it
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
        });
    }

    return token;
}

export async function getAnonToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        return cookieStore.get(ANON_TOKEN_COOKIE)?.value || null;
    } catch {
        return null;
    }
}

export { COOKIE_NAME };
