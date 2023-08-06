import React from "react";

function DisplayRichText({ content }) {
  return (
    <div
      className="text-xl mt-11 leading-10"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default DisplayRichText;
