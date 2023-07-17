import { NodePath, Node } from '@babel/traverse';

const notANumber = (num: number | null | undefined): boolean => num === null || num === undefined || Number.isNaN(num);

const getSize = (node: Node): number => {
  const start = node.start as number;
  const end = node.end as number;

  return notANumber(start) || notANumber(end) ? 0 : end - start;
};

export default (multiplier: number, minLength: number, measureIdentifiers?: Boolean) =>
  (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
    multiplier = multiplier || 1.5;
    minLength = minLength || 50;
    measureIdentifiers = measureIdentifiers || true;

    const size = getSize(path.node);

    if (size < minLength) return true;

    if (!measureIdentifiers) return true;

    const identifiers = data.toInject.map((x: RandomObject) => x.name);
    const min = identifiers.join('').length * multiplier;

    return size < min;
  };
