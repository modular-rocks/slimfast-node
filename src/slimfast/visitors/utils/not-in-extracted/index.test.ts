import traverse, { NodePath, Node } from '@babel/traverse';
import notInExtracted from './index';
import parser from '../parser';

describe('Not in extracted', () => {
  const code = `let result = ((2 + 3) * 4 - Math.sqrt(9)) / (6 % 2) + Math.pow(2, 5) - parseFloat('10.5') + parseInt('100', 2);`;
  const ast = parser(code);

  test('', () => {
    let rootPath: NodePath = ast;
    const extracted: Map<NodePath, RandomObject> = new Map();
    traverse(ast, {
      enter(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      extracted.set(rootPath, {});
      const result = notInExtracted(rootPath, extracted);
      expect(result).toBe(false);
    }
  });
  test('', () => {
    let rootPath: NodePath = ast;
    const extracted: Map<NodePath, RandomObject> = new Map();
    traverse(ast, {
      enter(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const result = notInExtracted(rootPath, extracted);
      expect(result).toBe(true);
    }
  });
});
