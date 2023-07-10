import {
  importSpecifier,
  identifier,
  importDeclaration,
  stringLiteral,
  importDefaultSpecifier,
  isImportDefaultSpecifier,
  ImportDefaultSpecifier,
  ImportSpecifier,
  ImportNamespaceSpecifier,
} from '@babel/types';
import unique from 'array-unique';
import { Binding } from '@babel/traverse';

import { resolve, dirname, relative } from 'path';

interface Entry {
  default?: string | null;
  named: string[];
}

type ImportSpecifierType = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;

export default function combineImports(pathname: string, folder: string, imports: Binding[]) {
  const importsBySource: Map<string, Entry> = new Map();

  imports.forEach((binding: Binding) => {
    const node: RandomObject | undefined = binding.path?.parentPath?.node;
    if (!node) return;
    const fullPath = resolve(dirname(pathname), node.source.value);
    const source = relative(folder, fullPath);

    if (!importsBySource.has(source)) {
      importsBySource.set(source, { named: [] });
    }
    const entry = importsBySource.get(source);

    node.specifiers.forEach((specifier: ImportSpecifier) => {
      if (!entry) return;
      if (isImportDefaultSpecifier(specifier)) {
        const importDefaultSpec = specifier as ImportDefaultSpecifier;
        entry.default = importDefaultSpec.local.name;
        return;
      }
      entry.named.push(specifier.local.name);
    });
  });

  const entries = Array.from(importsBySource.entries());
  return entries.map(([source, entry]) => {
    const specifiers: ImportSpecifierType[] = [];

    if (entry.default) {
      specifiers.push(importDefaultSpecifier(identifier(entry.default)));
    }

    unique(entry.named).forEach((specifier: string) => {
      const node: ImportSpecifierType = importSpecifier(identifier(specifier), identifier(specifier));
      specifiers.push(node);
    });

    return importDeclaration(specifiers, stringLiteral(source.replace(/(\.\.\/)([^.])/g, './$2')));
  });
}
