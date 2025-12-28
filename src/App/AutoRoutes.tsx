import { useRoutes, Navigate } from "react-router-dom";

const pages = import.meta.glob("./*/index.tsx", { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const name = path.split("/")[1];
  const Element = (module as any).default;
  return {
    path: name === "Home" ? "App" : `App/${name.toLowerCase()}`,
    element: <Element />,
  };
});


routes.push({
  path: "/",
  element: <Navigate to="/App/" replace />,
});

export default function AutoRoutes() {
  return useRoutes(routes);
}
