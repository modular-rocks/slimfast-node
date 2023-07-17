import { NodePath } from '@babel/traverse';

export default (blocklised: string[]) => (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  let hasBlocklistedIdentifiers = false;

  path.traverse({
    Identifier(innerPath: RandomObject) {
      if (blocklised.includes(innerPath.node.name)) {
        hasBlocklistedIdentifiers = true;
      }
    },
  });

  return hasBlocklistedIdentifiers;
};
