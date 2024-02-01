import { useRouteLoaderData } from "@remix-run/react";
import { useEffect } from "react";

export default function Place() {
  const { item } = useRouteLoaderData("routes/events.$eventId");
  console.debug(`render place page `);
  const place = item["開催場所"];

  useEffect(() => {
    console.log(`event page First render`);
  }, []);

  return (
    <div
      style={{
        margin: "0px 16px",
      }}
    >
      <pre
        style={{
          whiteSpace: "break-spaces",
        }}
      >
        {JSON.stringify(place)}
      </pre>
    </div>
  );
}
