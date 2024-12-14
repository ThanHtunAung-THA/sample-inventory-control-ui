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
import { nullChk, validateName, validateEmail, validatePwd } from "../../../common/CommonValidation";
import DatePicker from '../../../common/datepicker/DatePicker';
import Loading from "../../../common/Loading";
import SuccessError from "../../../common/SuccessError";
import ConfirmationWithTable from '../../../common/ConfirmationWithTable';
import { ApiRequest } from "../../../common/ApiRequest";
import moment from "moment";
import '../../../../css/form.css'

const Create = () => {
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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDOB, setUserDOB] = useState( moment().format("YYYY-MM-DD")  || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Step 1: Add this line

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const handleInputChange = (setter) => (e) => {
    setError([]); // Clear errors
    setSuccess([]); // Clear successes
    setter(e.target.value); // Update the state with the new value
  };
  
  const userNameChange = handleInputChange(setUserName);
  const userEmailChange = handleInputChange(setUserEmail);
  const userPhoneChange = handleInputChange(setUserPhone);
  const passwordChange = handleInputChange(setPassword);

const userDOBChange = (e) => {
    setError([]);
    setSuccess([]);
    let date = moment(e).format("YYYY-MM-DD");
    setUserDOB(date);
    // Check if the date is in the future
    if (moment(date).isAfter(moment())) {
        setError(prev => [...prev, "Date of birth cannot be in the future."]);
        return; // Exit the function if the date is invalid
    }
    // Check if the user is under 18 years old
    const age = moment().diff(moment(date), 'years');
    if (age < 18) {
        setError(prev => [...prev, "You must be at least 18 years old."]);
    }
}

  const toggleShowPassword = () => { // Step 2: Create a toggle function
    setShowPassword(!showPassword);
  };


  // === submit process ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = [];

    if (moment(userDOB).isAfter(moment())) {
      err.push("D.O.B is future date.");
    }
    const age = moment().diff(moment(userDOB), 'years');
    if (age < 18) {
      err.push("D.O.B is under 18 years old.");

    }

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
      err.push("! invalid password format. <br/> password must be at least 8 words and included a-z, A-Z, 0-9, @#$% ")
    }

    if (err.length > 0) {
      setSuccess([]);
      setError(err);
    } else {

    const msgTitle = 'New User Data Confirmation ';
    const msgBody = [ 
      { label: 'User Name', value: userName }, 
      { label: 'User Email', value: userEmail }, 
      { label: 'Phone', value: userPhone ? userPhone : ' ??? ' },
      { label: 'D.O.B', value: userDOB ? userDOB : ' ??? ' },
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
          url: `user/add`,
          params: {
            name: userName,
            date_of_birth: moment(userDOB).format("YYYY-MM-DD"),
            email: userEmail,
            phone: userPhone,
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
            resetForm();
          } else {
            setError([response.data.message]);
            setSuccess([]);
          }
        }
        setLoading(false);
      }
    }

  };

  const resetForm = () => {
    setUserName("");
    setUserDOB(null);
    setUserPhone("");
    setUserEmail("");
    setPassword("");

  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>User Account Registeration</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg="6" className="">
                  <CRow>
                    <CCol lg="4"><p>User Name</p></CCol>
                    <CCol lg="8">
                      <CInput 
                        type="text" 
                        value={userName} 
                        onChange={userNameChange} 
                        placeholder="Enter User Name" 
                      />
                    </CCol>
                  </CRow>
                  <CRow style={{ marginTop: "10px" }}>
                    <CCol lg="4"><p>D.O.B</p></CCol>
                    <CCol lg="8">
                      <DatePicker 
                        value={userDOB } 
                        change={userDOBChange} 
                      />
                    </CCol>
                  </CRow>


                </CCol>

                <CCol lg="6">
                  <CRow>
                    <CCol lg="4"><p>User Phone</p></CCol>
                    <CCol lg="8">
                      <CInput 
                        type="text" 
                        value={userPhone} 
                        onChange={userPhoneChange} 
                        placeholder="Enter User Phone number"

                      />
                    </CCol>
                  </CRow>
                  <CRow style={{ marginTop: "10px" }}>
                    <CCol lg="4"><p>User Email</p></CCol>
                    <CCol lg="8">
                      <CInput 
                        type="email" 
                        value={userEmail} 
                        onChange={userEmailChange} 
                        placeholder="Enter User Email"

                      />
                    </CCol>
                  </CRow>
                  <CRow style={{ marginTop: "10px" }}>
                    <CCol lg="4"><p>User Password</p></CCol>
                    <CCol lg="8">
                      <CInput 
                        id='password'
                        type={showPassword ? "text" : "password"} // Toggle input type
                        value={password} 
                        onChange={passwordChange} 
                        placeholder="Enter User Password" 
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

export default Create;
