import { LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/react";
import { getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const sess = await getSession(request.headers.get("Cookie"));
  const token = sess.get("authtoken");
  if (token == null) {
    throw redirect("/authtest/login");
  }
  // 本来トークンの検証が必要
  return json({});
};

export default function Home() {
  return <div>logined</div>;
}
