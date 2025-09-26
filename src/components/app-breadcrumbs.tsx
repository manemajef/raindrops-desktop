import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb";

import { useLocation } from "react-router-dom";

function getPaths(parts: string[]) {
  let curr = "/" + parts[0];
  const paths = [curr];
  for (const part of parts.slice(1)) {
    curr = curr + "/" + part;
    paths.push(curr);
  }
  return paths;
}

function getName(path: string) {
  const parts = path.split("-");
  const firstWord = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  return [firstWord, ...parts.slice(1)].join(" ");
}

import { Home } from "lucide-react";
export default function AppBreadcrumbs() {
  const parts = useLocation().pathname.split("/").filter(Boolean);
  if (parts.length <= 0) return <></>;
  const paths = getPaths(parts);
  const data = [];
  for (let i = 0; i < parts.length - 1; i++) {
    data.push({ path: paths[i], label: getName(parts[i]) });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {data.map((d, i) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={d.path}>{d.label}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{getName(parts[parts.length - 1])}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
