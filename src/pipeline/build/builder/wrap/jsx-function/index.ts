import unique from 'array-unique';
import { NodePath } from '@babel/traverse';
import {
  exportDefaultDeclaration,
  functionDeclaration,
  blockStatement,
  returnStatement,
  identifier,
  variableDeclaration,
  variableDeclarator,
  objectProperty,
  objectPattern,
  Statement,
} from '@babel/types';
import hasAwait from '../has-await';

export default (path: NodePath, data: RandomObject) => {
  const toInject = unique(data.toInject);

  const nodes: Statement[] = [];
  if (toInject.length) {
    nodes.push(
      variableDeclaration('const', [
        variableDeclarator(
          objectPattern(toInject.map((x: RandomObject) => objectProperty(x.identifier, x.identifier, false, true))),
          identifier('props')
        ),
      ])
    );
  }

  const el: any = path.node;
  nodes.push(returnStatement(el));

  const block = blockStatement(nodes);

  return exportDefaultDeclaration(
    functionDeclaration(
      null, // can also be BabelTypes.identifier(name), null makes it anonymous
      [identifier('props')],
      // toInject.map((x: RandomObject) => x.identifier),
      block,
      false,
      hasAwait(path)
    )
  );
};
