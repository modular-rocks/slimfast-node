import { NodePath, Node } from '@babel/traverse';

export default (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  const { node } = path;

  return node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression';
};
