import { Octokit } from "@octokit/core";
export const getGitHubReadme = async (path = '', branch = 'main') => {

    const client = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN,
      });

      const filepath = `${branch}:${path}readme.md`
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
          file: filepath,
        }
      );
      return {
          text: data.repository.object.text
      }
} 