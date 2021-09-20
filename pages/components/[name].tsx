import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPaths,
} from "next";
import { listStencilComponentReadmes } from "../../libs/github/listReadme";
import { markdownToHtml } from "../../libs/markdown/converters";
import { PageLayout } from "../../components/Layouts/PageLayout";
import { getGitHubReadme } from "../../libs/github/getReadme";

export const ComponentReadmePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <PageLayout title={`Component: ${props.name}`}>
      <div
        className="ion-padding"
        dangerouslySetInnerHTML={{
          __html: props.text,
        }}
      />
    </PageLayout>
  );
};
export default ComponentReadmePage;

export const getStaticProps: GetStaticProps<{
  text: string;
  name: string;
}> = async ({ params }) => {
  const name = (() => {
    if (!params || !params.name) return "";
    return Array.isArray(params.name) ? params.name[0] : params.name;
  })();
  if (!name) {
    return {
      notFound: true,
    };
  }
  const {text} = await getGitHubReadme(`src/components/${name}/`)
  return {
    props: {
      text: await markdownToHtml(text),
      name: name.replace(/-/gi, " "),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listStencilComponentReadmes();
  return {
    paths: files.map((file) => {
      return {
        params: file,
      };
    }),
    fallback: "blocking",
  };
};
