export function capitialFirst(str: string) {
  return str === ""
    ? str
    : `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}

export function deletePropertyPath(obj: any, paths: string) {
  let path: any[] = [];
  if (!obj || !paths) {
    return;
  }

  if (typeof paths === "string") {
    path = paths.split(",");
  }

  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];

    if (typeof obj === "undefined") {
      return;
    }
  }

  delete obj[path.pop()];
}

export function addPropertyPath(obj: any, paths: string, value: any) {
  let path: any[] = [];
  if (!obj || !paths) {
    return;
  }

  if (typeof paths === "string") {
    path = paths.split(",");
  }

  console.log({ path, paths, value });
  if (path[0] === "") return (obj[path[1]] = value);

  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
  }

  obj[path[path.length - 1]] = value;
}
