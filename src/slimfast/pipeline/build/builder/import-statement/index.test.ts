import unique from 'array-unique';
import { program } from '@babel/types';
import traverse, { NodePath } from '@babel/traverse';
import { Codebase, FileContainer } from '@modular-rocks/workspace-node';
import importStatement from '.';
import parser from '../../../../visitors/utils/parser';

const files: [string, string][] = [[`/path`, '']];
const opts: SlimFastOpts = {
  files,
  src: '/',
  extensions: [],
  ignoredFiles: [],
  ignoredImports: [],
  packageContents: {},
};
const codebase = new Codebase(opts);
const file = new FileContainer(`/path`, '', codebase);

const ast = parser('4 * 5');
let nodePath: NodePath | null = null;

traverse(ast, {
  enter(path) {
    nodePath = path;
  },
});

describe('Combine imports', () => {
  test('It modularises', async () => {
    if (nodePath) {
      const statement = importStatement('module', '/path/to/folder', '/path/to', nodePath);
      expect(file.print(statement)).toBe('import module from "./to/folder";');
    }
  });
});
