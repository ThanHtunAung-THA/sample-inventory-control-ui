import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AdminLoginForm from "./AdminLoginForm";
import { checkNullOrBlank,checkPassword } from "../common/CommonValidation";
import Loading from "../common/Loading";
import {ApiRequest} from "../common/ApiRequest";


const AdminLoginIndex = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false); // For Loading
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [userCode, setUserCode] = useState(""); // for shop code
  const [password, setPassword] = useState(""); // for password
  let err = [];

  const passwordChange = (e) => {
      setSuccess([]);
      setError([]);
      setPassword(e.target.value);
  }

  const userCodeChange = (e) => {
      setSuccess([]);
      setError([]);
      setUserCode(e.target.value);
  }

  // === submit process ===
  const loginClick = async() => {
      if(!checkNullOrBlank(password)){
          err.push("Please fill password");
      }
      if(!checkNullOrBlank(userCode)){
        err.push("Please fill userCode");
      }
      if(err.length > 0) {
        setSuccess([]);
        setError(err);
      }else{
        setError([]);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCode);
        let saveData = {
          method: "get",
          url: `admin/login`,
          params: {
            ...(isEmail ? { email : userCode } : { user_code : userCode }),
            password : password
          },
        };
        setLoading(true);
        let response = await ApiRequest(saveData);
        // console.log("response",response);
        if (response.flag === false) {
          setError(response.message);
          setSuccess([]);
        } else {
          if (response.data.status == "OK") {
            localStorage.setItem(`LoginProcess`, "true");
            localStorage.setItem(`user-id`, response.data.userid);
            localStorage.setItem(`user-code`, response.data.usercode);
            localStorage.setItem(`user-name`, response.data.username);
            setTimeout(() => {
              setLoading(false);
              history.push(`/admin/dashboard`);
            }, 500); 
            setError([]);
          } else {
            setError([response.data.message]);
            setSuccess([]);
          }
        }
      }
      setLoading(false);
  };

  return(
      <>
      <AdminLoginForm
      loginClick={loginClick}
      passwordChange={passwordChange}
      password={password}
      userCodeChange={userCodeChange}
      userCode={userCode}
      success={success}
      error={error}
      />
      <Loading start={loading} />
      </>
  )
}

export default AdminLoginIndex
