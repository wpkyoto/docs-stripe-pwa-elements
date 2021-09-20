import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  BlogPost,
  getBlogPosts,
  getPostBySlug,
} from "../../libs/markdownPosts";
import { PageLayout } from "../../components/Layouts/PageLayout";
import { markdownToHtml } from "../../libs/markdown/converters";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "../../components/Ionic/IonCards";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return (
    <PageLayout title="Blog">
      <main className="ion-padding">
        {props.posts.map((post) => {
          return (
            <Link href={`/${post.slug}`} passHref key={post.title}>
              <a>
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>{post.date}</IonCardSubtitle>
                    <IonCardTitle>{post.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </a>
            </Link>
          );
        })}
      </main>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
}> = async () => {
  const postSlugs = getBlogPosts();
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = getPostBySlug(slug, ["date", "title", "content"]);
      return {
        slug: Array.isArray(slug) ? slug.join("/") : slug,
        date: Array.isArray(post.date) ? post.date[0] : post.date,
        title: Array.isArray(post.title) ? post.title[0] : post.title,
        content: await markdownToHtml(post.content as any),
      };
    })
  );
  return {
    props: {
      posts,
    },
  };
};
