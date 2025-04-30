export default function googleSignInLink(): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/auth/callback`;

  const queryParams = new URLSearchParams({
    scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    redirect_uri: redirectUri,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
  });

  return `https://accounts.google.com/o/oauth2/auth?${queryParams.toString()}`;
}
