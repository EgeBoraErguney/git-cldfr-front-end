import { useEffect, useState } from "react";

function HomeComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let loading = true;
    fetch("https://back-end.egeboraerguney.workers.dev/posts/")
      .then((resp) => {
        if (loading) {
          console.log(resp);
        }
      })
      .catch((err) => console.log(err));
    return () => (loading = false);
  }, []);

  return (
    <>
      <h1>Home Component</h1>
    </>
  );
}

export default HomeComponent;
