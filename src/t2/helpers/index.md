# T2 Helper and hooks


## Filters

`t2/blocks/available` 


## Helpers


### How do I check if T2 is activated and it's functions?

#### Check if T2 is activated

Simply use wp core function like:
```php
is_plugin_active( 't2/t2.php' )
```


#### Check if T2 feature is activated

To get currently activated T2 feature you can use:
```php
$active_extensions = \T2\Extensions\get_active_extensions();
$active_extensions = \T2\Blocks\get_active_blocks();
```

Knowing that we can make simply function that does the check:

```php
/**
 * Helper functio nto check if there is T2 feature activated.
 * Example usage: t2_is_feature_activated( 't2/newsletter' )
 *
 * @param string $feature The t2 feature e.g t2/newsletter.
 * @return bool
 */
function t2_is_feature_activated( string $feature ): bool {
	if ( ! \is_plugin_active( 't2/t2.php' ) ) {
		return false;
	}

	$t2_features = [];

	if ( function_exists( '\T2\Extensions\get_active_extensions' ) ) {
		$t2_features = array_merge( $t2_features, \T2\Extensions\get_active_extensions() );
	}

	if ( function_exists( '\T2\Blocks\get_active_blocks' ) ) {
		$t2_features = array_merge( $t2_features, \T2\Blocks\get_active_blocks() );
	}

	return in_array( $feature, $t2_features, true );
}
```