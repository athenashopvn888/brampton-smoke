import Link from "next/link";
import { Fragment } from "react";
import type { Inline, ArticleBlock } from "./renderArticle";

function InlineRuns({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((run, index) => {
        if (run.kind === "text") return <Fragment key={index}>{run.value}</Fragment>;
        if (run.kind === "strong") return <strong key={index}>{run.value}</strong>;
        if (run.kind === "em") return <em key={index}>{run.value}</em>;
        if (run.href.startsWith("/")) {
          return (
            <Link key={index} href={run.href}>
              {run.text}
            </Link>
          );
        }
        return (
          <a key={index} href={run.href}>
            {run.text}
          </a>
        );
      })}
    </>
  );
}

export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "h1") {
          return (
            <h1 key={index}>
              <InlineRuns runs={block.inlines} />
            </h1>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={index}>
              <InlineRuns runs={block.inlines} />
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index}>
              <InlineRuns runs={block.inlines} />
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index}>
              <InlineRuns runs={block.inlines} />
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineRuns runs={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineRuns runs={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type !== "table") return null;
        return (
          <div key={index} className="articleTable">
            <table>
              <thead>
                <tr>
                  {block.headers.map((cell, cellIndex) => (
                    <th key={cellIndex} scope="col">
                      <InlineRuns runs={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        <InlineRuns runs={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
