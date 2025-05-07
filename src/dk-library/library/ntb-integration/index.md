# NTB integration

![Screenshot](./screenshot.png)

Connect a website with the public NTB API to fetch the press releases and add them to client's website database.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/ntb-integration:*
```

## How it works

The plugin will import the NTB press releases from a specific publisher ID into a configured post type (please note that this plugin does not register any new custom post type or taxonomy). The import process runs using the WP Cron system, by default every 15 min (configurable). Please make sure the project has the DISABLE_WP_CRON set to false.


### Configuration
Use the library.json plugin or just the hook `library/ntb_integration/config` to filter the configuration array in your theme.

* @type string $baseUrl                NTB endpoint base url.
* @type int    $publisherId            The NTB publisher ID (mandatory).
* @type string $targetPostType         The post type key to import the press releases to.
* @type bool   $featuredImage          Set a featured image based on mainImage or first image.
* @type string $keywordsTargetTaxonomy The taxonomy key to store the NTB press release keywords (it should exist).
* @type string $stampTaxonomy          The taxonomy to store the stamp term (it should exist).
* @type string $stampTerm              The term slug to use as the stamp, it will append the term to existing terms.
* @type int    $authorId               The author ID to assign the imported press releases to.
* @type string $cronInterval           The interval for the cron job. If numeric, it will be treated as min. If not set, it will default to hourly.
* @type bool   $deletePostsNotInFeed   Delete posts that are not in the feed.

#### Example using the filter hook

```php
\add_filter( 'dekode-library/ntb_integration/config', __NAMESPACE__ . '\\ntb_integration_config' );

/**
 * Filter NTB integration config
 *
 * @param array $config NTB integration config.
 * @return array
 */
function ntb_integration_config( array $config ): array {
	return \wp_parse_args( [
		'baseUrl' => 'https://kommunikasjon.ntb.no',
		'publisherId' => 99999,
		'targetPostType' => 'news',
		'keywordsTargetTaxonomy' => '',
		'stampTaxonomy' => 'news_category',
		'stampTerm' => 'press-release',
		'authorId' => 0,
		'cronInterval' => '15',
		'deletePostsNotInFeed' => false,
	], $config );
}
```

#### Example using library.json

```json
{
    "dekode-library/ntb-integration": {
		"publisherId": 99999,
		"targetPostType": "news"
    }
}

```