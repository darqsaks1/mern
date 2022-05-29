import { React } from "react";
import { Switch, Route } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailsPage } from "./pages/DetailsPage";
import { AuthPage } from "./pages/AuthPage";
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/links" component={LinksPage}></Route>
        <Route path="/create" component={CreatePage}></Route>
        <Route path="/detail/:id" component={DetailsPage}></Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/">
        <AuthPage></AuthPage>
      </Route>
    </Switch>
  );
};
