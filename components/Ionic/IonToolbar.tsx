import dynamic from "next/dynamic";

export const IonToolbar = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonToolbar;
  },
  { ssr: false } // this is what makes it work
);
