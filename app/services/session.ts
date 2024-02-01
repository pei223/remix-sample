import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      // cookie内のセッションで使用するキー
      name: "__session",
      // cookie署名用。改竄を防げる
      // https://remix.run/docs/en/main/utils/cookies#signing-cookies
      secrets: ["r3m1xr0ck5"],
      // GETだけ他ドメインにcookie送る
      // TODO よくわからん
      sameSite: "lax",
      // 本来secureとか必要
    },
  });
