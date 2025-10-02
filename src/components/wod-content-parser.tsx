import { Youtube } from "lucide-react";
import React from "react";

const isYoutubeLink = (text: string) =>
  text.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/);

export function WodContentParser({ content }: { content: string }) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isYoutubeLink(line)) continue;

    const videoUrls: string[] = [];
    let j = i + 1;
    while (j < lines.length && isYoutubeLink(lines[j])) {
      videoUrls.push(lines[j]);
      j++;
    }

    elements.push(
      <div key={i}>
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{line}</p>
        {videoUrls.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
            {videoUrls.map((url, k) => (
              <a
                href={url}
                key={k}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <Youtube className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Ver video {videoUrls.length > 1 ? k + 1 : ""}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
    i = j - 1;
  }

  return <div className="space-y-3 text-sm">{elements}</div>;
}
