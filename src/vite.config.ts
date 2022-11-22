import { SearchPlugin } from 'vitepress-plugin-search';
import { defineConfig } from "vite";

// @docs https://github.com/nextapps-de/flexsearch.
const searchOpt = {
	tokenize: "full",
    resolution: 9
}

export default defineConfig({
	plugins: [SearchPlugin( searchOpt )],
});