export const formatPath = (path: string) => {
  return path.startsWith("/") ? path : `/${path}`;
};
