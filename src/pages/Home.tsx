import React from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

import TeaCategories from '../containers/TeaCatgories';
import { logout } from '../store/auth-actions.async';

const Home: React.FC = () => {
  const history = useHistory();
  const store = useStore();

  // Prefer using the routerLink prop on IonItem vs programmatically using the history api
  // const handleCategoryClick = (id: number) => history.push(`/tabs/home/edit-tea-category/${id}`);

  const handleLogout = () => store.dispatch<any>(logout());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea Categories</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TeaCategories />
      </IonContent>
    </IonPage>
  );
};

export default Home;
