import dynamic from "next/dynamic";

export const IonList = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonList;
  },
  { ssr: false } // this is what makes it work
);
