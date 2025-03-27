import React from "react";

// Utility function to format text
const formatText = (text: string) => {
  return text
    .replace(/&amp;/g, "&") // Decode HTML entities
    .split("\r\n\r\n") // Split paragraphs
    .map((paragraph, index) => {
      // Check for bullet points using a more flexible match
      if (paragraph.match(/^[•●▪️‣⁃-]/) || paragraph.includes(" ")) {
        return (
          <ul key={index} className="list-disc list-inside ml-4">
            {paragraph
              .split(/\r\n[•●▪️‣⁃-]? ?| /) // Handle different bullet characters
              .filter((point) => point.trim() !== "") // Remove empty elements
              .map((point, i) => (
                <li key={i}>{point}</li>
              ))}
          </ul>
        );
      }

      return (
        <p key={index} className="mb-3">
          {paragraph}
        </p>
      );
    });
};

const RichText = ({ text }: { text: string }) => {
  return (
    <div className="text-sm sm:text-base text-black/60 mb-5">
      {formatText(text)}
    </div>
  );
};

export default RichText;
