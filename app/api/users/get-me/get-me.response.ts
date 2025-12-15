export interface GetMeResponse {
    id: string;
    email: string;
    user_metadata: Record<string, any>;
    app_metadata: Record<string, any>;
    aud: string;
    created_at: string;

}