import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AuthRequiredRoute from "../shared/auth-require-route";
import AuthenticatedLayout from "../pages/layout/layout";
import SearchCategory from "../pages/category/search-category";
import ErrorPages from "../shared/error-pages";
import CategoryDetail, {
  categoryIdLoader,
} from "../pages/category/category-detail";

const LoginComponent = React.lazy(() => import("../pages/login/login"));

const DashboardComponent = React.lazy(() =>
  import("../pages/dashboard/dashboard")
);

const AppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AuthRequiredRoute element={<AuthenticatedLayout />} />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "",
          element: <DashboardComponent />,
        },
        {
          path: "/category",
          children: [
            {
              path: "",
              element: <SearchCategory />,
            },
            {
              path: ":categoryId",
              element: <CategoryDetail />,
              loader: categoryIdLoader,
            },
          ],
        },
      ],
    },

    { path: "/login", element: <LoginComponent /> },
  ]);
};

export default AppRoutes;
