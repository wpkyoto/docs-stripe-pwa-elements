import { FC } from "react";
import { IonToolbar } from "../../components/Ionic/IonToolbar";
import { IonTitle } from "../../components/Ionic/IonTitle";
import { IonHeader } from "../../components/Ionic/IonHeader";

export const PageHeader: FC = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
