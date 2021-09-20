import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import glob from "glob";
import capitalzie from "capitalize";
import Link from "next/link";
import { PageLayout } from "../../components/Layouts/PageLayout";
import { IonList } from "../../components/Ionic/IonList";
import { IonItem } from "../../components/Ionic/IonItem";
import { IonLabel } from "../../components/Ionic/IonLabel";

const Examples: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  examples,
}) => {
  return (
    <PageLayout title="Examples">
      <IonList>
        {examples.map((example) => {
          return (
            <Link
              href={`/examples/${example.slug}`}
              passHref
              key={example.slug}
            >
              <IonItem>
                <IonLabel>{example.name}</IonLabel>
              </IonItem>
            </Link>
          );
        })}
      </IonList>
    </PageLayout>
  );
};

export default Examples;

type ExampleContext = {
  slug: string;
  name: string;
};

export const getStaticProps: GetStaticProps<{
  examples: ExampleContext[];
}> = async () => {
  const entries = glob.sync("pages/examples/**.tsx");
  if (!entries) {
    return {
      notFound: true,
    };
  }
  const examples = entries
    .filter((entry) => !/index.tsx$/.test(entry))
    .filter((entry) => {
      const paths = entry.split("/");
      if (!paths || paths.length < 1) return false;
      const fileName = paths[paths.length - 1];
      if (!fileName) return false;
      return true;
    })
    .map((entry): ExampleContext => {
      const paths = entry.split("/");
      const fileName = paths[paths.length - 1];
      const slug = fileName.replace(/\.(tsx|jsx)$/, "");
      return {
        slug,
        name: capitalzie(slug.replace(/-/gi, " ")),
      };
    });

  return {
    props: {
      examples,
    },
  };
};
