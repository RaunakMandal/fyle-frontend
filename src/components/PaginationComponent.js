import React, { useEffect, useState } from "react";
import ReposComponent from "./ReposComponent";

const PaginationComponent = (props) => {
  const { username } = props;
  const [pages, setPages] = useState({
    page: 0,
    total_pages: 0,
  });
  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      setPages({ page: 1, total_pages: Math.ceil(data.length / 6) });
    };
    fetchRepos();
  }, []);
  const makeButtons = () => {
    let buttons = [];
    for (let i = 1; i <= pages.total_pages; i++) {
      buttons.push(
        <button
          key={i}
          style={
            pages.page === i
              ? { backgroundColor: "#4a90cf", color: "white" }
              : {}
          }
          onClick={() => setPages({ ...pages, page: i })}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const handlePrevious = () => {
    if (pages.page > 1) {
      setPages({ ...pages, page: pages.page - 1 });
    }
  };
  const handleNext = () => {
    if (pages.page < pages.total_pages) {
      setPages({ ...pages, page: pages.page + 1 });
    }
  };
  return (
    <div className="pagination">
      <ReposComponent page={pages.page} username={username} />
      <div className="pagination__pages">
        <div className="page-nos">
          <button onClick={handlePrevious}>
            <i className="fas fa-angle-double-left" id="arrow-btn"></i>
          </button>
          {makeButtons(pages.total_pages)}
          <button onClick={handleNext}>
            <i className="fas fa-angle-double-right" id="arrow-btn"></i>
          </button>
        </div>
        <div className="old-new">
          <button
            style={pages.page !== 1 ? { color: "#4a90cf" } : {}}
            onClick={handlePrevious}
          >
            <i className="fa-solid fa-arrow-left-long"></i> Older
          </button>
          <button
            style={pages.page !== pages.total_pages ? { color: "#4a90cf" } : {}}
            onClick={handleNext}
          >
            Newer <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
