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
      { text: 'Genral', link: '/general/' },
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
      '/general/': [
        {
          text: 'Guides && help',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'Server side component', link: '/general/guides/server-side-render-component' },
            { text: 'Body clase based on blocks', link: '/general/guides/adjust-body-class-base-on-blocks' },
            { text: 'Use blocks as template part', link: '/general/guides/use-blocks-as-template-parts' },
            { text: 'Extend core block', link: '/general/guides/extend-gutenberg-block' },
            { text: 'WP CLI Helpers', link: '/general/guides/wp-cli-helpers' },
            { text: 'PHP switch', link: '/general/guides/php-switch-mac' },
            { text: 'SSL CER', link: '/general/guides/ssl-cer' },
            { text: 'JS Width/height var to body', link: '/general/guides/js-add-height-width-var' },
          ]
        },
      ],
      '/t2/': [
        {
          text: 'Guide',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'T2 Media Queries', link: '/t2/guides/media-queries' },
            { text: 'T2 Margins V3', link: '/t2/guides/t2-margins-v' },
          ]
        },
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