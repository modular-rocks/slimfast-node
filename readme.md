# Slimfast Node

Automatically modularise your codebase!

## Installation

`npm install @modular-rocks/slimfast-node`

or 

`yarn add @modular-rocks/slimfast-node` 


## Usage

Documenation coming tomorrow... (no really, it is). For now take a look at `/src/slimfast/index.test.ts` and the [workspace-node](https://github.com/modular-rocks/workspace-node) config.

```
    import Slimfast from '@modular-rocks/slimfast-node'

    const files: [string, string][] = [['/path/to/file', code]]; // example

    const opts: SlimFastOpts = {
      files, // optional, will use src and read the files if omitted
      src: '/path/to/directory',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const slimFast = new Slimfast(opts);
    await slimFast.run(); // wrap this in an async function if you want it to wait
```

## Examples

Examples coming soon...

## License

Apache 2.0