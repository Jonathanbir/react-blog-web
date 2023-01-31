import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "./index.scss";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="profile" style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <div className="card mb-3">
            <div className="card-header position-relative min-vh-25 px-0 py-0 mb-7">
              <div
                className="bg-holder rounded-3 rounded-bottom-0 profile-cover"
                style={{
                  backgroundImage: `url(${currentUser.user.coverImage})`,
                }}
              ></div>
              <div className="avatar avatar-5xl avatar-profile">
                <img
                  className="rounded-circle img-thumbnail shadow-sm"
                  src={currentUser.user.profileImage}d
                  width="150"
                  style={{ height: "150px" }}
                  alt=""
                />
              </div>
            </div>
            <div className="card-body d-flex justify-content-around">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-1">
                    {currentUser.user.fullname}
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      aria-label="Verified"
                      data-bs-original-title="Verified"
                    ></span>
                  </h4>
                  <h5 className="fs-0 fw-normal">
                    Senior Software Engineer at Technext Limited
                  </h5>
                  <p className="text-500">New York, USA</p>
                  <button
                    className="btn btn-falcon-primary btn-sm px-3"
                    type="button"
                  >
                    Following
                  </button>
                  <button
                    className="btn btn-falcon-default btn-sm px-3 ms-2"
                    type="button"
                  >
                    Message
                  </button>
                  <div className="border-bottom border-dashed my-4 d-lg-none"></div>
                </div>
              </div>
              <div className="col-lg-3 d-flex flex-column">
                <strong>電子信箱: {currentUser.user.email}</strong>
                <br />
                <strong>編號: {currentUser.user._id}</strong>
                <br />
                <strong>
                  身份: {currentUser.user.role == "staff" ? "員工" : "主管-"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
