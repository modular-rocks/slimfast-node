import { NodePath, Node } from '@babel/traverse';

const notANumber = (num: number | null | undefined): boolean => num === null || num === undefined || Number.isNaN(num);

const getSize = (node: Node): number => {
  const start = node.start as number;
  const end = node.end as number;

  return notANumber(start) || notANumber(end) ? 0 : end - start;
};

export default (multiplier: number) => (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  const astSize = getSize(ast);
  const size = getSize(path.node);

  return size * multiplier > astSize;
};
