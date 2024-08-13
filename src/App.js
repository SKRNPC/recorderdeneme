import React, { useState } from "react";

const OpenUrlButton = () => {
  const [url, setUrl] = useState("");

  const handleOpenUrl = () => {
    if (url) {
      // URL'nin başındaki önekleri temizle
      // `http` veya `https` öneki yoksa ekle
      let fullUrl = url;
      if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
        fullUrl = `https://${fullUrl}`;
      }

      const width = 800;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      window.open(
        fullUrl,
        "newWindow",
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleOpenUrl}>Open URL</button>
    </div>
  );
};

export default OpenUrlButton;
