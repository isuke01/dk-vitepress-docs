# WP CLI Helpers

## CLI replace DB strings

Wp cli repalce db strings command

<script setup>

import { ref, computed } from 'vue'
const stringToReplace = ref('https://old-domain.com')
const newString = ref('http://new-domain.com')
const isMultisite = ref(true)
const networkOpt = computed(() => isMultisite.value ? ` --network` : '');

const textDomain = ref('textdomain')
const themeDirName = ref('dekode')
const textDomainUseThemeDir = ref(false)
const textDomainLocation = computed(() => textDomainUseThemeDir.value ? `themes/${themeDirName.value}/` : ``);


</script>

### Set domains:
<div class="input-wrapp">
	<label for="string-to-replac">String to replace: </label>
	<input id="string-to-replac" type="text" v-model="stringToReplace" />
</div>

<div class="input-wrapp">
	<label for="new-string">New string: </label>
	<input id="new-string" type="text" v-model="newString" />
</div>

<div class="input-wrapp">
	<label for="use-network">Is network: </label>
	<input id="use-network" type="checkbox" v-model="isMultisite" />
</div>

### Cli command:
Copy CLI command to replace url for your DB strigns.
``` bash-vue
wp search-replace "{{stringToReplace}}" "{{newString}}" --recurse-objects --skip-columns=guid{{networkOpt}}
```


## CLI Generate translations file

WP CLI generate pot, translation file command

### Set varribles:
<div class="input-wrapp">
	<label for="text-domain">Textdomain: </label>
	<input id="text-domain" type="text" v-model="textDomain" />
</div>
<div class="input-wrapp">
	<label for="use-dir-location">Generate into theme directory: </label>
	<input id="use-dir-location" type="checkbox" v-model="textDomainUseThemeDir" />
</div>
<div v-if="textDomainUseThemeDir" class="input-wrapp">
	<label for="them-dir-name">Theme directory name: </label>
	<input id="them-dir-name" type="text" v-model="themeDirName" />
</div>

### Cli command:

``` bash-vue
wp i18n make-pot . {{textDomainLocation}}languages/{{textDomain}}.pot --exclude=\".github,plugins,public/content/plugins,vendor,public/wp,node_modules,tests\" --slug={{textDomain}}
```