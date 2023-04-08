# Project Base CLI 

### THIS IS ALPHA [[0.0.4](https://github.com/isuke01/dk-cli)]

Since this is in the testing/alpha/proof of conceptthere are issues to be expected.

Hace a look into [ISSUES](https://github.com/isuke01/dk-cli/issues) to get more informations.

The TODO list is really long, script is missing most of the error handlers etc.

## How to start
- For now this works only for MAC OS.
- The tool ment to be used with LOCAL WP install at this point in most cases.
- Run the command in the project base root.

Install/Update: 

```bash
$ npm install -g pbdk-cli
```

Uninstall: 

```bash
$ npm uninstall -g pbdk-cli
```

Usage

```bash
$ pbdk-cli # To run CLI menu

$ pbdk-cli -h # To help
$ pbdk-cli -v # To show version
```

## --- Tools ---
There are numerous of tools provided. There is plan to add more especially related to setting up project.

## Run Composer install
The opton just runs the composer install. 
I'd recommend at this point to run command manually.

## Run npm install
The opton just runs the nvm use 16 && npm install. 

## Fix WP CLI
- Will create `wp-cli.yml` file automatically if not exists.
- Will add into `wp-cli.yml` require cli local file config.
- Will create `wp-cli.local.php` file automatically if not exists.
- Will automatically set up the ENV mysql socket address for current project (LOCAL WP).

## Set WP Salts
It going to set .env varibles for the salts.

## SET DB
This option allows to set up ENV varribles related to WP DB, by default it going to use base local settings.

## Quit
Quit
