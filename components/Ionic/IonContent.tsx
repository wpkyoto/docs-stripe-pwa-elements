import dynamic from "next/dynamic";

export const IonContent = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonContent;
  },
  { ssr: false } // this is what makes it work
);
