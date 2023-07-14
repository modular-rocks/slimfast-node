import Slimfast from '.';
import before from '../../test-results/basic/before';
import after from '../../test-results/basic/after';

const code = before;

describe('Slimfast Node', () => {
  test('It modularises', async () => {
    const files: [string, string][] = [[`/path`, code]];
    const opts: SlimFastOpts = {
      files,
      src: '/',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const slimFast = new Slimfast(opts);
    await slimFast.run();
    const newFiles = slimFast.refactored.extractFiles();
    const file = newFiles[0];
    expect(file.code).toBe(after);
    expect(newFiles.length).toBe(20);
  }, 30000);
});
