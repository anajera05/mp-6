import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/callback`;

    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 })
    }

    try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: redirectUri!,
                grant_type: 'authorization_code',
            }),
        })

        const tokenData = await tokenRes.json()
        if (!tokenRes.ok || !tokenData.access_token) {
            return NextResponse.json(
                { error: `Token request failed: ${tokenData.error || 'Unknown error'}` },
                { status: 500 }
            )
        }


        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        })

        if (!userRes.ok) {
            return NextResponse.json(
                { error: `User info request failed: ${userRes.statusText}` },
                { status: 500 }
            )

        }

        const userData = await userRes.json()

        const redirectUrl = new URL('/profile', req.url)
        redirectUrl.searchParams.set('name', userData.name)
        redirectUrl.searchParams.set('picture', userData.picture)

        return NextResponse.redirect(redirectUrl)

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'OAuth error' }, { status: 500 })
    }
}
