import React, { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import CardComponent from "./CardComponent";

const ReposComponent = (props) => {
  const { page, username } = props;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPage = async (page_no) => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=6&page=${page_no}`
      );
      const data = await response.json();
      setRepos(data);
      setLoading(false);
    };
    loadPage(page);
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <Watch height="120" width="120" color="#4a90cf" visible={loading} />
          <h4>Please wait while the data is loading...</h4>
        </div>
      ) : (
        <div className="repo-container">
          {repos.map((repo) => (
            <CardComponent repo={repo} key={repo.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ReposComponent;
