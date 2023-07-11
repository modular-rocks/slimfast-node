import traverse, { NodePath } from '@babel/traverse';

export default (path: NodePath) => {
  let hasAwait = false;

  const visitor = {
    AwaitExpression() {
      hasAwait = true;
    },
  };

  traverse(path.node, visitor, path.scope, path.parentPath);

  return hasAwait;
};
