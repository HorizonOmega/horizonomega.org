import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import RSS from "rss";

async function generate() {
	const feed = new RSS({
		title: "Horizon Omega",
		site_url: "https://horizonomega.org",
		feed_url: "https://horizonomega/feed.xml",
	});

	const __dirname = path.dirname(new URL(import.meta.url).pathname);
	const posts = await fs.readdir(path.join(__dirname, "..", "pages", "posts"));
	const allPosts = [];
	await Promise.all(
		posts.map(async (name) => {
			if (name.startsWith("index.")) return;

			const content = await fs.readFile(
				path.join(__dirname, "..", "pages", "posts", name),
			);
			const frontmatter = matter(content);

			allPosts.push({
				title: frontmatter.data.title,
				url: `/posts/${name.replace(/\.mdx?/, "")}`,
				date: frontmatter.data.date,
				description: frontmatter.data.description,
				categories: frontmatter.data.tag ? frontmatter.data.tag.split(", ") : [],
				author: frontmatter.data.author,
			});
		}),
	);

	allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
	for (const post of allPosts) {
		feed.item(post);
	}
	await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
