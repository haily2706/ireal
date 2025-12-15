import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GetMeResponse } from './get-me.response'

/**
 * @swagger
 * /api/users/get-me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns the profile of the currently logged in user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
export async function GET(request: Request) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json<GetMeResponse>({
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata,
        app_metadata: user.app_metadata,
        aud: user.aud,
        created_at: user.created_at
    }
    )
}
