import React from "react";

// Utility function to format rich text
const formatText = (text: string) => {
  return text
    .replace(/&amp;/g, "&") // Decode HTML entities
    .split("\n\n") // Split by double newlines (paragraphs)
    .map((section, index) => {
      const trimmedSection = section.trim();

      // Check for headings (lines starting with "###", "##", "#")
      if (trimmedSection.match(/^#{1,3}\s+/)) {
        const headingLevel = trimmedSection.split(" ")[0].length; // Count number of '#' for heading level
        return (
          <div key={index}>
            {headingLevel === 1 ? (
              <h1 className="font-semibold text-2xl mb-2">
                {trimmedSection.slice(1).trim()}
              </h1>
            ) : headingLevel === 2 ? (
              <h2 className="font-semibold text-xl mb-2">
                {trimmedSection.slice(1).trim()}
              </h2>
            ) : (
              <h3 className="font-semibold text-lg mb-2">
                {trimmedSection.slice(1).trim()}
              </h3>
            )}
          </div>
        );
      }

      // Check for bullet points (lines starting with "*" or "-")
      if (trimmedSection.match(/^(\*|\-)\s+/)) {
        const points = trimmedSection
          .split(/\n/g)
          .map((point) => point.trim())
          .filter((point) => point.length > 0);
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {points.map((point, i) => (
              <li key={i} className="ml-4">
                {point}
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return trimmedSection ? (
        <p key={index} className="text-black/60 mb-4">
          {trimmedSection}
        </p>
      ) : null;
    });
};

interface RichTextProps {
  text: string;
}

const RichText: React.FC<RichTextProps> = ({ text }) => {
  if (!text) return null;

  return (
    <div className="text-sm sm:text-base space-y-2">{formatText(text)}</div>
  );
};

export default RichText;
