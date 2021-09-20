import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { Octokit } from "@octokit/core";
import { listStencilComponentReadmes } from "../../libs/github/listReadme";
import { markdownToHtml } from "../../libs/markdown/converters";
import { PageLayout } from "../../components/Layouts/PageLayout";

export const ReleasedComponentsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <PageLayout title="Components">
      <div className="ion-padding">
        <ul>
          {props.files.map((file) => {
            return (
              <li key={file}>
                <Link passHref href={`/components/${file}`}>
                  <a>{file}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      </div>
    </PageLayout>
  );
};
export default ReleasedComponentsPage;

export const getStaticProps: GetStaticProps<{
  files: string[];
  text: string;
}> = async () => {
  const files = await listStencilComponentReadmes();
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
      file: `main:readme.md`,
    }
  );
  return {
    props: {
      text: await markdownToHtml(data.repository.object.text),
      files: files.map((file) => file.name),
    },
  };
};
