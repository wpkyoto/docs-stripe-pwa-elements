import { FC } from "react";
import Head from "next/head";
import { IonContent } from "../../components/Ionic/IonContent";
import { PageHeader } from "./PageHeader";

export const PageLayout: FC<{
  title: string;
}> = (props) => (
  <IonContent fullscreen>
    <Head>
      <title>{props.title} - stripe-elements</title>
    </Head>
    <PageHeader>{props.title}</PageHeader>
    {props.children}
  </IonContent>
);
