import React, { useEffect } from "react";
import { Markup } from "interweave";
import Swal from "sweetalert2";

/**
 * To show error and success message with SweetAlert style
 *
 * @param   {error} props => array of error messages
 * @param   {error2} props => array of secondary error messages
 * @param   {success} props => array of success messages
 * @returns SweetAlert pop-up with either error or success messages
 */
const SuccessError = ({ error = [], error2 = [], success = [] }) => {
  // Combine errors and remove duplicates
  const errors = Array.from(new Set([...error, ...error2]));

  // Function to show a SweetAlert modal
  const showAlert = (type, messages) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      html: messages.map((msg, index) => `<div key=${index} class="mb-4"> ${msg} </div>`).join(""),
      icon: "warning",
      padding: "3em",
      width: type === "success" ? 'fit-content' : "600px",
      color: type === "success" ? "#28a745" : "#dc3545", // success or error color
      background: "#fff ",
      backdrop: type === "success" 
      ? `#279d3c45`
      : `#c5222245`,
      // : `rgba(100,100,100,0.8) url("/image/confused-unga.gif") right top no-repeat`,
        
/* 
  `rgba(100,100,100,0.8)` 
  rgba(0,0,123,0.4)
  url("/image/nyan-cat-nyan.gif")
  left top
  no-repeat

  #ef353594
  #ff00003b
*/

      confirmButtonText: "Close",
    });
  };
  
  // Trigger the alert whenever error or success messages are passed as props
  useEffect(() => {
    if (errors.length > 0) {
      showAlert("error", errors);
    } else if (success.length > 0) {
      showAlert("success", success);
    }
  }, [errors, success]);

  return null; // This component does not render anything directly
};

export default SuccessError;
