# Carousel Wrapper

![Screenshot](./screenshot.png)
A wrapper block to make an easy carousel with your desired inner blocks. It will make a wrapper block, a slide block and
then you can choose the innerblock. It will automatically add swiper pagination and navigation.
The navigation buttons is the t2 chevron left and right.

Note: This is a very barebone style block, and you will need to style it yourself. It will just generate the functionality.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/carousel-wrapper:2.0.0
```

## Usage
Define in your theme.json what inner blocks you want to allow and what the default template should be.
If you want multiple carousels with different innerblocks you can create a blockVariation, and define the values in 
the carousel-wrapper block attributes. Everything you define in the block attributes will override the theme.json settings.

## Swiper settings in theme.json
For now you can only change the swiper settings that doesn't include importing a new swiper module. So the easy settings,
you can find here: https://swiperjs.com/get-started

## Example scenarios
- You want a carousel with only pullquotes.
- You want a carousel in hero section, include this in your block and you can swipe through images or heros
- You want carousel with videos, define the video block in the theme.json

## Example library.json
```json
{
    "dekode-library/carousel-wrapper": {
        "allowedInnerBlocks": ["core/pullquote"],
        "template": [["core/pullquote", {}]],
        "swiperSettings": {
            "loop": true, 
            "autoHeight": true
        }
    }
}

```