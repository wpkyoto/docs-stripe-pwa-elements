import dynamic from "next/dynamic";

export const IonSearchbar = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonSearchbar;
  },
  { ssr: false } // this is what makes it work
);
