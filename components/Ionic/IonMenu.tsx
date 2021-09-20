import dynamic from "next/dynamic";

export const IonMenu = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonMenu;
  },
  { ssr: false } // this is what makes it work
);
