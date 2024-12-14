import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { 
    CInput, CButton, CLink, CCard, CCardBody, CCardHeader, CRow, CCol,
    CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem
} from '@coreui/react';
import { useHistory } from 'react-router';
import Swal from "sweetalert2";
import ConfirmationWithTable from '../../../common/ConfirmationWithTable';
import axios from 'axios';
import SuccessError from '../../../common/SuccessError';
import Loading from "../../../common/Loading";
import "../../../../css/datatable.css"


const List = () => {
    const history = useHistory();    
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
      try {
          setLoading(true);
          const response = await axios.get('http://localhost:8000/api/admin/get'); // Adjust API endpoint as needed
          console.log(response.data.data); // Check the structure of the response
          setAdmins(response.data.data);
          setFilteredAdmins(response.data.data); // Initially, filtered data is the same as all data
      } catch (error) {
          console.error('Error fetching admins:', error);
      } finally {
          setLoading(false);
      }
    };

    const handleEdit = async (admin) => {
        const isConfirmed = await ConfirmationWithTable(
            'Edit Confirmation',
            [
              { label: 'ID', value: admin.id }, 
              { label: 'User-Code', value: admin.user_code },
              { label: 'Name', value: admin.name },
              { label: 'Email', value: admin.email },
              { label: 'Phone', value: admin.phone ? admin.phone : ' ??? ' },
              { label: 'D.O.B', value: admin.date_of_birth ? admin.date_of_birth : ' ??? ' },

            ],
            'Proceed to edit',
            'Cancel'
        );

        if (isConfirmed) {
            history.push({
              pathname: `/admin/admin-edit/${admin.id}`,
              state: { admin }
          });
        }
    };

    const handleDelete = async (admin) => {
        const isConfirmed = await ConfirmationWithTable(
            'Delete Confirmation',
            [
              { label: 'ID', value: admin.id }, 
              { label: 'User-Code', value: admin.user_code },
              { label: 'Name', value: admin.name },
              { label: 'Email', value: admin.email }

            ],
            'Proceed to Delete',
            'Cancel'
        );

        if (isConfirmed) {
            try {
                setLoading(true);
                await axios.delete(`/api/admin/remove/${admin.id}`);
                fetchAdmins();
                Swal.fire({
                    title: "Deleted!",
                    text: "Admin  has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Admin could not be deleted.",
                    icon: "warning"
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filteredData = admins.filter((admin) =>
            admin.id.toString().includes(value) ||
            admin.user_code.toLowerCase().includes(value) ||
            admin.name.toLowerCase().includes(value) ||
            admin.email.toLowerCase().includes(value)
        );

        setFilteredAdmins(filteredData);
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '60px', // Set the width for this column
            // cell: row => (
            //     <div >
            //         {row.id}
            //     </div>
            // )
        },
        {
            name: 'User_Code',
            selector: row => row.user_code,
            sortable: true,
            width: '150px', // Set the width for this column
            
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '200px', // Set the width for this column
            
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '300px', // Set the width for this column
            
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            // width: '110px', // Set the width for this column
        },
        {
            name: 'D.O.B',
            selector: row => row.date_of_birth,
            sortable: true,
            // width: '110px', // Set the width for this column
            
        },
        // {
        //   name: 'Actions',
        //   cell: row => (
        //       <CDropdown>
        //           <CDropdownToggle color="" size="" className="cdd-custom">
        //               <img src={"/image/setting-setting-svgrepo-com.svg"} alt="Settings" style={{ width: 28, height: 28 }} />
        //           </CDropdownToggle>
        //           <CDropdownMenu>
        //               <CDropdownItem onClick={() => handleEdit(row)} className="d-flex justify-content-between align-items-center">
        //                   Edit
        //                   <img src={"/image/Edit-Component-inactive.svg"} alt="Edit" style={{ width: 28, height: 28 }} />
        //               </CDropdownItem>
        //               <CDropdownItem onClick={() => handleDelete(row)} className="d-flex justify-content-between align-items-center">
        //                   Delete
        //                   <img src={"/image/Delete-Component-inactive.svg"} alt="Delete" style={{ width: 28, height: 28 }} />
        //               </CDropdownItem>
        //           </CDropdownMenu>
        //       </CDropdown>
        //   )
        // }
    ];

    return (
        <>
            <SuccessError success={success} error={error} />
            {loading && <Loading start={true} />}

            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md="4">
                            {/* <h5>Total Sales: {totalSales}</h5> */}
                        </CCol>
                        <CCol md="4">
                            {/* <h5>Total Profit: {totalProfit}</h5> */}
                        </CCol>
                        <CCol md="4" className="text-right">
                            <CLink href="/admin/admin-new" className="btn link">
                                {/* <FontAwesomeIcon icon={faCirclePlus} style={{marginRight: 10}}/>  */}
                                <img src={"/image/add-user-square-svgrepo-com.svg"} alt="Settings" style={{ marginRight: 15, width: 28, height: 28 }} />
                                New Account
                            </CLink>
                        </CCol>
                    </CRow>

                    <CRow className="mt-3">
                        <CCol md="12">
                            <CInput
                                type="text"
                                placeholder="Search by ID, User Code, Name, or Email"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </CCol>
                    </CRow>
                </CCardHeader>

                <CCardBody>
                  <div style={{ overflowX: 'auto' }}>
                    <DataTable
                        columns={columns}
                        data={filteredAdmins}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        className="DataTable"

                    />
                  </div>
                </CCardBody>
            </CCard>
        </>
    );
}

export default List;
