import traverse, { NodePath, Node } from '@babel/traverse';
import constraint from './index';
import parser from '../../parser';

describe('Contains variables in other scopes', () => {
  test('', () => {
    const code = `
    let yes = 'yes';
    function change() {
      yes = 'no';
    }`;
    const ast = parser(code);
    let rootPath: NodePath | null = null;
    const data = {};

    traverse(ast, {
      VariableDeclaration(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const result = constraint(rootPath, data, {}, ast);
      expect(result).toBe(true);
    }
  });

  test('', () => {
    const code = `let yes = 'yes'`;
    const ast = parser(code);
    let rootPath: NodePath | null = null;
    const data = {};

    traverse(ast, {
      VariableDeclarator(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const result = constraint(rootPath, data, {}, ast);
      expect(result).toBe(false);
    }
  });
});
