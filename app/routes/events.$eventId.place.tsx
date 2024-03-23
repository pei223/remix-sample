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
    <div className="my-4">
      <pre className="p-2 bg-black/[0.1] whitespace-break-spaces">
        {JSON.stringify(place)}
      </pre>
    </div>
  );
}
