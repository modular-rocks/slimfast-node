import unique from 'array-unique';
import { resolve, dirname, extname } from 'path';
import { program } from '@babel/types';
import { NodePath } from '@babel/traverse';

import wrap from './wrap';
import replaceInOriginalFile from './replace';
import importStatement from './import-statement';
import combineImports from './combine-imports';

export default (path: NodePath, data: RandomObject, parentPath: string, options: SlimFastOpts) => {
  const { name, folder, toImport } = data;

  path = path && path.isJSXOpeningElement() ? path.parentPath : path;

  const pathname = resolve(dirname(parentPath), `./${folder}/${name + extname(parentPath)}`);

  const nodes: any[] = combineImports(pathname, dirname(pathname), unique(toImport));
  const body = (options.wrap || wrap)(path, data, options);
  nodes.push(body);

  (options.replace || replaceInOriginalFile)(name, path, data, options);

  return {
    pathname,
    ast: program(nodes),
    import: importStatement(name, pathname, parentPath, path),
  };
};
