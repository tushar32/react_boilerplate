import React, { Fragment, useEffect, Suspense } from "react";
import { Router as BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "../../routes/Routes";


//Redux
import { Provider } from "react-redux";
import store from "../../redux/store";
import history from "../../history"

function App() {
  return (
    <Provider store={store}>
    <Fragment>
      <BrowserRouter history={history}>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  </Provider>
  );
}

export default App;
