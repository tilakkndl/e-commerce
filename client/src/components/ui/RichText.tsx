import React from "react";

// Utility function to format text
const formatText = (text: string) => {
  return text
    .replace(/&amp;/g, "&") // Decode HTML entities
    .split(/\r?\n\r?\n/) // Split paragraphs, handle both \r\n and \n
    .map((paragraph, index) => {
      // Trim the paragraph to remove extra whitespace
      const trimmedParagraph = paragraph.trim();

      // Check if paragraph contains bullet points
      const bulletPoints = trimmedParagraph
        .split(/\r?\n/) // Split by newlines
        .map((line) => line.trim()) // Trim each line
        .filter((line) => line.length > 0); // Remove empty lines

      // Check if any line starts with a bullet point character
      const hasBulletPoints = bulletPoints.some(
        (line) =>
          line.startsWith("•") || line.startsWith("-") || line.startsWith("*")
      );

      if (hasBulletPoints) {
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-3">
            {bulletPoints.map((point, i) => {
              // Remove bullet point characters and trim
              const cleanPoint = point.replace(/^[•\-*]\s*/, "").trim();

              // Only render non-empty points
              return cleanPoint ? (
                <li key={i} className="ml-2">
                  {cleanPoint}
                </li>
              ) : null;
            })}
          </ul>
        );
      }

      // Return regular paragraph if no bullet points
      return trimmedParagraph ? (
        <p key={index} className="mb-3">
          {trimmedParagraph}
        </p>
      ) : null;
    })
    .filter(Boolean); // Remove null elements
};

const RichText = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <div className="text-sm sm:text-base text-black/60 mb-5">
      {formatText(text)}
    </div>
  );
};

export default RichText;
