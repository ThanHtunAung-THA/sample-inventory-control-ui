import React, { useEffect, useState } from 'react'
import { 
  CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
  CTooltip,
 } from '@coreui/react';
import { useHistory } from 'react-router'
import Loading from "../common/Loading";
import SuccessError from "../common/SuccessError"; 
import axios from 'axios';
import { nullChk, validateName, validateEmail, validatePwd } from "../common/CommonValidation";


const AdminRegister = () => {
  useEffect( () => {

    // loading time
    setLoading(true);
    setTimeout( () => {
        setLoading(false);
    }, 1000); // 1000 milliseconds = 1 seconds
}, []);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const userNameChange = (e) => {
    setSuccess([]);
    setError([]);
    setUserName(e.target.value);
  };

  const userEmailChange = (e) => {
    setSuccess([]);
    setError([]);
    setUserEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setSuccess([]);
    setError([]);
    setPassword(e.target.value);
  };

  const saveClick = async (e) => {
    e.preventDefault();
    let err = [];
    
    if (!nullChk(userName)) {
      err.push("please fill name");
    }else if (!validateName(userName)) {
      err.push("pls fill character( a-z and , . ' - ) only in name");
    }
    if (!nullChk(userEmail)){
      err.push("please fill email");
    }else if (!validateEmail(userEmail)) {
      err.push("! invalid email format. pls fill email format.")
    }
    if (!nullChk(password)){
      err.push("please fill password");
    }else if (!validatePwd(password)) {
      err.push("! invalid password format. <br/> password must be a-z, A-Z, 0-9, @#$% ")
    }

    if (err.length > 0) {
      setSuccess([]);
      setError(err);
    } else {

      setError([]);
      let saveData = {
          name: userName,
          email: userEmail,
          password: password,
      };
      
      setLoading(true);
      let response = await axios.post('http://localhost:8000/api/admin/save', saveData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
      } else {
        if (response.data.status == "OK") {

          const [user_code, name, email, password] = response.data.info;
          let msg = ` 
            ${response.data.message}. Copy your account info: <br/><br/>
            <div class="container-fluid">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>User Code</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Password</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>${user_code} </td>
                          <td>${name} </td>
                          <td>${email}</td>
                          <td>${password} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    
          setTimeout( () => {     
            setLoading(false);    

            setSuccess([msg]);
            reset();
            setError([]);

            history.push(`/admin-login`);
          }, 1000); // 1000 milliseconds = 1 seconds

        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    }
  };

  const reset = () => {
    setUserName("");
    setUserEmail("");
    setPassword("");
  };

  
  return (
<>
<div className="min-vh-100  flex-row align-items-center login-bg">

<div className="row justify-content-center mb-3 float-right" style={{marginTop:'1px', marginRight:'1px'}}>
  <CDropdown>
  <CDropdownToggle style={{borderRadius:'0', borderBottomLeftRadius:'15px'}}>
    LogIn mode
  </CDropdownToggle>
    <CDropdownMenu className="mt-1" style={{borderTopLeftRadius:'15px'}}>
      <CDropdownItem href="/admin-login">Admin</CDropdownItem>
      <CDropdownItem href="/user-login">User</CDropdownItem>
      <CDropdownItem href="#" header>new account?</CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</div>

<SuccessError success={success} error={error} />
{loading && <Loading start={true} />}

<div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-6">
      <div className="card login mt-5">
          {/* topside div */}
        <div className="card-body rounded-bottom register">
          <div className="row justify-content-center mb-1">
            <h2 className="login-title ">Admin Account Registeration</h2>
          </div>
        </div>
        <div className='card-body bg-transparent'>
          {/* User Name Input*/}
          <div className="row align-items-center mt-1 justify-content-center">
            <div className="col-lg-10">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text login-input mr-3">
                    <img src="./image/user.png" width="20" height="20" alt="User Icon"/>
                  </span>
                </div>
                <input 
                  type="text" 
                  className="form-control login-input" 
                  placeholder="Enter User Name" 
                  autoFocus 
                  value={userName} 
                  onChange={userNameChange} 
                  required/>
              </div>
            </div>
          </div>
          {/* User Email Input */}
          <div className="row align-items-center mt-3 justify-content-center">
            <div className="col-lg-10">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text login-input mr-3">
                    <img
                      src="./image/email-alt-svgrepo-com.svg"
                      width="20"
                      height="20"
                      alt="Email Icon"
                    />
                  </span>
                </div>
                  <input
                    type="email"
                    className="form-control login-input"
                    placeholder="Enter User Email"
                    value={userEmail}
                    onChange={userEmailChange}
                    required
                  />
              </div>
            </div>
          </div>
          {/* User Password Input */}
          <div className="row align-items-center mt-3 justify-content-center">
            <div className="col-lg-10">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text login-input mr-3">
                    <img src="./image/password.png" width="20" height="20" alt="Password Icon"/>
                  </span>
                </div>
                <input 
                  type="password" 
                  className="form-control login-input" 
                  placeholder="Enter Password" 
                  value={password} 
                  onChange={passwordChange} 
                  required/>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center my-4">
              <button id="login" className="btn btn-primary form-btn login-btn" onClick={saveClick}>Register</button> {/* Change col-9 to col-12 */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</>
  )
}

export default AdminRegister
