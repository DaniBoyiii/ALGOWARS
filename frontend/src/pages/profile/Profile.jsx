import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../../components/header/Header";
import banner from "../../images/banner.png";
import user from "../../images/user.png";
import withAuth from "../../routes/withAuth";
import { BallTriangle } from "react-loader-spinner";

const Profile = (props) => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    var myHeaders = new Headers();
    var token = localStorage.getItem("jwtToken");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(process.env.REACT_APP_BASE_URL + "/api/user", requestOptions)
      .then((response) => {
        response.json().then((value) => {
          setUserData(value);
          setLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = async (event) => {
    event.preventDefault();

    var token = localStorage.getItem("jwtToken");

    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      redirect: "follow",
    };

    const data = JSON.stringify({
      profile: {
        name: name,
        email: email,
        gender: gender,
        contact_number: number,
      },
    });
    setName("");
    setEmail("");
    setNumber("");
    setGender("");

    const response2 = await fetch(
      process.env.REACT_APP_BASE_URL + "/api/user",
      {
        method: "POST",
        headers: headers,
        body: data,
      }
    );

    fetchUserData();
    setUserData(response2);
  };

  return (
    <div className="main">
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
          <div className="profile-header">
            <Header />
          </div>
          <div className="main-box">
            <div className="profile-content">
              <form className="info-card" onSubmit={handleInputChange}>
                <h2 className="profile-head">General Information</h2>
                <div className="heading-1">
                  <div className="sub-head">
                    <h5 className="sub-info">Name</h5>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder={userData?.profile?.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="sub-head">
                    <h5 className="sub-info">Email</h5>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder={userData?.profile?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="sub-head">
                    <h5 className="sub-info">Phone Number</h5>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={number}
                      placeholder={`+91 ${
                        userData?.profile?.contact_number || ""
                      }`}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <div className="sub-head">
                    <h5 className="sub-info">Gender</h5>
                    <input
                      type="text"
                      name="gender"
                      value={gender}
                      placeholder={userData?.profile?.gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <input type="submit" className="btn-2" value="Update" />
                </div>
                <div className="outpt">
                  <h3>{userData.message}</h3>
                </div>
              </form>
              <div className="details-card">
                <div className="image-banner">
                  <img src={banner} alt="background" />

                  <img src={user} alt="userimg" />
                </div>
                <div className="user-info">
                  <div className="sub-section1">
                    <h2 className="profile-name">{userData?.profile?.name}</h2>
                  </div>
                  <div className="sub-section2">
                    <div className="title-bar">
                      <div className="info-bar">
                        <h4 className="sub-info-head">Username</h4>
                        <div className="information">
                          <h4 className="sub-info-head">
                            {userData?.profile?.username}
                          </h4>
                        </div>
                      </div>
                      <div className="info-bar">
                        <h4 className="sub-info-head">Email</h4>
                        <div className="information">
                          <h4 className="sub-info-head">
                            {userData?.profile?.email}
                          </h4>
                        </div>
                      </div>
                      <div className="info-bar">
                        <h4 className="sub-info-head">Phone Number</h4>
                        <div className="information">
                          <h4 className="sub-info-head">
                            {userData?.profile?.contact_number}
                          </h4>
                        </div>
                      </div>
                      <div className="info-bar">
                        <h4 className="sub-info-head">Gender</h4>
                        <div className="information">
                          <h4 className="sub-info-head">
                            {userData?.profile?.gender}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Profile);
