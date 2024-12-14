import React, {useState,useEffect} from 'react'
import { 
  CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
 } from '@coreui/react';
import SuccessError from '../common/SuccessError';
import Loading from "../common/Loading";
import "../../css/login.css";


const AdminLoginForm = (props) => {
  useEffect( () => {
    // loading time
    setLoading(true);
    setTimeout( () => {
        setLoading(false);
    }, 500); // 1000 milliseconds = 1 seconds
}, []);

  let {
    loginClick, passwordChange, password, 
    userCodeChange, userCode,
    success, error
  } = props;
  const [ loading, setLoading ] = useState(false);


  return (
<>
  <div className="min-vh-100  flex-row align-items-center login-bg">
  <div className="row justify-content-center mb-3 float-right" style={{marginTop:'1px', marginRight:'1px'}}>
    <CDropdown>
    <CDropdownToggle style={{borderRadius:'0', borderBottomLeftRadius:'15px'}}>
      LogIn mode
    </CDropdownToggle>
    <CDropdownMenu className="mt-1" style={{borderTopLeftRadius:'15px'}}>
        <CDropdownItem href="#" header>Admin</CDropdownItem>
        <CDropdownItem href="/user-login">User</CDropdownItem>
        <CDropdownItem href="/admin-register">new account?</CDropdownItem>
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
          <div className="card-body rounded-bottom admin">
            {/* <div className="row justify-content-center mb-3 "> */}
              {/* <h3 className='display-3' style={{color:'#3e405b'}}> */}
                {/* IVEN */}
                {/* <img src="./image/Inven.jpg" className='rounded-circle' width={150} height={150} alt="Logo"/> */}
              {/* </h3> */}
            {/* </div> */}
            <div className="row justify-content-center mb-1">
              <h2 className="login-title ">Admin Login System</h2>
            </div>
          </div>
          <div className='card-body bg-transparent'>
              {/* botside div */}
            <div className="row align-items-center mt-4 justify-content-center">
              <div className="col-lg-10">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text login-input mr-3">
                      <img src="./image/user.png" width="20" height="20" alt="User Icon"/>
                    </span>
                  </div>
                  <input type="text" className="form-control login-input" placeholder="Enter User-Code or registered Email" autoFocus value={userCode} onChange={userCodeChange}/>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-10">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text login-input mr-3">
                      <img src="./image/password.png" width="20" height="20" alt="Password Icon"/>
                    </span>
                  </div>
                  <input type="password" className="form-control login-input" placeholder="Enter Password" value={password} onChange={passwordChange}/>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="row align-items-center justify-content-center mb-4">
                <button id="login" className="btn btn-primary form-btn login-btn" onClick={loginClick}>Login</button> {/* Change col-9 to col-12 */}
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

export default AdminLoginForm
