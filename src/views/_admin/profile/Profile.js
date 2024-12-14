import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
} from '@coreui/react';
import { useHistory } from 'react-router';
import moment from "moment";
import Loading from "../../common/Loading";
import { nullChk, validateName, validateEmail, validatePwd } from "../../common/CommonValidation";
import DatePicker from '../../common/datepicker/DatePicker';
import SuccessError from "../../common/SuccessError";
import ConfirmationWithTable from '../../common/ConfirmationWithTable';
import { fetchProfileData, updateProfileData } from '../../common/CustomApiRequest';
import '../../../css/form.css'


const Profile = () => {
  const history = useHistory();
  const [profileData, setProfileData] = useState([]);
  const [userID, setUserID] = useState( localStorage.getItem('user-id') || '');
  const [userCode, setUserCode] = useState( localStorage.getItem('user-code') || '');
  const [userName, setUserName] = useState( localStorage.getItem('user-name') || '');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDOB, setUserDOB] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("LoginProcess");
    
    if (isLoggedIn !== "true") {
      history.push("/admin-login");
    } else {
      const fetchData = async () => {
        try {
            setLoading(true);
            const profileResponse = await fetchProfileData( 'admin', userID );
            const data = profileResponse.data.data;
      
            setProfileData(data ? data : '');
            setUserEmail(data.email ? data.email : '');
            setUserPhone(data.phone ? data.phone : '');
            // setUserDOB(data ? data.date_of_birth : '');
            setUserDOB(data.date_of_birth ? data.date_of_birth : null); // Ensure a valid date or null

            setPassword(data.password ? data.password : '');
      
        } catch (error) {
          console.error("Error fetching data:", error);
        }
          setTimeout( () => {
            setLoading(false);
        }, 1000); // 1000 milliseconds = 1 seconds
      };
    
      fetchData();
    }
  }, []);

  const handleInputChange = (setter) => (e) => {
    setError([]);
    setSuccess([]);
    setter(e.target.value);
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
    setError([]);
    setSuccess([]);
    setShowPassword(!showPassword);
  };

  // === Edit process ===
  const handleEdit = () => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    setTimeout( () => {
      setLoading(false);
      setEditMode(true);
    }, 500); // 1000 milliseconds = 1 seconds
  }

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

    const msgTitle = 'Edit User Data Confirmation';
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
            name: userName,
            date_of_birth: moment(userDOB).format("YYYY-MM-DD"),
            email: userEmail,
            phone: userPhone,
            password: password,
        };
        let response = await updateProfileData( 'admin', userID, saveData );
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
  
  const handleCancel = () => {
    setError([]);
    setSuccess([]);
    setEditMode(false);
  };

  return (
    <>
    <CRow>
      <CCol xs="12">
        <SuccessError success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h4 className='m-0'>Admin Profile Detail<span className='float-right'>UserID - {userID} / UserCode - {userCode}</span></h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg="2"></CCol>
              <CCol lg="6" className="">
                <CRow>
                  <CCol lg="4"><p>Admin Name</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="text" 
                      value={userName} 
                      onChange={userNameChange} 
                      placeholder="Enter User Name"
                      disabled={!editMode}
                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>D.O.B</p></CCol>
                  <CCol lg="8">
                    <DatePicker 
                      value={userDOB } 
                      change={userDOBChange}
                      disabled={!editMode} 
                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>Phone</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="text" 
                      value={userPhone} 
                      onChange={userPhoneChange} 
                      placeholder="Enter User Phone number"
                      disabled={!editMode}
                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>Email</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      type="email" 
                      value={userEmail} 
                      onChange={userEmailChange} 
                      placeholder="Enter User Email"
                      disabled={!editMode}
                    />
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="4"><p>Password</p></CCol>
                  <CCol lg="8">
                    <CInput 
                      id='password'
                      type={showPassword ? "text" : "password"} // Toggle input type
                      value={password} 
                      onChange={passwordChange} 
                      placeholder="Enter User Password" 
                      disabled={!editMode}
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

              <CCol lg="4"></CCol>
            </CRow>
            <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
              { editMode == false && (
                <CButton className="form-btn" onClick={handleEdit}>
                  Edit Profile
                </CButton>
              )}
              { editMode == true && (
                <div>
                  <CButton className="form-btn" onClick={handleSubmit}>
                    Save Profile
                  </CButton>              
                  <CButton className="form-btn ml-2" onClick={handleCancel}>
                    Cancel
                  </CButton>   
                </div>           
              )}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <Loading start={loading} />
  </>
  );
};

export default Profile;
