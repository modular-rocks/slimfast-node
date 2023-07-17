import { NodePath, Node } from '@babel/traverse';

// This method will return false if the path is a VariableDeclarator
// I can be followed by the isVariableDeclaration constraint that will test the full declaration
// If the VariableDeclarator path is extracted then it will not take the type of declaration with it
// e.g. the path will be `hello = 'hello'` rather than `const hello = 'hello'`
// In summary, if this constraint is followed by a VariableDeclarator constraint, then the VariableDeclarator constraint will test this type of path
export default (path: NodePath | RandomObject, data: RandomObject, opts: RandomObject, ast: Node) => {
  let hasVariableDeclarator = false;

  if (path.isVariableDeclarator()) {
    hasVariableDeclarator = true;
  }

  return hasVariableDeclarator;
};
