import dynamic from "next/dynamic";

export const IonCard = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonCard;
  },
  { ssr: false } // this is what makes it work
);

export const IonCardHeader = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonCardHeader;
  },
  { ssr: false } // this is what makes it work
);

export const IonCardSubtitle = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonCardSubtitle;
  },
  { ssr: false } // this is what makes it work
);

export const IonCardTitle = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonCardTitle;
  },
  { ssr: false } // this is what makes it work
);

export const IonCardContent = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonCardContent;
  },
  { ssr: false } // this is what makes it work
);
