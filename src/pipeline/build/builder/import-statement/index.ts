import { join, relative, dirname, basename } from 'path';
import { importDeclaration, importDefaultSpecifier, identifier, stringLiteral } from '@babel/types';

export default (name: string, pathname: string, parentPath: string) => {
  const parentDirectory = relative(dirname(parentPath), dirname(pathname));
  const newRelativePath = `./${join(parentDirectory, basename(pathname))}`;

  return importDeclaration([importDefaultSpecifier(identifier(name))], stringLiteral(newRelativePath));
};
