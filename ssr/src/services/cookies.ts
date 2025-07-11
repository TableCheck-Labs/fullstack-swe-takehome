import JsCookie from "js-cookie";

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  createdAt: number;
}

class Cookies {
  public static uriEncoder = JsCookie.withConverter({
    write(authToken) {
      return encodeURIComponent(authToken as string);
    },
  });

  getAuthToken(): AuthToken | undefined {
    const cookie = JsCookie.get("auth_token");
    if (!cookie) return undefined;

    let authToken: AuthToken;
    try {
      authToken = JSON.parse(cookie);
    } catch (error) {
      return undefined;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenValid = currentTime < authToken.createdAt + authToken.expiresIn;

    return isTokenValid ? authToken : undefined;
  }

  setAuthToken(authToken: AuthToken): void {
    Cookies.uriEncoder.set("auth_token", JSON.stringify(authToken), {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }

  removeAuthToken(): void {
    Cookies.uriEncoder.remove("auth_token", {
      path: "/",
    });
  }
}

export const cookies = new Cookies();
