import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const AdminLoginIndex = React.lazy(() => import("./views/login/AdminLoginIndex"));
const AdminRegister = React.lazy(() => import("./views/login/AdminRegister"));
const Logout = React.lazy(() => import("./views/logout/LogoutIndex"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/admin-login" />} />
            
            {/* Auth */}
            <Route
              exact
              path="/admin-login"
              name="Admin Login Page"
              render={(props) => <AdminLoginIndex {...props} />}
            />
            <Route
              exact
              path="/admin-register"
              name="Admin Register Page"
              render={(props) => <AdminRegister {...props} />}
            />

            {/* others */}
            <Route
              exact
              path="/admin/logout"
              name="Logout"
              render={(props) => <Logout {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/admin"
              name="Admin Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
