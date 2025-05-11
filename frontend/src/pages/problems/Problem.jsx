import React, { useState, useEffect } from "react";
import "./Problem.css";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import withAuth from "../../routes/withAuth";

import { BallTriangle } from "react-loader-spinner";

const Problem = () => {
  const [resp, setResp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("jwtToken")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/admin/problem/",
      requestOptions
    )
      .then((response) => {
        response.json().then((value) => {
          setResp(value);
          setLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  const data = resp.problem || [];

  const setProblemCode = (value) => {
    localStorage.setItem("problemCode", value);
  };

  const Card = ({ problem }) => (
    <div className="card">
      <div className="card-left">
        <h3 className="card-title">{problem.name}</h3>
        <div className="card-body">
          <div className="headings-card">
            <p className="heading-main-card">Tags:</p>
            {Array.isArray(problem.tags) && (
              <p className="card-text">{problem.tags.join(", ")}</p>
            )}
          </div>

          <p className="card-text">Difficulty: {problem.difficulty}</p>
        </div>
      </div>

      <div className="card-button">
        <button
          className="card-btn"
          onClick={() => setProblemCode(problem.code)}
        >
          {console.log("STAte code", problem.code)}
          <Link
            to={{
              pathname: `/problem/${problem.code}`,
              state: { code: problem.code },
            }}
          >
            Solve Challenge
          </Link>
        </button>
      </div>
    </div>
  );

  return (
    <div className="main-problems">
      {loading && (
        <div className="loading-spinner">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
          />
        </div>
      )}
      {!loading && (
        <div>
          <div className="problem-header">
            <Header />
          </div>
          <div className="problems-box">
            <h1 className="heading-problem">Problems</h1>
            <div className="problems-box2">
              <div className="problems-list">
                {data.map((problem, index) => (
                  <Card key={index} problem={problem} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default withAuth(Problem);
