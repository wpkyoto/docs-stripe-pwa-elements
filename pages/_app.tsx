import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IonContent } from "../components/Ionic/IonContent";
/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";
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

function MyApp({ Component, pageProps }: AppProps) {
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
                <Link href="/components" passHref>
                  <IonItem>
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Components</IonLabel>
                  </IonItem>
                </Link>
                <Link href="/blogs" passHref>
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
