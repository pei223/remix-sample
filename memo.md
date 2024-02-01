TODO fetcher

## サンプルアプリについて
### /events/...
参照に関するサンプル画面

- loader
- nested routing
- error boundary
- useNavigationのローディング画面
- useLoaderData/useRouteLoaderDataでのデータ取得
- ページング
- revalidate

### formsample

- action/Form
- useSubmit/useActionData

### authtest

- 認証の流れ
- ログイン
    - Cookieにセッション保持してそこにトークン設定
- 認証チェック
    - Cookieからセッション取得してトークンを取得してチェック



## 概要
Reactベースのフレームワーク.
以下のような特徴や機能を持つ.

- SSR
- パフォーマンスが高い
- ErrorBoundary
- Nested routing
- loader/actionなどサーバーサイドがシンプルかつ手厚い仕組み
- web標準技術を多く使う
    - https://remix.run/docs/en/main/discussion/introduction
    - https://remix.run/docs/en/main/discussion/introduction#server-framework


## 特徴
### パフォーマンス・SSGをサポートしない理由
CDNみたいな分散コンピューティングでパフォーマンス向上の相性が良いようになってるらしい。
https://remix.run/docs/en/main/guides/performance

Cache-controlヘッダーを設定したらエッジ側(Cloudfront)とかで良い感じにしてくれる。
stale-while-revalidateとかでキャッシュすると良さそう

```
Remix server -> CDN -> Browser
```
の構成であれば、RemixでCache-controlヘッダーを設定したらCDN側でキャッシュされる.
https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control

state-while-revalidateはキャッシュを返すがバックグラウンドで最新データを取るようにするらしい。
SWRと概念は同じ(SWR側がそれを真似た)


### CSS in JSについて
そもそもSSRとかなり相性悪そう.

remixでは非推奨.
https://remix.run/docs/en/main/styling/css-in-js

生のCSSやtailwindとかCSS moduleが良さそう。


## 機能
### Nested routes
部分的なルーティング.

親ページの`<Outlet>`部分のみ子ページでレンダリングする感じ。

Next.jsはページごとに独立なのでパフォーマンスが上がる.

React router v6からの機能らしい。
https://www.robinwieruch.de/react-router-nested-routes/


### 親のstateが取れる
`useRouteLoaderData`で親ページのstateを取得する
https://remix.run/docs/en/main/hooks/use-route-loader-data


### エラー共通処理でErrorBoundaryをサポート & 階層ごとに設けられる
ページごとにErrorBoundaryの設定ができる。
コンポーネントがErrorBoundaryをexportするとその階層以降でも適用される。

`/events`でErrorBoundaryをexportしたら、`/events/$eventId`にも適用される。
`/events/$eventId`でexportしたらそちらが適用される。

`events`でOutletを使っていて`/events/$eventId`でエラーが出たらOutlet部分だけエラーが出るようになる。

ブラウザのレンダリングやloader/actionのエラーのみで、useEffectなどのhookやボタンクリック時の処理などでエラーが起きても拾われない。

https://remix.run/docs/en/main/guides/errors



## サーバーサイドについて
### サーバーサイド処理の概要
loader/action

loaderで取得してページコンポーネントに渡す

actionはフォーム


## クライアントサイドについて
### クライアント側でのデータ再ロードは？
`useRevalidator`を使える。ロード中かどうかも取得できる。
https://remix.run/docs/en/main/hooks/use-revalidator

挙動を確認したが、親ページのloaderに対しても実行されるっぽい。


### ロード画面について
初回のレンダリングはサーバーがHTMLを返すからロードの考慮は不要だし何もしようがない。

クライアントからの遷移の場合、Outletなど差分のローディングやページのローディングが生じる。

`useNavigation`を使うことでローディングかどうかの取得ができるので、それをみてコンポーネントで表示を変えたりもできる。
https://remix.run/docs/en/main/hooks/use-navigation


## 注意点
### フォルダ階層のルーティング
routes直下以外は無視される。
`/events/$eventId`をフォルダ階層にそのまま`routes/events/$eventId/index.tsx`とかにしてもルーティングされない.
https://remix.run/docs/en/main/discussion/routes#conventional-route-folders
