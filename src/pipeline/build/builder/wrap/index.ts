import unique from 'array-unique';
import Traverse, { NodePath } from '@babel/traverse';

import {
  exportDefaultDeclaration,
  functionDeclaration,
  blockStatement,
  returnStatement,
  isBlockStatement,
} from '@babel/types';

const hasAsync = (path: RandomObject) => {
  let hasAwait = false;

  const visitor = {
    AwaitExpression() {
      hasAwait = true;
    },
  };

  Traverse(path.node, visitor, path.scope, path.parentPath);

  return hasAwait;
};

const findBlockStatement = (path: NodePath | RandomObject) => {
  const { node } = path;
  if (isBlockStatement(node)) {
    // should be node.body etc
    return node;
  }

  // jsx - Property argument of ReturnStatement expected node to be of a type ["Expression"] but instead got "JSXOpeningElement"
  return blockStatement([returnStatement(node.expression ? node.expression : node)]);
};

export default (path: NodePath, data: RandomObject) => {
  const toInject = unique(data.toInject);
  return exportDefaultDeclaration(
    functionDeclaration(
      null, // can also be BabelTypes.identifier(name), null makes it anonymous
      toInject.map((x: RandomObject) => x.identifier),
      findBlockStatement(path),
      false,
      hasAsync(path)
    )
  );
};
