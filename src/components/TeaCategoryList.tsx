import React from 'react';
import { IonList } from '@ionic/react';

import { TeaCategory } from '../models';
import TeaCategoryItem from './TeaCategoryItem';

type TeaCategoryProps = {
  categories: Array<TeaCategory>;
  // Prefer using the routerLink prop on IonItem vs programmatically using the history api
  // onCategoryClick: (id: number) => void;
};

const TeaCategoryList: React.FC<TeaCategoryProps> = ({ categories }) => {
  return (
    <IonList>
      {categories.map(cat => (
        <TeaCategoryItem
          key={cat.id}
          category={cat}
          // Prefer using the routerLink prop on IonItem vs programmatically using the history api
          // onCategoryClick={onCategoryClick}
        ></TeaCategoryItem>
      ))}
    </IonList>
  );
};

export default TeaCategoryList;
