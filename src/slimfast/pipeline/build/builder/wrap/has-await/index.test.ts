import unique from 'array-unique';
import { program } from '@babel/types';
import traverse, { NodePath } from '@babel/traverse';
import { Codebase, FileContainer } from '@modular-rocks/workspace-node';
import hasAwait from '.';
import parser from '../../../../../visitors/utils/parser';

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

describe('Has Await', () => {
  test('', async () => {
    const code = `
      async () => {
        await get();
      }
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      Program(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const contains = hasAwait(rootPath);
      expect(contains).toBe(true);
    }
  });
  test('', async () => {
    const code = `
      () => {
        get();
      }
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      Program(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const contains = hasAwait(rootPath);
      expect(contains).toBe(false);
    }
  });
});
