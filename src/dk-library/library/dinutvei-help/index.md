This is simply help post type with filters for the Dinutvei theme. 

The reason why bloock exists here - the project build for some reason was crashing with interactivity API.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/dinutvei-help:1.1.4
```

## Can be used as an example

### Interactivity API

This block can be provided as an example of usage Interacitvity API where filters, search and pagination are used without reload page.

### ACF As an filters

This block can be provided as an example of usage ACF as an filters where filters block where it renders filters from ACF fields and then use it to filter posts with multiple selct

### Block allows to use custom template for archive block:

By placing a template file in the theme folder, you can customize the blocks output. The block will look for a template file in the following order:
```php
'dekode-library/dinutvei-help/archive-template.php'
```
```php
'dekode-library/dinutvei-help/card-template.php'
```


#### The block was based on Dekode QA Block.