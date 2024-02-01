import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { commitSession, getSession } from "~/services/session";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const uname = formData.get("username");
  const passwd = formData.get("password");
  const sess = await getSession(request.headers.get("Cookie"));
  // ここで本来は認証してトークン発行して保存する
  sess.set("authtoken", `${uname}-${passwd}`);
  throw redirect("/authtest/home", {
    headers: {
      // トークン含めたCookieを設定する
      "Set-Cookie": await commitSession(sess),
    },
  });
};

export default function FormSample() {
  return (
    <Form method="post">
      <p>
        username: <input type="text" name="uname" />
      </p>
      <p>
        password: <input type="text" name="passwd" />
      </p>
      <button type="submit">login</button>
    </Form>
  );
}
