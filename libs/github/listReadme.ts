import { Octokit } from "@octokit/core";
export const listStencilComponentReadmes = async () => {
    const {data} = await (new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    })).request('GET /search/code', {
        q: [
            'README',
            'repo:stripe-elements/stripe-elements',
            'language:markdown',
            'in:path'
        ].join('+')
    })
    const files = data.items
    .filter(item => item.path.toLocaleLowerCase() !== 'readme.md')
    .map(item => {
        return {
            name: item.path
            .replace(/src\/components\//, '')
            .replace(/\/readme.md/, ''),
            path: item.path
        }
    })
    return files
}