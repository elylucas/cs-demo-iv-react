import React, { useState, useEffect, CSSProperties } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react';
import { useStore, connect } from 'react-redux';
import UnlockApplication from '../containers/UnlockApplication';
import { login } from '../store/auth-actions.async';
import { getAuthError } from '../store';

interface LoginProps {
  errorMessage?: string;
  login: (params: { email: string, password: string; }) => void;
}

// so this just might be me, but I like to keep the store out of my components, but unfortunately the useStore hook made it a lot easier
// to do use it. 
// To demonstrate, I changed just this login method to use the connect HOC which will pass in the login method as a prop, and the way you 
// had the actions written will make sure the dispatch gets passed into the method when it goes through the connect middleware.
// I also updated the errorMessage to pass it in as a prop instead of subscribing to store changes

// An aside, the login api on heroku seems to hang when passing in an email value that isn't a valid email format

const Login: React.FC<LoginProps> = ({ errorMessage, login }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // commented this out since the errorMessage is coming in as a prop
  // const [errorMessage, setErrorMessage] = useState();
  const store = useStore();

  const loginButtonStyle: CSSProperties = {
    marginTop: '3em'
  };

  // useEffect should always have a dependency array passed into it
  // right now this will run each time the component renders, which might not be ideal.  
  // useEffect(() => {
  //   commented this out since the errorMessage is coming in as a prop
  //   const unsubscribe = store.subscribe(() => {
  //     const error = getAuthError(store.getState());
  //     setErrorMessage(error ? error.message : '');
  //   });

  //   return unsubscribe;
  // });

  const handleSignIn = () => {
    // so this just might be me, but I like to keep the store out of my components, but unfortunately the useStore hook made it a lot easier
    // to do use it. 
    // To demonstrate, I changed just this login method to use the connect HOC which will pass in the login method as a prop, and the way you 
    // had the actions written will make sure the dispatch gets passed into the method when it goes through the connect middleware.
    login({ email, password });
    // store.dispatch<any>(login({ email, password }));
  };
  const handleEmailChange = (evt: CustomEvent) => setEmail(evt.detail.value);
  const handlePasswordChange = (evt: CustomEvent) => setPassword(evt.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">E-Mail Address</IonLabel>
            <IonInput value={email} onIonChange={handleEmailChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange}></IonInput>
          </IonItem>
        </IonList>

        <IonButton expand="block" fill="outline" style={loginButtonStyle} onClick={handleSignIn}>
          Sign In
        </IonButton>
        <div className="error-message">{errorMessage}</div>
        <UnlockApplication></UnlockApplication>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const error = getAuthError(state);
  return {
    errorMessage: error?.message
  };
};

export default connect(mapStateToProps, {
  login
})(Login); 
