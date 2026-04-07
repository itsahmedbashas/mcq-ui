import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Import in correct dependency order
import "prismjs/components/prism-clike"; // Required for C++, C#, Java
import "prismjs/components/prism-c"; // Required for C++
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";
import "./CodeBlock.css";

const CodeBlock = ({ code, language = "javascript" }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="code-block-wrapper">
      <pre className="code-block">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

// Component to parse text and render code blocks
export const TextWithCode = ({ text }) => {
  // Split text by code blocks marked with ```language\ncode\n```
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part is a code block
        const codeMatch = part.match(/```(\w+)?\n([\s\S]*?)```/);

        if (codeMatch) {
          const language = codeMatch[1] || "javascript";
          const code = codeMatch[2].trim();
          return <CodeBlock key={index} code={code} language={language} />;
        }

        // Regular text with inline code
        const inlineCodeParts = part.split(/(`[^`]+`)/g);
        return (
          <span key={index}>
            {inlineCodeParts.map((inlinePart, i) => {
              if (inlinePart.startsWith("`") && inlinePart.endsWith("`")) {
                return (
                  <code key={i} className="inline-code">
                    {inlinePart.slice(1, -1)}
                  </code>
                );
              }
              return inlinePart;
            })}
          </span>
        );
      })}
    </>
  );
};

export default CodeBlock;
