import { LoaderFunction } from "@remix-run/node";
import {
  Outlet,
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
  useRevalidator,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import ErrorView from "~/components/Error";

// ここをコメントアウトすると、eventsのエラー画面になる
export function ErrorBoundary() {
  console.log("/events/$eventId error boundary");
  const error = useRouteError();
  return <ErrorView error={error} />;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { eventId } = params;
  if (eventId == null) {
    throw new Response("Not Found", { status: 404 });
  }
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  console.log(`event ${eventId} server func`);
  searchParams.set("ID.識別値", eventId);
  const res = await fetch(
    `https://api.data.metro.tokyo.lg.jp/v1/Event?${searchParams}`
  );
  const resJson = await res.json();
  if (resJson[0].length !== 1) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ item: resJson[0][0] });
};

export default function Event() {
  const { item } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  // 初回のHTMLロードではなくクライアント側の遷移の場合ローディングがある.
  // その場合のページのロード状況を保持.
  const navigation = useNavigation();
  const revalidate = useRevalidator();
  console.debug(`render event page `);

  useEffect(() => {
    console.log(`event page First render`);
  }, []);

  function linkToPlace() {
    navigate("place");
  }

  // コメントアウトを外すとErrorBoundaryに流される
  //   if (true) {
  //     throw new Error("Error from client");
  //   }

  return (
    <>
      {navigation.state === "idle" ? (
        <div
          style={{
            margin: "0px 16px",
          }}
        >
          <h3>{item["名称"][1]["表記"]}</h3>
          <button
            onClick={() => {
              console.log(`reload from loader`);
              revalidate.revalidate();
            }}
          >
            {revalidate.state === "loading" ? "..." : "reload"}
          </button>
          <pre
            style={{
              whiteSpace: "break-spaces",
            }}
          >
            {JSON.stringify(item)}
          </pre>
          <button onClick={linkToPlace}>開催場所</button>
          <Outlet />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
