import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { TeaCategory } from '../models';

type TeaCategoryItemProps = {
  category: TeaCategory;
  // onCategoryClick: (id: number) => void;
};

const TeaCategoryItem: React.FC<TeaCategoryItemProps> = ({category }) => {
  const labelStyle = {
    whiteSpace: 'normal'
  };

  // Prefer using the routerLink prop on IonItem vs programmatically using the history api
  // const handleClick = () => onCategoryClick(category.id);

  return (
    <IonItem routerLink={`/tabs/home/edit-tea-category/${category.id}`}>
      <IonLabel style={labelStyle}>
        <div className="title">{category.name}</div>
        <div>{category.description}</div>
      </IonLabel>
    </IonItem>
  );
};

export default TeaCategoryItem;
