import unique from 'array-unique';
import { resolve, dirname, extname } from 'path';
import { program } from '@babel/types';
import { NodePath } from '@babel/traverse';

import wrap from './wrap';
import replaceInOriginalFile from './replace';
import importStatement from './import-statement';
import combineImports from './combine-imports';

export default (path: NodePath, data: RandomObject, parentPath: string) => {
  const { name, folder, toImport } = data;

  const pathname = resolve(dirname(parentPath), `./${folder}/${name + extname(parentPath)}`);
  const body = wrap(path, data);

  replaceInOriginalFile(name, path, data);

  const nodes: any[] = combineImports(pathname, dirname(pathname), unique(toImport));
  nodes.push(body);

  return {
    pathname,
    ast: program(nodes),
    import: importStatement(name, pathname, parentPath),
  };
};
