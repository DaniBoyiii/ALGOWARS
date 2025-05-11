import React, { useState, useEffect } from "react";
import "./Editor.css";
import { classnames } from "../../utils/general";

import CodeWindow from "../../components/codewindow/CodeWindow";
import { languageOptions } from "../../constants/languageOptions";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import { BallTriangle } from "react-loader-spinner";

import { defineTheme } from "../../lib/defineTheme";
import Footer from "../../components/footer/Footer";
import ThemeDropDown from "../../components/themedrop/ThemeDropDown";
import LangDrop from "../../components/langdrop/LangDrop";
import withAuth from "../../routes/withAuth";

const javascriptDefault = `/
* write your code here*/
`;

const Editor = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  //eslint-disable-next-line
  const [problem, setProblem] = useState("");
  const [problemCode, setProblemCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [resp, setResp] = useState([]);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    const problemCode = localStorage.getItem("problemCode");
    setProblemCode(problemCode);
  }, []);

  useEffect(() => {
    setProblem(localStorage.getItem("problemCode"));
    if (problemCode) {
      fetchData(problemCode);
    }
  }, [problemCode]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const fetchData = async (problemCode) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("jwtToken")
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/admin/problem/${problemCode}`,
        requestOptions
      );
      const value = await response.json();
      if (value) {
        setResp(value);
        setLoading(false);
      } else {
        console.log("Error: Response did not contain a JSON object.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCompile = () => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("jwtToken")
    );
    var raw = JSON.stringify({
      source_code: code,
      language_id: language.value,
      problem_code: problemCode,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.REACT_APP_BASE_URL + "/api/submission", requestOptions)
      .then((response) => {
        response.json().then((value) => {
          setResponse(value);
          setIsLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
    console.log("response", response.verdict);
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  return (
    <>
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
          <div class="desktop-view-only">
            This page can only be accessed in desktop view.
          </div>
          <div className="main-content">
            <div className="first-row">
              <LangDrop onSelectChange={onSelectChange} />
            </div>
            <div className="first-row">
              <ThemeDropDown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
          </div>
          <div className="window-main">
            <div className="problem-window">
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.statement }}
              />

              <h3 className="problem-heading-sub">Input Format:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.inputFormat }}
              />
              <h3 className="problem-heading-sub">Output Format:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{
                  __html: resp?.problem?.outputFormat,
                }}
              />
              <h3 className="problem-heading-sub">Constraints:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.constraints }}
              />
              {/* <h3 className="problem-heading-sub">Sample Test Cases:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{
                  __html: resp?.problem?.sample[],
                }}
              /> */}
              <h3 className="problem-heading-sub">Explanation:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.explanation }}
              />
              <h3 className="problem-heading-sub">Time Limit:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.timeLimit }}
              />
              <h3 className="problem-heading-sub">Memory Limit:</h3>
              <div
                className="problem-text"
                dangerouslySetInnerHTML={{ __html: resp?.problem?.memoryLimit }}
              />
            </div>
            {/*editor window */}
            <div className="editor-window">
              <CodeWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
              <div className="output-section">
                <div className="result-section">
                  <div className="solution-result">
                    <h4 className="solution-heading-sub">Status:</h4>
                    <p
                      className={
                        response.verdict === "Accepted"
                          ? "accepted"
                          : "rejected"
                      }
                    >
                      {response.verdict}
                    </p>
                  </div>
                  <div className="solution-result">
                    <h4 className="solution-heading-sub">Time:</h4>
                    <p>{response.time}</p>
                  </div>
                  <div className="solution-result">
                    <h4 className="solution-heading-sub">Memory:</h4>
                    <p>{response.memory}</p>
                  </div>
                </div>
                <button
                  className={classnames("buttons", !code ? "depth" : "")}
                  onClick={handleCompile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="result-loading">
                      <BallTriangle
                        height={40}
                        width={40}
                        radius={6}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                      />
                    </div>
                  ) : (
                    "Compile and Execute"
                  )}
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default withAuth(Editor);
