import { useState, useEffect } from "react";

const useURL = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return url;
};

export default useURL;
