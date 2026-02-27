import { Prism as syntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function CodeBlock({ code, language = "javascript"}){
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(()=> setCopied(false), 2000);
    };

    return(
        <div className="relative">
            {/* Copy Button */}
            <div className="absolute right-3 top-3 z-10">
            <button
                onClick={handleCopy}
                className="bg-gray-800 text-white text-xs px-3 py-1 rounded shadow"
            >
                {copied ? "Copied" : "Copy"}
            </button>
            </div>

            {/* Code Block */}
            <syntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
                margin: 0,
                padding: "24px",
                borderRadius: "8px",
            }}
            >
            {code}
            </syntaxHighlighter>
        </div>
    )
}