import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router';

import UpdateTeaCategory from '../containers/UpdateTeaCategory';
import { TeaCategory } from '../models';
import { useDispatch, connect } from 'react-redux';
import { update } from '../store/tea-category-actions';

interface EditTeaCategoryProps {
  id: string;
}

// An alternative to directly using the route props is to pass the tea category id in as a prop 
// and fetch it from match in the connect HOC (demonstrated below)

const EditTeaCategory: React.FC<EditTeaCategoryProps> = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState<TeaCategory>();

  // const categoryId = parseInt(match.params.id);
  const categoryId = parseInt(id);

  const handleCategoryChange = (category: TeaCategory) => {
    setCategory({ ...category });
  };

  const handleSaveClicked = () => {
    if (category) {
      dispatch(update(category));
    }
    history.push('/tabs/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Edit Tea Category</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <UpdateTeaCategory id={categoryId} onCategoryChange={handleCategoryChange}></UpdateTeaCategory>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton fill="outline" expand="block" onClick={handleSaveClicked}>Save</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

const mapStateToProps = (state: any, ownProps: RouteComponentProps<{ id: string;}>) => {
  const id = ownProps.match.params.id;
  return {
    id
  }
};

export default connect(mapStateToProps, {})(EditTeaCategory);
