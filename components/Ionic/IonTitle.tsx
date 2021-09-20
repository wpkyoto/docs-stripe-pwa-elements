import dynamic from "next/dynamic";

export const IonTitle = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonTitle;
  },
  { ssr: false } // this is what makes it work
);
