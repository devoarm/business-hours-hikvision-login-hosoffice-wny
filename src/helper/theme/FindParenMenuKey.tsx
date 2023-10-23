export default function findPathToParentByKey(
  arr: any,
  keyToFind: string,
  nameObj: "key" | "label"
) {
  function findPathRecursive(node: any, keyToFind: any, path: any) {
    if (node.key === keyToFind) {
      path.push(node?.[nameObj]);
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (findPathRecursive(child, keyToFind, path)) {
          path.push(node?.[nameObj]);
          return true;
        }
      }
    }

    return false;
  }

  const path: any = [];
  for (const item of arr) {
    if (findPathRecursive(item, keyToFind, path)) {
      break; // Exit early if the key is found
    }
  }

  return path.reverse(); // Reverse the path to get it from root to the target node
}
