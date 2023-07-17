import { NodePath, Node } from '@babel/traverse';
import identifiersWithinRange from '../identifiers-within-range';

export default (min: number, max: number) => (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  return !identifiersWithinRange(min, max)(path, data, opts, ast);
};
