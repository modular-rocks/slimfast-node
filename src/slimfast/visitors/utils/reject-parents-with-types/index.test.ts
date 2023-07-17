import traverse, { NodePath, Node } from '@babel/traverse';
import rejectParents from './index';
import parser from '../parser';

describe('Rejected Parents with types', () => {
  const code = `let result = ((2 + 3) * 4 - Math.sqrt(9)) / (6 % 2) + Math.pow(2, 5) - parseFloat('10.5') + parseInt('100', 2);`;
  const ast = parser(code);
  let rootPath: NodePath | null = null;
  const data = {};

  traverse(ast, {
    Expression(path) {
      rootPath = path;
      path.stop();
    },
  });
  test('', () => {
    const blocklisted: string[] = ['VariableDeclarator'];
    if (rootPath !== null) {
      const result = rejectParents(rootPath, blocklisted);
      expect(result).toBe(false);
    }
  });
  test('', () => {
    const blocklisted: string[] = ['ArrayExpression'];
    if (rootPath !== null) {
      const result = rejectParents(rootPath, blocklisted);
      expect(result).toBe(true);
    }
  });
});
