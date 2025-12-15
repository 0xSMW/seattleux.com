import { compileMDX } from "next-mdx-remote/rsc";

const components = {};

export async function Mdx(props: { source: string }) {
  const { content } = await compileMDX({
    source: props.source,
    components,
    options: {
      mdxOptions: {
        format: "mdx",
      },
    },
  });

  return content;
}
