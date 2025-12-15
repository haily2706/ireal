import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     summary: Handle Auth Callback
 *     description: Exchanges code for session and redirects
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: The authorization code
 *       - in: query
 *         name: next
 *         schema:
 *           type: string
 *         description: URL to redirect to after success
 *     responses:
 *       302:
 *         description: Redirects to next URL or home
 *       400:
 *         description: Error
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/?error=auth`)
}
