# SSL Certificate Guide


## Using mkcert

The documentation [mkcert](https://github.com/FiloSottile/mkcert)

## usage

(MACOS use homebrew)

1. Install mkcert
```bash
brew install mkcert
mkcert -install
```

2. Create a certificate
```bash
mkcert localhost // or any other domain
mkcert example.com "*.example.com" // wildcard
```

3. Set cert for webpack localhost
```bash
webpack-dev-server --ssl-cert localhost.pem --ssl-key localhost-key.pem
```

Or you can set it by any other way.

### Bonus tips

- You do not need NODE_TLS_REJECT_UNAUTHORIZED=0 for browsers. That disables TLS verification in Node.js, not in browsers — and is mainly useful when Node is making an HTTPS request to a server with a self-signed cert.

- Consider setting up localhost DNS aliases like local.example.test, and use mkcert local.example.test, which can be handy when testing multiple environments.

### Fire Fox issues

If you're on macOS and using Firefox, trust in the macOS Keychain may not be picked up by Firefox by default.

Go to `about:config`
Set: `security.enterprise_roots.enabled → true`