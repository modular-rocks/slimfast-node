import t from '@babel/types';
import { NodePath } from '@babel/traverse';

import Visitor from '../../visitors/visitor';

interface Data {
  [property: string]: string;
}

type Namer = (path: NodePath, data: RandomObject, options: Option) => void;
type Builder = (path: NodePath, data: RandomObject, file: FileContainerType) => ProvisionalFile;

interface Option {
  iterator: Function;
  visitors: Visitor[];
  builder: Builder;
  namer: Namer;
}

interface ProvisionalFile {
  pathname: string;
  ast: Node;
  import: t.Statement;
}

export default (visitors: Visitor[]) =>
  (file: FileContainerType, options: Option, state: State, workspace: SlimFastType) => {
    file.parse();
    if (file.simple) {
      file.store.extractions = [];
      return file;
    }

    const extracted: Map<NodePath, any> = new Map();

    visitors.forEach((visitor: any) => {
      new visitor(file.ast, options, state, extracted);
    });

    file.store.extractions = Array.from(extracted);
    return false;
  };
