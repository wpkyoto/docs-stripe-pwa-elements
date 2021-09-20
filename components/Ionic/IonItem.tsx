import dynamic from "next/dynamic";

export const IonItem = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonItem;
  },
  { ssr: false } // this is what makes it work
);
