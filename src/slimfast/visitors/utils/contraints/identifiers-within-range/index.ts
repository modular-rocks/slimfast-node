import { NodePath, Node } from '@babel/traverse';
import extractIdentifiers from '../../extract-identifiers';

export default (min: number, max: number) => (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  extractIdentifiers(path, data, opts, ast);

  const minIdentifiers = min || 2;
  const maxIdentifiers = max || 4;

  const { length } = data.toInject;
  return length >= minIdentifiers && length <= maxIdentifiers;
};
