import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { listStencilComponentReadmes } from "../../libs/github/listReadme";
import { markdownToHtml } from "../../libs/markdown/converters";
import { PageLayout } from "../../components/Layouts/PageLayout";
import { getGitHubReadme } from "../../libs/github/getReadme";

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
  const { text } = await getGitHubReadme()
  return {
    props: {
      text: await markdownToHtml(text),
      files: files.map((file) => file.name),
    },
  };
};
