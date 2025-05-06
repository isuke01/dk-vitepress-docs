export default {
  // base: '/test/',
  lang: 'en-US',
  title: 'DK\'s Docs',
  description: 'Docs and guides for T2, Dekode, Gutenberg',
  srcDir: 'src',
  markdown: {
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    theme: {
      light: 'min-light',
      dark: 'min-dark',
    },
    lineNumbers: true,
  },
  //outDir: "./.vitepress/out",
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/isuke01/dk-vitepress-docs' },
    ],
    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2022-${new Date().getFullYear()}`
    },
    nav: [
      //{ text: 'DK CLI', link: '/dk-cli/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'T2', link: '/t2/getting-started' },
      { text: 'T2.teft.io', link: 'https://t2.teft.io', target: '_blank' },
      { text: 'DK Library', link: 'https://library.dekode.no', target: '_blank' },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },

      // ...
    ],
    sidebar: {
      // This sidebar gets displayed when user is
      // under `guide` directory.
      '/guides/': [
        {
          text: 'JS',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'Body clase based on blocks', link: '/guides/js/adjust-body-class-base-on-blocks' },
            { text: 'JS Width/height var to body', link: '/guides/js/add-height-width-var' },
          ]
        },
        {
          text: 'Gutenberg',
          items: [
            { text: 'Extend core block', link: '/guides/gutenberg/extend-gutenberg-block' },
            { text: 'Server side component', link: '/guides/gutenberg/server-side-render-component' },
            { text: 'Select block settings', link: '/guides/gutenberg/select-block-types-data' },
          ]
        },
        {
          text: 'T2',
          items: [
            { text: 'Use blocks as template part', link: '/guides/t2/use-blocks-as-template-parts' },
            { text: 'T2 Media Queries', link: '/guides/t2/media-queries' },
            { text: 'T2 Margins V3', link: '/guides/t2/t2-margins-v' },
          ]
        },
        {
          text: 'Wordpress',
          items: [
            { text: 'Modify wp_remote_post', link: '/guides/wordpress/modify-request-in-wp-remote-post' },
          ]
        },
        {
          text: 'Other',
          items: [
            { text: 'WP CLI Helpers', link: '/guides/other/wp-cli-helpers' },
            { text: 'PHP switch', link: '/guides/other/php-switch-mac' },
            { text: 'SSL CER', link: '/guides/other/ssl-cer' },

          ]
        },
        
      ],
      '/t2/': [
        { text: 'Guides/T2', link: '/guides/' },
        {
          text: 'Helpers, hooks and filtes',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'Helpers', link: '/t2/helpers/' },
          ]
        },
        {
          text: 'Blocks',
          items: [
            // This shows `/guide/index.md` page.
            // { text: 'Accordion', link: '/t2/blocks/accordion' },
            // { text: 'Byline', link: '/t2/blocks/byline' },
            { text: 'T2 featured image', link: '/t2/blocks/t2-featured-image' },
            // { text: 'Link list', link: '/t2/blocks/link-list' },
            // { text: 'Featured content layout', link: '/t2/blocks/featured-content-layout' },
          ]
        },
        // {
        //   text: 'Extensions',
        //   items: [
        //     // This shows `/guide/index.md` page.
        //     { text: 'Index', link: '/guide/' }, // /guide/index.md
        //     { text: 'One', link: '/guide/one' }, // /guide/one.md
        //     { text: 'Two', link: '/guide/two' } // /guide/two.md
        //   ]
        // }
      ],
    }
  }
}