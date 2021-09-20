import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPaths,
} from "next";
import { listStencilComponentReadmes } from "../../libs/github/listReadme";
import { Octokit } from "@octokit/core";
import { markdownToHtml } from "../../libs/markdown/converters";
import { PageLayout } from "../../components/Layouts/PageLayout";

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
  const client = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });
  const data = await client.graphql<{
    repository: {
      object: {
        text: string;
      };
    };
  }>(
    `
        query($file: String!) {
            repository(owner: "stripe-elements", name: "stripe-elements") {
                object (expression: $file) {
                    ... on Blob { 
                        text
                    }
                }
            }
        }
    `,
    {
      file: `main:src/components/${name}/readme.md`,
    }
  );
  return {
    props: {
      text: await markdownToHtml(data.repository.object.text),
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
