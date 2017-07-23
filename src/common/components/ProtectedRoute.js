import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/* Contains a workaround for components not rendering when using React Router with Redux's connect(),
 * due to React Router 4 using context (not props) to handle location - issues with shouldComponentUpdate.
 * The workaround is to pass location props to the connected (inner/real) Route, using a wrapper Route.
 * See https://github.com/ReactTraining/react-router/issues/4671
 */

const InnerProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.session.user
  };
};

const ConnectedInnerProtectedRoute = connect(mapStateToProps)(InnerProtectedRoute);

const ProtectedRoute = ({...props}) => (
  <Route path={props.path} exact={props.exact} strict={props.strict}>
    {routeProps => <ConnectedInnerProtectedRoute {...props} {...routeProps} />}
  </Route>
);

export default ProtectedRoute;
