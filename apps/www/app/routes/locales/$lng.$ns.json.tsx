import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { LoaderFunctionArgs } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const { lng, ns } = params;

  if (!lng || !ns) {
    throw new Response('Not Found', { status: 404 });
  }

  try {
    const filePath = resolve(
      '../../packages/resources/i18n/locales',
      lng,
      `${ns}.json`
    );

    const content = await readFile(filePath, 'utf-8');

    return new Response(content, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    throw new Response('Not Found', { status: 404 });
  }
}
