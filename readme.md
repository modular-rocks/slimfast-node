# Slimfast Node

Automatically modularise your codebase! Put your codebase on a diet!

## Installation

`npm install @modular-rocks/slimfast-node`

or 

`yarn add @modular-rocks/slimfast-node` 

## Disclaimer 

This is **experimental** and still very much **WIP**, but its also very customisable, so its already ready to use and customise.

## Usage

Slimfast is built on top of [Workspace](https://github.com/modular-rocks/workspace), specifically [workspace-node](https://github.com/modular-rocks/workspace-node). Make sure you're familar with Workspace as its the Slimfast base (Its very simple!).

If you want to see its basic usage, take a look [here](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/index.test.ts).

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
It accepts the same options as a [Workspace](https://github.com/modular-rocks/workspace) and uses `Workspace` to create a [virtual copy of your codebase](https://github.com/modular-rocks/slimfast/blob/main/src/index.ts#L10), called `original` and immediately creates a copy called `refactored`, which is changed when `run` is invoked.

## Workspace pipeline

Workspace has a [pipeline functionality](https://github.com/modular-rocks/workspace/tree/main/src/workspace/pipeline) of blocking functions that are invoked in order; none of the functions will begin until the last is complete. 

Although the pipeline can be [overridden in the options](https://github.com/modular-rocks/workspace/tree/main/src/workspace/pipeline), the default pipeline for `Slimfast` is [Extract](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/extract/index.ts), [Name](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/name/index.ts) and [Build](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/build/index.ts), each of which can be overridden by passing a `function` under the corresponding name, placed directly in the main options hash:

| Option | Description | Type | 
| -------- | -------- | -------- |
| extract | Extracts `AST PathNodes`, invoking `visitors` | Function |
| name | Adds a `name` and `folder` to each AST PathNode | Function |
| build | Builds the new ASTs by wrappinng the PathNodes into functions and applying the relevant `import statements` | Function |

[Name](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/name/index.ts) is very simple and in most cases should be overridden - modern LLMs like GPT do a great job at naming functions.

[Extract](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/extract/index.ts) invokes an array of `visitors`, more on that in the next section.

[Build](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/build/index.ts) has default functionality but can be customised with the following options (which can be placed directly in the main options hash):

| Option | Description | Type | 
| -------- | -------- | -------- |
| wrap | Wraps the `PathNode` in an AST, with relevant `import statements`` to be placed into a newfile | Function |
| replace | Replaces the `PathNode` in the AST with a callee | Function |
| functionGenerator | Wraps the `PathNode` inside `wrap` in a function | Function |
| jsxGenerator | Wraps the `PathNode` inside `wrap` in a JSX component, if it contains JSX | Function |
| functionReplacer | Replaces the `PathNode` in the AST with a callee function | Function |
| jsxReplacer | Replaces the `PathNode` in the AST with a callee component, if it contains JSX | Function |

## Visitors

The [Extract](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/pipeline/extract/index.ts) function invokes visitors in order. Each `Visitor` visits the code and extracts a `PathNode` from the `AST` that matches a criteria defined by its `contraints`. 

By default, only the [Expression Visitor](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/visitors/expression/index.ts) is added to the pipeline. But in general, the idea is to start with a general visitor, like the **Expression Visitor** and then follow on with more specific visitors by including them later in the array.

Each visitor is unique, with unique constraints, hard coded, and must extend from [Visitor](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/visitors/visitor/index.ts).

The Visitors array can be overridden in the main options:

| Option | Description | Type | 
| -------- | -------- | -------- |
| visitors | An array of visitors, each extending from [Visitor](https://github.com/modular-rocks/slimfast-node/blob/main/src/slimfast/visitors/visitor/index.ts) | Function[] |

## Saving files after modularisation

After invoking the `run` method and the modularisation has taken place, you can run `save` on the `refactored` codebase to save the files.
```
slimfast.refactored.save();
```

## Examples

Examples coming soon...

## License

Apache 2.0