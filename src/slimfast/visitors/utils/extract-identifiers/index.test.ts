import traverse, { NodePath, Node, Binding } from '@babel/traverse';
import extractIdentifiers from './index';
import parser from '../parser';

const str = JSON.stringify;

describe('Extract Identifiers', () => {
  test('', () => {
    const code = `let result = x * e * o;`;
    const ast = parser(code);
    let rootPath: NodePath | null = ast;
    const extracted: Map<NodePath, RandomObject> = new Map();
    traverse(ast, {
      VariableDeclaration(path) {
        const initNode = path.node.declarations[0].init;
        rootPath = path.findParent((p) => p.node === initNode);
      },
    });
    if (rootPath !== null) {
      const data: RandomObject = {};
      extractIdentifiers(rootPath, data);
      const variables = data.toInject.map((x: Binding) => x.identifier.name);
      expect(str(variables)).toBe(str(['x', 'e', 'o']));
    }
  });
  test('', () => {
    const code = `import x from 'x-module'; let result = x * e * o;`;
    const ast = parser(code);
    let rootPath: NodePath | null = ast;
    const extracted: Map<NodePath, RandomObject> = new Map();
    traverse(ast, {
      VariableDeclaration(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const data: RandomObject = {};
      extractIdentifiers(rootPath, data);
      const imports = data.toImport.map((x: Binding) => x.identifier.name);
      expect(str(imports)).toBe(str(['x']));
    }
  });
});
