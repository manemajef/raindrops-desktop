import { Link, useLocation } from "react-router-dom";

export function useBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return pathnames.map((value, index) => {
    const to = "/" + pathnames.slice(0, index + 1).join("/");
    return { label: value, to };
  });
}
