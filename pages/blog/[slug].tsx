import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { markdownToHtml } from "../../libs/markdown/converters";
import { BlogPost, getAllPosts, getPostBySlug } from "../../libs/markdownPosts";
import { PageLayout } from "../../components/Layouts/PageLayout";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "../../components/Ionic/IonCards";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  return (
    <PageLayout title={post.title}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{post.date}</IonCardSubtitle>
          <IonCardTitle>{post.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </IonCardContent>
      </IonCard>
    </PageLayout>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPosts();
  return {
    paths: slugs
      .filter((slug) => {
        if (!Array.isArray(slug)) {
          return false;
        }
        return slug[0] === "blog";
      })
      .map((slugs) => {
        const slug = Array.isArray(slugs) ? slugs.filter(d => d !== 'blog').join("/") : slugs
        return {
          params: {
            slug: slug,
          },
        }
      }),
      fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  post: BlogPost;
}> = async ({ params }) => {
  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }
  const slug = (() => {
    if (Array.isArray(params.slug)) return params.slug.join("/");
    if (!/^blog\//.test(params.slug)) {
      return `blog/${params.slug}`;
    }
    return params.slug;
  })();
  try {
    const post = getPostBySlug(slug, ["date", "title", "content"]);
    return {
      props: {
        post: {
          slug: Array.isArray(slug) ? slug.join("/") : slug,
          date: Array.isArray(post.date) ? post.date[0] : post.date,
          title: Array.isArray(post.title) ? post.title[0] : post.title,
          content: await markdownToHtml(post.content as any),
        },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
