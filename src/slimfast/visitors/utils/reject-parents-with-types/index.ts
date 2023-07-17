import { NodePath } from '@babel/traverse';

export default function (path: NodePath | null, blacklistedParents: string[]) {
  let currentPath = path;
  while (currentPath) {
    if (blacklistedParents.includes(currentPath.type)) {
      return false;
    }
    currentPath = currentPath.parentPath;
  }
  return true;
}
