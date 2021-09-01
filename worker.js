const URL = 'https://raw.githubusercontent.com/larrrssss/icao-to-airport/master/airports.json';

addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(event) {
  const { request } = event;
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api')) {
    return new Response(JSON.stringify({ pathname }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let icao = pathname.split('/')[1];

  if (!icao || icao.length !== 4) {
    return new Response(JSON.stringify({ message: 'Not found', status: 404 }), {
      headers: { 'Content-Type': 'application/json' },
    });;
  }

  icao = icao.toUpperCase();

  const cacheKey = new Request(new URL(request.url).toString(), request);
  const cache = caches.default;

  let response = await cache.match(cacheKey);

  if (!response) {
    const res = await fetch(URL);
    const airports = await res.json();

    if (airports[icao]) {
      response = new Response(JSON.stringify(airports[icao]), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      response = new Response(JSON.stringify({ message: 'Not found', status: 404 }), {
        headers: { 'Content-Type': 'application/json' },
      });;
    }
    response.headers.append('Cache-Control', 'max-age=2592000');

    event.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}
