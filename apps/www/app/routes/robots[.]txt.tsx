export const loader = () => {
  const robotText = `
      User-agent: *
      Allow: /
  
      Sitemap: https://www.rippingyard.com/sitemap.xml
      `;
  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=432000',
    },
  });
};
