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
    <Form method="post" className="ml-auto mr-auto mt-8 form-card">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          name="uname"
          placeholder="Username"
          className="text-input"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="text"
          name="passwd"
          placeholder="Password"
          className="text-input"
        />
      </div>
      <div className="mt-8">
        <button
          className="w-full text-white hover:bg-blue-500  bg-blue-600 py-1 rounded"
          type="submit"
        >
          login
        </button>
      </div>
    </Form>
  );
}
