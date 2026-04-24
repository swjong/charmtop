import Link from "next/link";
import { ArrowRight, BookOpen, Tag as TagIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts, getAllTags } from "@/lib/content";

export default function BlogPage() {
  const posts = getAllBlogPosts("zh");
  const tags = getAllTags("zh");

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">部落格</h1>
        <p className="mt-4 text-muted-foreground">
          來自我們團隊的見解、更新與技術文章
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mr-1">
            <TagIcon className="h-3.5 w-3.5" />
            標籤：
          </div>
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-md">
            {post.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {post.date && (
                  <span>
                    {new Date(post.date).toLocaleDateString("zh-HK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {post.author && (
                  <>
                    <span>&middot;</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              <CardTitle className="text-lg leading-snug">
                <Link href={`/zh/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                <Link href={`/zh/blog/${post.slug}`} className="hover:underline">
                  閱讀更多
                </Link>
                <ArrowRight className="h-3 w-3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
