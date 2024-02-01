import { Link } from "@remix-run/react";

export default function IndexPage() {
  return (
    <ul>
      <li>
        <Link to="/events">Events データ参照のサンプル</Link>
      </li>
      <li>
        <Link to="/formsample">Formsample データ更新のサンプル</Link>
      </li>
      <li>
        <Link to="/authtest/home">認証のサンプル</Link>
      </li>
    </ul>
  );
}
