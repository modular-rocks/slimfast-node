import { NodePath } from '@babel/traverse';

type Extract = [NodePath, Data];

export default (builder: Function) =>
  (file: FileContainerType, options: SlimFastOpts, state: State, workspace: SlimFastType) => {
    const extracted: Extract[] = file.store.extractions;
    if (!extracted.length) return file;

    workspace.refactored.makeDirectory(file); // make sure that its not already in an index

    extracted.forEach((extract: Extract) => {
      const [path, data] = extract;
      const newFile: ProvisionalFile = builder(path, data, file.pathname, options);
      file.addImport(newFile.import);
      workspace.refactored.addFile(file.spawn(newFile));
    });
    file.updateCode();
    return false;
  };
