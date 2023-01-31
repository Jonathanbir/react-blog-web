import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "./index.scss";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  console.log(currentUser);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.fullname}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="profile-image"
                    src={currentUser.user.profileImage}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
