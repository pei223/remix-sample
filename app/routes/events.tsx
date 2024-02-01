import { LoaderFunction, json } from "@remix-run/node";
import commonCss from "../styles/common.module.css";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import ErrorView from "~/components/Error";

export function ErrorBoundary() {
  console.log("/events error boundary");
  const error = useRouteError();
  return <ErrorView error={error} />;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  console.log("events fetch");
  const params = url.searchParams;
  if (params.get("limit") == null) {
    params.set("limit", "10");
  }
  const res = await fetch(
    `https://api.data.metro.tokyo.lg.jp/v1/Event?${params}`
  );
  const data = await res.json();
  console.log("events fetched");
  //   console.log("events fetched: ", data);
  return json({ items: data });
};

export default function Events() {
  const { items } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  console.debug(`render events page `);

  useEffect(() => {
    console.log(`events page First render`);
  }, []);

  function linkTo(cursor: string | null) {
    const params = new URL(document.location).searchParams;
    params.set("cursor", cursor ?? "");
    navigate(`/events?${params}`);
  }

  return (
    <>
      <h1 className={commonCss.title}>イベント一覧</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            minWidth: "30%",
            maxWidth: "300px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRight: "1px solid grey",
          }}
        >
          {items[0].map((v) => (
            <div
              key={v["名称"]}
              style={{
                margin: "8px 16px 8px 8px",
              }}
            >
              <Link to={`/events/${v["ID"]["識別値"]}`}>
                {v["名称"][1]["表記"]}
              </Link>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button onClick={() => linkTo(null)}>TOP</button>
            <button onClick={() => linkTo(items[1]["endCursor"])}>→</button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
