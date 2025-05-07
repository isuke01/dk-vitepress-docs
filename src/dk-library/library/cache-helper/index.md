# Cache helper

![Screenshot](./screenshot.png)
A plugin that offers helper functions for Cloudflare and Redis caching.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/cache-helper:*
```

## Features
These are the current features that the plugin offers.

### Purge posts and pages that includes specific blocks
Often a block will be used to fetch queried posts and display them. An example is the featured content layout with query posts, where the client wants to display the latest posts. This feature will purge all posts containing that block if a post has been saved, ensuring that that post with that block will always have the latest post.

### Purge archives when saving a post
When saving a post, the plugin will purge the archive page for that post type. This is useful if you have a custom archive page that displays posts from that post type.

## Example library.json
```json
{
    "dekode-library/cache-helper": {
        "purgePagesWithBlock": {
            "enabled": true,                  // Enable or disable the purge.
            "postTypes": ["post", "page"],    // Which post types that should trigger purge when saving the post.
            "blocks": [                       // Which blocks to look for when purgin a posts cache.
				"t2/featured-content-layout",
				"t2/featured-query-post",
			]
        },
        "purgeCustomArchives": {
            "post": "/blog",                // The slug for the post type archive.
            "page": [
                "/page-archive",       // The slug for the page type archive.
                "/custom-page-archive" // The slug for the custom page type archive.
            ]
        }
    }
}
```