import { useState, useEffect } from "react";

function VisitedCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const isVisited = localStorage.getItem("alreadyVisited");

      try {
        if (!isVisited) {
          const resPost = await fetch("https://ridho.rcproject.web.id/api/visited", {
            method: "POST",
          });

          const dataPost = await resPost.json();
          localStorage.setItem("alreadyVisited", "true");
          setCount(dataPost.total);
        } else {
          const resGet = await fetch("https://ridho.rcproject.web.id/api/visited");
          const dataGet = await resGet.json();
          setCount(dataGet.total);
          console.log(dataGet);
        }
      } catch (err) {
        console.error("Gagal fetch visited count:", err.message);
      }
      
    };

    fetchData();
  }, []);

  return <p className="text-white text-sm absolute font-bold top-0 left-3 z-10">Visited: {count}</p>;
}

export default VisitedCounter;
