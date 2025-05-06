# Modify request sent in wp_remote_post
This method allows to modify the request sent in `wp_remote_post` function. Could be usefully when dealing with third party Plugin you can't modify the request directly.

## Usage

Based on WP Core request we can use the `pre_http_request` filter bail the current request and replace it with a new one. [Core Code](https://github.com/WordPress/wordpress-develop/blob/1651947e3dc6ba14e227cf5f2045df6c16908045/src/wp-includes/class-wp-http.php#L277-L277)

This hook fires before WordPress makes the HTTP request, giving you full control — including modifying the URL.

```php
add_filter( 'pre_http_request', 'intercept_and_redirect_wp_remote_post', 10, 3 );
function intercept_and_redirect_wp_remote_post( $preempt, $args, $url ) {
    // Only intercept POST requests.
    if ( isset( $args['method'] ) && strtoupper( $args['method'] ) === 'POST' ) {
        
        // Match the URL you want to redirect.
        if ( strpos( $url, 'example.com/api/' ) !== false ) {
            // Rewrite the URL
            $new_url = str_replace( 'example.com', 'staging.example.com', $url );
            
            // Re-run the POST request with the new URL.
            return \wp_remote_post( $new_url, $args );
        }
    }

    // Allow normal request to proceed
    return false;
}
```

### 💡 Notes:
- This **intercepts all HTTP requests**, so keep it targeted.
- It works even if the `wp_remote_post()` is buried deep inside another plugin.
- Return `false` to let WordPress proceed as usual when your condition doesn’t match.


### "Hacky way" if above doesn't work

This is a bit more hacky, but works in some cases.

```php
function modify_t2_newsletter_make_url( \CurlHandle $handle, array $parsed_args, string $url ): void {
	if ( str_contains( $url, 'https://subscribers.dialogapi.no/api/public/v2/subscribers' ) ) {
		curl_setopt( $handle, CURLOPT_URL, 'https://subscribers.dialogapi.no/api/public/v2/signup_forms/8/signup' );
	}
}
\add_action( 'http_api_curl', __NAMESPACE__ . '\\modify_t2_newsletter_make_url', 10, 3 );
```