import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { commitSession, getSession } from "~/services/session";

export const action: ActionFunction = async ({ request }) => {
  const sess = await getSession(request.headers.get("Cookie"));
  // トークンクリアしてCookie設定する
  sess.unset("authtoken");
  return new Response(null, {
    headers: {
      // トークン含めたCookieを設定する
      "Set-Cookie": await commitSession(sess),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const sess = await getSession(request.headers.get("Cookie"));
  const token = sess.get("authtoken");
  if (token == null) {
    throw redirect("/authtest/login");
  }
  console.log(token);
  // 本来トークンの検証が必要
  return json({});
};

export default function Home() {
  return (
    <Form method="post" className="ml-auto mr-auto w-fit">
      <span className="text-xl">logined</span>
      <button
        className="mt-4 w-full text-white hover:bg-blue-500  bg-blue-600 py-1 rounded"
        type="submit"
      >
        logout
      </button>
    </Form>
  );
}
