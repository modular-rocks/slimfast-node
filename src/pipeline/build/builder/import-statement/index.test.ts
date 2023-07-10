import unique from 'array-unique';
import { program } from '@babel/types';
import traverse, { NodePath } from '@babel/traverse';
import { Codebase, FileContainer } from '@modular-rocks/workspace-node';
import importStatement from '.';
import parser from '../../../../visitors/lib/parser';

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

describe('Combine imports', () => {
  test('It modularises', async () => {
    const statement = importStatement('module', '/path/to/folder', '/path/to');
    expect(file.print(statement)).toBe('import module from "./to/folder";');
  });
});
