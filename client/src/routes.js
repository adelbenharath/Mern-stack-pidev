import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { FormSteps, Management } from "./pages";
import { DefaultRoute } from "./components";

import StudiesPage from "./pages/analysis/studiesPage";
import FormsPage from "./pages/analysis/formsPage";
import QuestionsPage from "./pages/analysis/questionsPage";
import ResponsesPage from "./pages/analysis/responsesPage";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/management/studies" />
      <DefaultRoute path="/form/new" component={FormSteps} />
      <DefaultRoute path="/form/edit" component={FormSteps} />
      <DefaultRoute path="/management" component={Management} />
      <Route path="/studiespage" component={StudiesPage} />
      <Route path="/questionspage/:id" component={QuestionsPage} />
      <Route path="/formspage/:id" component={FormsPage} />
      <Route path="/responsespage/:id" component={ResponsesPage} />
      <Redirect to="/management/studies" />
    </Switch>
  );
};

export default Routes;
