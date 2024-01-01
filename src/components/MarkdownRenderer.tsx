import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { AnchorHTMLAttributes } from "react";
import Link from "next/link";

interface NextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * convert all internal links into Next link,
 * open external links in the new tab,
 * scroll to top after internal redirecting
 */
function NextLink(props: NextLinkProps) {
	const { href, ...rest } = props;

	if (href && href.match(/^(https?:)?\/\//)) {
		return (
			<a href={href} target="_blank" rel="noreferrer" {...rest}>
				{props.children}
			</a>
		);
	}

	const url = new URL(href || "", window.location.origin);

	return (
		<Link href={url.toString()} {...rest}>
			<a>{props.children}</a>
		</Link>
	);
}

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
	if (!markdown) return null;

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[
				// enables rendering HTML tags:
				rehypeRaw,
				// enables code highlighting:
				rehypeHighlight,
			]}
			components={{ a: NextLink }}
		>
			{markdown}
		</ReactMarkdown>
	);
}
