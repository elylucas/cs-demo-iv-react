import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import Login from './pages/Login';
import Tabs from './pages/Tabs';
import { store } from './store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/styles.css';
import { load as loadAuth } from './store/auth-actions.async';
import AuthMonitor from './components/AuthMonitor';
import AskForPin from './containers/AskForPin';

const { StatusBar, SplashScreen } = Plugins;

const App: React.FC = () => {
  // this can probably be removed
  if (isPlatform('cordova')) {
    SplashScreen.hide();
    StatusBar.setStyle({ style: StatusBarStyle.Light });
  }
  store.dispatch(loadAuth());

  return (
    <Provider store={store}>
      <IonApp>
        <AskForPin></AskForPin>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/tabs" component={Tabs} />
            <Route path="/login" component={Login} />
            <Route path="/" render={() => <Redirect to="/tabs" />} exact={true} />
          </IonRouterOutlet>
          <AuthMonitor></AuthMonitor>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
