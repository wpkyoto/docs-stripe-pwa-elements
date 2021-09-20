import { FC } from "react";
import { IonContent } from "../../components/Ionic/IonContent";
import { PageHeader } from "./PageHeader";

export const PageLayout: FC<{
  title: string;
}> = (props) => (
  <IonContent fullscreen>
    <PageHeader>{props.title}</PageHeader>
    {props.children}
  </IonContent>
);
