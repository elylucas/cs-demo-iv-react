import { AuthActionTypes, AuthStatus } from '../auth-actions';
import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';

interface AuthState {
  loading: boolean;
  hasSession: boolean;
  status: AuthStatus;
  email?: string;
  authMode?: AuthMode;
  biometricType?: BiometricType;
  showPinDialog?: boolean;
  setApplicationPin?: boolean;
  enteredPIN?: string;
  error?: Error;
}

// There are some patterns to get strongly typed actions that are cool but add a bit of boilerplate

const auth = (
  state: AuthState = { loading: false, hasSession: false, status: AuthStatus.Uninitialized },
  action: any
) => {
  switch (action.type) {
    case AuthActionTypes.loading:
    case AuthActionTypes.loggingOut:
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case AuthActionTypes.loggingIn:
      return {
        ...state,
        loading: true,
        error: undefined,
        email: undefined
      };

    case AuthActionTypes.loadSuccess:
      return {
        ...state,
        loading: false,
        status: action.payload.email ? AuthStatus.LoggedIn : AuthStatus.LoggedOut,
        email: action.payload.email
      };

    case AuthActionTypes.loadAuthModeSuccess:
      return {
        ...state,
        authMode: action.payload.authMode,
        biometricType: action.payload.biometricType,
        hasSession: action.payload.hasSession
      };

    case AuthActionTypes.loginSuccess:
      return {
        ...state,
        loading: false,
        status: action.payload.success ? AuthStatus.LoggedIn : state.status,
        error: action.payload.success ? undefined : new Error('Invalid username or password')
      };

    case AuthActionTypes.logoutSuccess:
    case AuthActionTypes.unauthorized:
      return {
        ...state,
        loading: false,
        status: AuthStatus.LoggedOut,
        email: undefined
      };

    case AuthActionTypes.loginFailure:
    case AuthActionTypes.logoutFailure:
      return {
        ...state,
        loading: false,
        status: AuthStatus.Invalid,
        error: action.error
      };

    case AuthActionTypes.sessionSet:
      return {
        ...state,
        email: action.payload.email
      };

    case AuthActionTypes.sessionCleared:
      return {
        ...state,
        email: undefined
      };

    case AuthActionTypes.setApplicationPIN:
      return {
        ...state,
        showPinDialog: true,
        setApplicationPin: true
      };

    case AuthActionTypes.unlockApplicationWithPIN:
      return {
        ...state,
        showPinDialog: true,
        setApplicationPin: false
      };

    case AuthActionTypes.enterPIN:
      return {
        ...state,
        showPinDialog: false,
        enteredPIN: action.payload.pin
      };

    case AuthActionTypes.cancelPIN:
      return {
        ...state,
        showPinDialog: false,
        enteredPIN: undefined
      };

    default:
      return state;
  }
};
export default auth;
