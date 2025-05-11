import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import "./Home.css";
import Codesvg from "../../images/Logocode.svg";
import Footer from "../../components/footer/Footer";
import { BallTriangle } from "react-loader-spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, []);

  return (
    <div className="main-page">
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
          <Header />
          <div className="about_section">
            <div>
              <h1 className="main_title">Learn Algorithm Together</h1>
              <div className="about_grid">
                <div className="grid-item">
                  <div className="about_info">
                    <h2 className="about-sub-head">Join a Room</h2>
                    <p className="about-p">
                      Join or create a room, invite your friends, and get ready
                      to solve problems together.
                    </p>
                  </div>
                </div>
                <div className="grid-item">
                  <div className="about_info">
                    <h2 className="about-sub-head">Start The Room</h2>
                    <p className="about-p">
                      You'll all get the same coding question to solve. Only you
                      can see your editor.
                    </p>
                  </div>
                </div>
                <div className="grid-item">
                  <div className="about_info">
                    <h2 className="about-sub-head">Solve Problems</h2>
                    <p className="about-p">
                      Chat and solve questions together. Once you're done, you
                      can browse other people's solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_image">
              <img src={Codesvg} alt="Main Logo" />
            </div>
          </div>
          <div className="secondary_info">
            <h2 className="about-sub-head">Start Learning Together</h2>
            <p className="about-p">
              Join our community of over 100,000 programmers and start solving
              problems today.
            </p>
          </div>
          <div className="questions_info">
            <h2 className="about-sub-head">Frequently Asked Questions</h2>
            <div className="questions">
              <div className="question_parts">
                <h3>What is AlgoWars?</h3>
                <p className="about-p">
                  AlgoWars is a free site where you can work on coding and
                  algorithms problems together with others.
                </p>
              </div>

              <div className="question_parts">
                <h3>Can I use AlgoWars just by myself?</h3>
                <p>
                  Yes! You can create a private room where only you can solve
                  problems.
                </p>
              </div>

              <div className="question_parts">
                <h3>What can I type on chat?</h3>
                <p className="about-p">
                  Feel free to chat about whatever :, but don't outright give
                  answers unprovoked and please be respectful.
                </p>
              </div>

              <div className="question_parts">
                <h3>What type of questions should I expect?</h3>
                <p className="about-p">
                  There are standard algorithms and data structures questions
                  that you can expect from major tech companies such as Google,
                  Microsoft, Facebook, and Amazon.
                </p>
              </div>

              <div className="question_parts">
                <h3>Is it really free?</h3>
                <p className="about-p">
                  Yes, it's free and will always be free.
                </p>
              </div>

              <div className="question_parts">
                <h3>How can I get started?</h3>
                <p className="about-p">You can get started below!</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
