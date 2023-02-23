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
      { text: 'DK CLI', link: '/dk-cli/' },
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
            { text: 'Use blocks as template part', link: '/general/guides/use-blocks-as-template-parts' },
            { text: 'Extend core block', link: '/general/guides/extend-wp-paragraph' },
            { text: 'WP CLI Helpers', link: '/general/guides/wp-cli-helpers' },
            { text: 'PHP switch', link: '/general/guides/php-switch-mac' },
          ]
        },
      ],
      '/t2/': [
        // {
        //   text: 'Guide',
        //   items: [
        //     // This shows `/guide/index.md` page.
        //     { text: 'First block', link: '/t2/' },
        //     { text: 'Extend block', link: '/t2/' }, // /guide/one.md
        //     { text: 'Something else', link: '/t2/' } // /guide/two.md
        //   ]
        // },
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
            // { text: 'Factbox', link: '/t2/blocks/factbox' },
            { text: 'Link list', link: '/t2/blocks/link-list' },
            { text: 'Featured content layout', link: '/t2/blocks/featured-content-layout' },
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