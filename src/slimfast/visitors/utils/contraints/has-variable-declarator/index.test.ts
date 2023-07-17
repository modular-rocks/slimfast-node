import traverse, { NodePath, Node } from '@babel/traverse';
import constraint from './index';
import parser from '../../parser';

describe('Has variable declarator', () => {
  test('', () => {
    const code = `yes = 'no'`;
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
      expect(result).toBe(true);
    }
  });

  test('', () => {
    const code = `yes`;
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
