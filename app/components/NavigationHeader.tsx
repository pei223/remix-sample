const links: { url: string; displayName: string }[] = [
  {
    url: "/events",
    displayName: "リストサンプル",
  },
  {
    url: "/formsample",
    displayName: "フォームサンプル",
  },
  {
    url: "/authtest/login",
    displayName: "認証テスト",
  },
];

export default function NavigationHeader({ className }: { className: string }) {
  return (
    <ul className={`flex ${className} py-4 px-6 bg-blue-600 shadow-2xl`}>
      <li className="mr-auto font-medium text-xl">
        <a className="text-white hover:text-blue-200" href="/">
          Remix sample
        </a>
      </li>
      {links.map((v) => (
        <li key={v.url} className="mr-6">
          <a className="text-white hover:text-blue-200" href={v.url}>
            {v.displayName}
          </a>
        </li>
      ))}
    </ul>
  );
}
