# ICAO Code to Airport

Cloudflare worker to get a full airport object from an icao code

## Usage

Make a `GET` request to following url

```
https://airports.larrrssss.workers.dev/:icao
```

## Airport Object

```json
{
  "icao":"EDDF",
  "iata":"FRA",
  "name":"Frankfurt am Main International Airport",
  "city":"Frankfurt-am-Main",
  "state":"Hesse",
  "country":"DE",
  "elevation":364,
  "lat":50.0264015198,
  "lon":8.543129921,
  "tz":"Europe/Berlin"
}
```
