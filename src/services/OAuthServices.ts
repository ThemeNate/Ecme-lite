type OAuthResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

async function placeholderFunction(): Promise<OAuthResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'placeholder_token',
                user: {
                    id: 'placeholder_id',
                    name: 'Placeholder User',
                    email: 'user@example.com'
                }
            });
        }, 500);
    });
}

export async function apiGoogleOauthSignIn(): Promise<OAuthResponse> {
    return await placeholderFunction();
}

export async function apiGithubOauthSignIn(): Promise<OAuthResponse> {
    return await placeholderFunction();
}