import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from 'next/link'
import { listStencilComponentReadmes } from "../../libs/github/listReadme";

export const ReleasedComponentsPage: NextPage<
InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

    return (
        <div>
            <h1>Components</h1>
            <ul>
                {props.files.map(file => {
                    return (
                        <li key={file}>
                            <Link passHref href={`/components/${file}`}>
                                <a>{file}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default ReleasedComponentsPage

export const getStaticProps: GetStaticProps<{
    files: string[]
}> = async () => {
    const files = await listStencilComponentReadmes()
    return {
        props: {
            files: files.map(file => file.name),
        }
    }
}