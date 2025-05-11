import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import withAuth from "../../routes/withAuth";
import Header from "../../components/header/Header";
import { BallTriangle } from "react-loader-spinner";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leaderboard data and set it in the state
    const fetchEntries = async () => {
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
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/leaderboard/",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);

      setEntries(data.leaderboard); // set the entries state to the leaderboard array
    };

    fetchEntries();
  }, []);

  return (
    <div className="resp-set">
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
          <div>
            <Header />
          </div>
          <div className="leaderboard-box">
            <h1 className="sub-heading-board">Leaderboard</h1>
            <div class="container-board">
              <ul class="responsive-table board-table">
                <li class="table-header">
                  <div class="col col-1">Rank</div>
                  <div class="col col-2">Username</div>
                  <div class="col col-3">Problems Solved</div>
                </li>
                {entries.map((entry, index) => (
                  <li class="table-row" key={entry._id}>
                    <div class="col col-1" data-label="Rank">
                      {index + 1}
                    </div>
                    <div class="col col-2" data-label="Username">
                      {entry.username}
                    </div>
                    <div class="col col-3" data-label="Problems Solved">
                      {entry.problem_solved}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Leaderboard);
