import t from '@babel/types';
import { NodePath, Node } from '@babel/traverse';

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

interface ProvisionalFile {
  pathname: string;
  ast: Node;
  import: t.Statement;
}

export default (builder: Function) =>
  (file: FileContainerType, options: Option, state: State, workspace: SlimFastType) => {
    const extracted: Extract[] = file.store.extractions;
    if (!extracted.length) return file;

    workspace.refactored.makeDirectory(file); // make sure that its not already in an index

    extracted.forEach((extract: Extract) => {
      const [path, data] = extract;
      const newFile: ProvisionalFile = builder(path, data, file.pathname);
      file.addImport(newFile.import);
      workspace.refactored.addFile(file.spawn(newFile));
    });
    file.updateCode();
    return false;
  };
