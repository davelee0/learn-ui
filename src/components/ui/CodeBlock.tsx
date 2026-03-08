import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-sm overflow-hidden border border-zinc-200">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-sm bg-white/80 hover:bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700 transition-colors z-10"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{ margin: 0, padding: '1rem', fontSize: '0.8125rem' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
