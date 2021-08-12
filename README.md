# Github regex extract action [![Tests](https://github.com/Vendic/github-regex-extract-action/actions/workflows/tests.yml/badge.svg)](https://github.com/Vendic/github-regex-extract-action/actions/workflows/tests.yml) 
Extract task ids from commit messages, branch and pull request title

### Usage:
```yaml
            -   name: Extract task id's from release body
                uses: Vendic/github-regex-extract-action@master
                id: matches
                with:
                    pattern: '[A-Z]{2,5}-[0-9]{1,5}'
                    pattern_flags: 'gm'
                    text: ${{ github.event.release.body }}
```

Your matches will be available via the `${{ steps.matches.outputs.matches }}` variable.

