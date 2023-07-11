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

  const nodes: any[] = combineImports(pathname, dirname(pathname), unique(toImport));
  const body = wrap(path, data);
  nodes.push(body);

  replaceInOriginalFile(name, path, data);

  return {
    pathname,
    ast: program(nodes),
    import: importStatement(name, pathname, parentPath),
  };
};
