import dynamic from "next/dynamic";

export const IonPage = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonPage;
  },
  { ssr: false } // this is what makes it work
);
