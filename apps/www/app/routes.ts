import { type RouteConfig } from '@remix-run/route-config';
import { remixRoutesOptionAdapter } from '@remix-run/routes-option-adapter';

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route('/', 'routes/index.tsx', { index: true });
    route('/login', 'routes/login.tsx');

    // Home
    route('/home', 'routes/home/layout.tsx', () => {
      route('', 'routes/home/index.tsx', { index: true });
      route('posts', 'routes/home/posts.tsx');
      route('profile', 'routes/home/profile.tsx');
      route('lab', 'routes/home/lab.tsx');
    });

    // Post
    route('/posts', 'routes/posts/index.tsx');
    route('/post/:id', 'routes/post/$id.tsx');
    route('/post/:id/edit', 'routes/post/$id.edit.tsx');
    route('/post/create', 'routes/post/create.tsx');

    // Tag
    route('/tag/:tag', 'routes/tag/$tag.tsx');

    // Search
    route('/search', 'routes/search.tsx');

    // Seed
    route('/seeds', 'routes/seeds/index.tsx');
    route('/seeds/:slug', 'routes/seeds/$slug.tsx');

    // API
    route('/upload', 'routes/api/upload.tsx');
    route('/tool/entitiesFromText', 'routes/api/entitiesFromText.tsx');

    // Sitemap
    route('/sitemap.xml', 'routes/sitemaps/index.tsx');
    route('/sitemaps/posts.xml', 'routes/sitemaps/posts/index.tsx');
    route('/sitemaps/posts/:year.xml', 'routes/sitemaps/posts/$year.tsx');
    route('/sitemaps/seeds.xml', 'routes/sitemaps/seeds.tsx');

    // Static
    route('/privacy', 'routes/privacy.tsx');
    route('/terms', 'routes/terms.tsx');

    route('/logout', 'routes/logout.tsx');
    route('/robots.txt', 'routes/robots[.]txt.tsx');
  });
}) satisfies RouteConfig;
