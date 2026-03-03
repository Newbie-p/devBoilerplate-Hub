import { getSnippetDetail } from "../snippetService";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeBlock from "../../../components/CodeBlock";
import SkeletonCard from "../../../components/SkeletonCard";

export default function SnippetDetail() {
  const { slug, categorySlug, integrationSlug } = useParams();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await getSnippetDetail(
          slug,
          categorySlug,
          integrationSlug
        );
        setSnippet(data);
      } catch (error) {
        console.error("Error fetching snippet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [slug, categorySlug, integrationSlug]);

  if(loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        {[...Array(3)].map((_, i)=> (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }
  if (!snippet) return <div className="p-10">Snippet not found</div>;

  return (
    <div className="min-h-screen p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>

      <p className="mb-4 text-gray-700">
        {snippet.shortDescription}
      </p>

      {snippet.installCommand && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <p className="font-semibold">Install:</p>
          <code>{snippet.installCommand}</code>
        </div>
      )}

      <div className="mb-6 bg-black text-green-400 p-4 rounded overflow-auto">
        <CodeBlock code={snippet.code} language="javascript" />
      </div>

      <p className="mb-6">{snippet.explanation}</p>

      {snippet.documentationUrl && (
        <a
          href={snippet.documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Official Documentation
        </a>
      )}

      {snippet.tags && (
        <div className="mt-6 flex gap-2 flex-wrap">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}