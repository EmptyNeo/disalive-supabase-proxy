# Supabase Proxy

> An opinionated Supabase proxy

## What can it do?

* [x] Reverse proxy to the official Supabase endpoint, compatible with the official client
* [x] Additional client logging if needed
* [x] Information redaction post-logging, pre-proxing if needed
* [x] Set JWT token in a long-term `httpOnly` cookie (more secure auth approach for browser-side)
* [x] Cookie to auth header translation for the reverse proxy
## Usage

> This proxy is meant to be used with the official instance, not self-hosted options

* Update `config.js`
* Start the gateway proxy with `npm start`

## Endpoints

* `/proxy` - Reverse proxy endpoint
* `/auth/signup` - Create a user with email and password
* `/auth/signin` - Signin and return a longterm JWT cookie

## License

The Unlicense
# disalive-supabase-proxy
