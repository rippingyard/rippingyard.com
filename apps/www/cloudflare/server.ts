// 基本的なテスト用のハンドラー
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // 基本的なHTMLレスポンスでテスト
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Rippingyard.com - Test</title>
</head>
<body>
  <h1>Hello from Cloudflare Workers!</h1>
  <p>This is a test response.</p>
  <p>Path: ${url.pathname}</p>
  <p>Environment: ${env.VALUE_FROM_CLOUDFLARE}</p>
</body>
</html>
    `;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
} satisfies ExportedHandler;
