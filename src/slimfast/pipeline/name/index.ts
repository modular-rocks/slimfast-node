import t from '@babel/types';
import { NodePath, Node } from '@babel/traverse';

interface ProvisionalFile {
  pathname: string;
  ast: Node;
  import: t.Statement;
}

type Extract = [NodePath, Data];

interface Data {
  [property: string]: string;
}

type Namer = (path: NodePath, data: RandomObject, options: Option) => void;
type Builder = (path: NodePath, data: RandomObject, file: FileContainerType) => ProvisionalFile;

interface Option {
  visitors: VisitorType[];
  builder: Builder;
  namer: Namer;
}

export default (namer: Function) =>
  (file: FileContainerType, options: Option, state: State, workspace: SlimFastType) => {
    const extracted: Extract[] = file.store.extractions;
    if (!extracted.length) return file;

    extracted.forEach((extract: Extract) => {
      const [path, data] = extract;
      namer(path, data, options);
    });
    return false;
  };
