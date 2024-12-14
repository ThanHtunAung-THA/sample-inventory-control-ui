// ConfirmationWithTable.js
import React from 'react';
import Swal from 'sweetalert2';

const ConfirmationWithTable = async (title, body, confirmButtonText, cancelButtonText) => {
    const headers = body.map(item => `<th>${item.label}</th>`).join('');
    const values = body.map(item => `<td>${item.value}</td>`).join('');

    const message = `
        <div class="container" style="font-family: Arial, sans-serif; line-height: 1.5;">
            <table class="table table-bordered mt-3">
                <thead>
                    <tr>
                        ${headers}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${values}
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: title,
        html: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: true,
        confirmButtonColor: title === 'Delete Confirmation' ? '#ff4d4d' : '#4d79ff',
        cancelButtonColor: '#343A40',
        // customClass: {
        //     confirmButton: title === 'Delete Confirmation' ? 'btn btn-danger' : 'btn btn-warning',
        //     cancelButton: 'btn btn-outline-light',
        // },        
        width: "fit-content",
        height: "100px",
    });

    return result.isConfirmed;
};

export default ConfirmationWithTable;
