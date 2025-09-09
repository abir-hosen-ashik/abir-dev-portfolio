import React from "react";

interface FormattedStringParserProps {
  text: string;
}

const FormattedStringParser: React.FC<FormattedStringParserProps> = ({ text }) => {
  // Split the string by <b>...</b>
  const parts = text.split(/(<b>.*?<\/b>)/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("<b>") && part.endsWith("</b>")) {
          const boldText = part.replace("<b>", "").replace("</b>", "");
          return <b key={idx} className="font-bold text-neutral-600 dark:text-neutral-300">{boldText}</b>;
        }
        return part;
      })}
    </>
  );
};

export default FormattedStringParser;
