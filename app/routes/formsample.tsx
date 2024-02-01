import { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  Form,
  json,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSubmit,
} from "@remix-run/react";
import ErrorView from "~/components/Error";
import fs from "fs";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function ErrorBoundary() {
  console.log("/formsample error boundary");
  const error = useRouteError();
  return <ErrorView error={error} />;
}

const deleteAction = () => {
  console.log("delete action");
  const v = {
    name: "",
    value: "",
  };
  try {
    fs.writeFileSync("./formsample-testdata.json", JSON.stringify(v));
    return null;
  } catch (e) {
    throw new Response("Error", { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  if (request.method.toLowerCase() === "delete") {
    return deleteAction();
  }

  const name = formData.get("name");
  const value = formData.get("value");

  if (name == null || name.toString().length === 0) {
    const error: DataError = {
      name: "empty",
      value: null,
    };
    return json(error);
  }
  if (value == null || value.toString().length === 0) {
    const error: DataError = {
      name: null,
      value: "empty",
    };
    return json(error);
  }

  await sleep(1000);
  const v = {
    name: name.toString(),
    value: value.toString(),
  };
  try {
    fs.writeFileSync("./formsample-testdata.json", JSON.stringify(v));
    return null;
  } catch (e) {
    throw new Response("Error", { status: 500 });
  }
};

export const loader: LoaderFunction = async () => {
  try {
    const v = fs.readFileSync("./formsample-testdata.json");
    return json<Data>(JSON.parse(v.toString()) as Data);
  } catch (e) {
    throw new Response("Not Found", { status: 404 });
  }
};

type Data = {
  name: string;
  value: string;
};

type DataError = Record<keyof Data, string | null>;
export default function FormSample() {
  const data = useLoaderData<Data>();
  const submit = useSubmit();
  const error = useActionData<DataError>();
  const navigation = useNavigation();
  console.debug(`render formsample page`);
  console.log(error, data);
  data.name;
  // state経由にする

  // Actionが実行されると自動でloaderが再実行される
  function clear() {
    // 手動でsubmitできる
    submit(null, {
      method: "DELETE",
    });
  }

  return (
    // 複数フォームがあるならinput hiddenなどで対処できる
    // https://github.com/remix-run/remix/discussions/1569
    <Form method="post">
      <p>
        name: <input type="text" name="name" defaultValue={data.name} />
        {error?.name != null && <span>{error.name}</span>}
      </p>
      <p>
        value: <input type="text" name="value" defaultValue={data.value} />
        {error?.value != null && <span>{error.value}</span>}
      </p>
      <p>
        <button type="submit">
          {navigation.state === "submitting" ? "..." : "submit"}
        </button>
        <button type="button" onClick={clear}>
          {navigation.state === "submitting" ? "..." : "clear"}
        </button>
      </p>
    </Form>
  );
}
