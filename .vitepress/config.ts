export default {
  // base: '/test/',
  lang: 'en-US',
  title: 'Dekode',
  description: 'Dekode documentation',
  srcDir: 'src',
  //outDir: "./.vitepress/out",
  head: [
    ['meta', { name: 'theme-color', content: 'red' }],
  ],
  themeConfig: {
    logo: './logo.png',
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
      '/t2/': [
        {
          text: 'Guide',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'First block', link: '/t2/' },
            { text: 'Extend block', link: '/t2/' }, // /guide/one.md
            { text: 'Something else', link: '/t2/' } // /guide/two.md
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
            { text: 'Accordion', link: '/t2/blocks/accordion' },
            { text: 'Byline', link: '/t2/blocks/byline' },
            { text: 'Factbox', link: '/t2/blocks/factbox' },
          ]
        },
        {
          text: 'Extensions',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'Index', link: '/guide/' }, // /guide/index.md
            { text: 'One', link: '/guide/one' }, // /guide/one.md
            { text: 'Two', link: '/guide/two' } // /guide/two.md
          ]
        }
      ],
    }
  }
}