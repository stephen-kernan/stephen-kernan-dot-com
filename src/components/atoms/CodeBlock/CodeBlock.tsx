"use client";

import { useState } from "react";

export function CodeBlock({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre
        className={`p-4 overflow-x-auto rounded-md bg-gray-900 text-gray-100`}
      >
        <code className={`language-${language}`}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-xs px-2 py-1 rounded"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
