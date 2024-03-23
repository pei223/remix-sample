import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import LinearLoading from "./components/LinearLoading";
import NavigationHeader from "./components/NavigationHeader";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: stylesheet },
      ]
    : []),
];

export default function App() {
  // ページ全体でローディング状態を見る
  const navigation = useNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {navigation.state === "loading" && <LinearLoading />}
        <NavigationHeader className="w-full sticky top-0" />
        <div className="mt-3 mb-5">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
