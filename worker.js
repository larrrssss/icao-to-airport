const URL = 'https://raw.githubusercontent.com/larrrssss/icao-to-airport/master/airports.json';

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/api")) {
    return new Response(JSON.stringify({ pathname }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  let icao = pathname.split("/")[1];

  if (!icao || icao.length !== 4) {
    return new Response(JSON.stringify({ message: 'Not found', status: 404 }), {
      headers: { "Content-Type": "application/json" },
    });;
  }

  icao = icao.toUpperCase();

  const response = await fetch(URL);
  const airports = await response.json();

  if (airports[icao]) {
    return new Response(JSON.stringify(airports[icao]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: 'Not found', status: 404 }), {
    headers: { "Content-Type": "application/json" },
  });;
}
