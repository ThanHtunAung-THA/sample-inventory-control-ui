import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect
} from '@coreui/react';
import { useHistory } from 'react-router';
import { useLocation  } from 'react-router-dom';
import { nullChk, validateName, validateEmail, validatePwd } from "../../../common/CommonValidation";
import DatePicker from '../../../common/datepicker/DatePicker';
import Loading from "../../../common/Loading";
import SuccessError from "../../../common/SuccessError";
import ConfirmationWithTable from '../../../common/ConfirmationWithTable';
import { ApiRequest } from "../../../common/ApiRequest";
import moment from "moment";
import '../../../../css/form.css'

const Update = () => {
  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`)
    if (flag == "true") {
      console.log("Login process success")
    } else {
      history.push(`/admin-login`);
    }
    setLoading(true);
    setTimeout( () => {
        setLoading(false);
    }, 500); // 1000 milliseconds = 1 seconds
  }, []);
  
  let err = [];
  const history = useHistory();
  const objBarier = useLocation();
  const { admin } = objBarier.state || {}; // Get the admin object from state
  const [id, setId] = useState(admin ? admin.id : '');
  const [userCode, setUserCode] = useState(admin ? admin.user_code : '');
  const [adminName, setAdminName] = useState(admin ? admin.name : '');
  const [adminEmail, setAdminEmail] = useState(admin ? admin.email : '');
  const [adminPhone, setAdminPhone] = useState(admin ? admin.phone : '');
  const [adminDOB, setAdminDOB] = useState(admin ? admin.date_of_birth : '');
  const [password, setPassword] = useState(admin ? admin.password : '');
  const [showPassword, setShowPassword] = useState(false); // Step 1: Add this line

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);


  const handleInputChange = (setter) => (e) => {
    setError([]);
    setSuccess([]);
    setter(e.target.value);
  };
  
  const adminNameChange = handleInputChange(setAdminName);
  const adminEmailChange = handleInputChange(setAdminEmail);
  const adminPhoneChange = handleInputChange(setAdminPhone);
  const passwordChange = handleInputChange(setPassword);

  const adminDOBChange = (e) => {
    setError([]);
    setSuccess([]);
    let date = moment(e).format("YYYY-MM-DD");
    setAdminDOB(date);
    // Check if the date is in the future
    if (moment(date).isAfter(moment())) {
        setError(prev => [...prev, "Date of birth cannot be in the future."]);
        return; // Exit the function if the date is invalid
    }
    // Check if the admin is under 18 years old
    const age = moment().diff(moment(date), 'years');
    if (age < 18) {
        setError(prev => [...prev, "You must be at least 18 years old."]);
    }
}

  const toggleShowPassword = () => { // Step 2: Create a toggle function
    setError([]);
    setSuccess([]);
    setShowPassword(!showPassword);
  };

  // === submit process ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = [];

    if (moment(adminDOB).isAfter(moment())) {
      err.push("D.O.B is future date.");
    }
    const age = moment().diff(moment(adminDOB), 'years');
    if (age < 18) {
      err.push("D.O.B is under 18 years old.");

    }

    if (!nullChk(adminName)) {
      err.push("please fill name");
    }else if (!validateName(adminName)) {
      err.push("pls fill character( a-z and , . ' - ) only in name");
    }
    if (!nullChk(adminEmail)){
      err.push("please fill email");
    }else if (!validateEmail(adminEmail)) {
      err.push("! invalid email format. pls fill email format.")
    }
    if (!nullChk(password)){
      err.push("please fill password");
    }else if (!validatePwd(password)) {
      err.push("! invalid password format. <br/> password must be at least 8 words and included a-z, A-Z, 0-9, @#$% ")
    }
    
    if (err.length > 0) {
      setSuccess([]);
      setError(err);
    } else {

    const msgTitle = 'Edit Admin Data Confirmation';
    const msgBody = [ 
      { label: 'Admin Name', value: adminName }, 
      { label: 'Admin Email', value: adminEmail }, 
      { label: 'Phone', value: adminPhone ? adminPhone : ' ??? ' },
      { label: 'D.O.B', value: adminDOB ? adminDOB : ' ??? ' },
      { label: 'Password', value: password }
    ];
  const msgBtn1 = 'Confirm';
    const msgBtn2 = 'Cancel';
    
    const isConfirmed = await ConfirmationWithTable( msgTitle, msgBody, msgBtn1, msgBtn2 );

    if (isConfirmed) {
      setError([]);
      setLoading(true);
      let saveData = {
        method: "post",
        url: `admin/edit/${id}`,
        params: {
          name: adminName,
          date_of_birth: moment(adminDOB).format("YYYY-MM-DD"),
          email: adminEmail,
          phone: adminPhone,
          password: password,
          
        },
    };
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess([response.data.message]);
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    }
  }
};


return (
  <>
    <CRow>
      <CCol xs="12">
        <SuccessError success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h4 className='m-0'>Edit Admin Account for ID#{id}, User-Code#{userCode}</h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg="6" className="">
                <CRow>
                  <CCol lg="4"><p>Admin Name</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="text" 
                      value={adminName} 
                      onChange={adminNameChange} 
                      placeholder="Enter Admin Name" 
                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>D.O.B</p></CCol>
                  <CCol lg="8">
                    <DatePicker 
                      value={adminDOB } 
                      change={adminDOBChange} 
                    />
                  </CCol>
                </CRow>


              </CCol>

              <CCol lg="6">
                <CRow>
                  <CCol lg="4"><p>Admin Phone</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="text" 
                      value={adminPhone} 
                      onChange={adminPhoneChange} 
                      placeholder="Enter Admin Phone number"

                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>Admin Email</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="email" 
                      value={adminEmail} 
                      onChange={adminEmailChange} 
                      placeholder="Enter Admin Email"

                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>Admin Password</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      id='password'
                      type={showPassword ? "text" : "password"} // Toggle input type
                      value={password} 
                      onChange={passwordChange} 
                      placeholder="Enter Admin Password" 
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol lg="4"></CCol>
                  <CCol lg="8">
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                      />
                      <label htmlFor="showPassword" className="ml-2 non-selectable ">
                        Show Password
                      </label>
                    </div>
                  </CCol>
                </CRow>

              </CCol>
            </CRow>
            <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
              <CButton className="form-btn" onClick={handleSubmit}>
                Save
              </CButton>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <Loading start={loading} />
  </>
);
};

export default Update
