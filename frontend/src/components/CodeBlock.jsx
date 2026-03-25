import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 bg-gray-800 text-white text-xs px-3 py-1 rounded"
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLongLines={true}
        customStyle={{
          margin: 0,
          padding: "20px",
          borderRadius: "8px",
          whiteSpace: "pre", // 🔥 IMPORTANT
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}