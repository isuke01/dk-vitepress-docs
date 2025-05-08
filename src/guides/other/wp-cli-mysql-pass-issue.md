# Failed to get current SQL modes.

The issue: `Reason: ERROR 2059 (HY000): Authentication plugin 'mysql_native_password' For LocalWP WP CLI`

This is when you have upgraded MYSQL to 9 which is not backward compatible in that case [[More here]](https://github.com/Homebrew/homebrew-core/issues/180498)

### The fix
Not perfect but soluton (but the simples one)

Downgrade to V8
```bash
brew install mysql-client@8.4
brew unlink mysql
brew link mysql-client@8.4
```
## #Or
(which I did)
```bash
brew uninstall mysql
brew install mysql@8.0
brew link mysql@8.0 --force
```