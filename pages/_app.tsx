import type { AppProps } from "next/app";
import { IonContent } from "../components/Ionic/IonContent";
import { IonApp } from "../components/Ionic/IonApp";
import { IonSplitPane } from "../components/Ionic/IonSplitPane";
import { IonPage } from "../components/Ionic/IonPage";
import { IonMenu } from "../components/Ionic/IonMenu";
import { IonHeader } from "../components/Ionic/IonHeader";
import { IonToolbar } from "../components/Ionic/IonToolbar";
import { IonList } from "../components/Ionic/IonList";
import { IonItem } from "../components/Ionic/IonItem";
import { IonLabel } from "../components/Ionic/IonLabel";
import { IonIcon } from "../components/Ionic/IonIcon";
import { home } from "ionicons/icons";
import Link from "next/link";
import { IonButtons } from "../components/Ionic/IonButtons";
import { IonButton } from "../components/Ionic/IonButton";
import { useHighlightJS } from "../libs/highlight";
import { useStripeElementWebComponent } from "../libs/stripe-elements";
import '../libs/ionic';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useHighlightJS();
  useStripeElementWebComponent()
  return (
    <IonApp>
      <IonContent id="app">
        <IonSplitPane contentId="main">
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <Link href="/" passHref>
                    <IonButton>stripe-element</IonButton>
                  </Link>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <Link href="/" passHref>
                  <IonItem>
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                </Link>
                <Link href="/components" passHref>
                  <IonItem>
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Components</IonLabel>
                  </IonItem>
                </Link>
                <Link href="/blog" passHref>
                  <IonItem>
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Blogs</IonLabel>
                  </IonItem>
                </Link>
                <Link href="/examples" passHref>
                  <IonItem>
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Examples</IonLabel>
                  </IonItem>
                </Link>
              </IonList>
            </IonContent>
          </IonMenu>
          <IonPage id="main">
            <Component {...pageProps} />
          </IonPage>
        </IonSplitPane>
      </IonContent>
    </IonApp>
  );
}
export default MyApp;
