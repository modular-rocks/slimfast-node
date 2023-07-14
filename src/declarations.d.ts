declare module '@modular-rocks/slimfast-node';
interface RandomObject extends Record<string, any> {}
interface FilesContainer extends Record<string, FileContainerType> {}

interface Options {
  pipeline?: Function[];
  src: string;
  extensions: string[];
  ignoredFiles: string[];
  packageContents?: PackageContents;
  packagePath?: string;
  ignoredImports: string[];
  custom?: Custom;
}

type Extract = [RandomObject, Data];

interface Data {
  [property: string]: string;
}

type Namer = (path: RandomObject, data: RandomObject, options: Option) => void;
type Builder = (path: RandomObject, data: RandomObject, file: FileContainerType) => ProvisionalFile;

interface ProvisionalFile {
  pathname: string;
  ast: RandomObject;
  import: RandomObject;
}

interface WorkspaceOpts extends Options {
  files?: [string, string][];
}

interface CodebaseOpts extends Options {
  files: [string, string][];
}

interface WorkspaceType {
  opts: WorkspaceOpts;
}

interface SlimFastType extends WorkspaceType {
  original: CodebaseType;
  refactored: CodebaseType;
}

interface CodebaseType {
  src: string;
  extensions: string[];
  ignoredFiles: string[];
  ignoredImports: string[];
  files: FilesContainer;
  rootName: string;
  srcWithoutRoot: string;
  package: PackageContents;
  dependencies: string[];
  opts: Options;
  replaceRoot: Function;
  saveFile: Function;
  fromJson: Function;
  extractFiles: Function;
  save: Function;
  addFile: Function;
  makeDirectory: Function;
}

interface FileContainerType {
  pathname: string;
  fullPath: string;
  type?: string;
  code: string;
  simple: Boolean;
  hasParent: Boolean;
  codebase: CodebaseType;
  store: FileStore;
  ast?: any;
  parse: Function;
  updateCode: Function;
  print: Function;
  astToCode: Function;
  codeToAST: Function;
  spawn: Function;
  tooSimple: Function;
  addImport: Function;
  save: Function;
}

interface VisitorType {
  ast: any;
  extracted: Map<any, any>;
  state: State;
  opts: SlimFastOpts;
}

interface SlimFastOpts extends WorkspaceOpts {
  visitors?: any[];
  namer?: Function;
  builder?: Function;
  jsxReplacer?: Function;
  functionReplacer?: Function;
  jsxGenerator?: Function;
  functionGenerator?: Function;
  wrap?: Function;
  replace?: Function;
}

interface Custom {
  [propter: string]: any;
}

interface State {
  [property: string]: string;
}

type ExtractedNodePath = [RandomObject, RandomObject];

interface FileStore {
  [property: string]: any;
}

// Can take any shape, generately has to be an Object like Node packages
// Ports to any other languages can be formatted
interface PackageContents {
  [property: string]: any;
}
