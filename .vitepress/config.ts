import generatedSidebar from './generated-sidebar.json';

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
    search: {
		  provider: 'local'
		},
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
      {
        text: 'Dekode Library',
        items: [
          { text: 'Components', link: '/dk-library/components/' },
          { text: 'Library', link: '/dk-library/library/' },
        ],
      },
      { text: 'T2', link: '/t2/getting-started' },
      { text: 'T2.teft.io', link: 'https://t2.teft.io', target: '_blank' },
      { text: '(old) DK Library', link: 'https://library.dekode.no', target: '_blank' },

      // ...
    ],
    sidebar: {
      '/dk-library/components/': generatedSidebar['components'],
      '/dk-library/library/': generatedSidebar['library'],
      '/guides/': [
        {
          text: 'JS',
          items: [
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
            { text: 'Component: BaseControl', link: '/guides/gutenberg/components-base-control' },
            { text: 'Limit post parent', link: '/guides/gutenberg/limit-post-parent-depth' },
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
            { text: 'Slow LocalWP (9.2 +) Macos', link: '/guides/other/slow-localwp-macos' },
            { text: 'Fail WP CLI `mysql_native_password`', link: '/guides/other/wp-cli-mysql-pass-issue' },
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
            { text: 'T2 featured image', link: '/t2/blocks/t2-featured-image' },
          ]
        },
      ],
    }
  }
}