import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppRootState } from "reduxStore/store";

type mstpType = {
  isAuth: boolean | undefined;
};

const mapStateToProps = (state: AppRootState): mstpType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export function withAuthRedirect<T extends object>(
  Component: React.ComponentType<T>
) {
  const RedirectComponent: React.FC<mstpType> = (props) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Navigate to="/login" />;

    return <Component {...(restProps as T)} />;
  };

  return connect(mapStateToProps)(RedirectComponent);
}
