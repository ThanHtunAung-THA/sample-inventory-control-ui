import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { 
    CInput, CButton, CLink, CCard, CCardBody, CCardHeader, CRow, CCol,
    CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem
} from '@coreui/react';
import { useHistory } from 'react-router';
import Swal from "sweetalert2";
import axios from 'axios';
import ConfirmationWithTable from '../../../common/ConfirmationWithTable';
import { fetchAllUserData } from '../../../common/CustomApiRequest';
import SuccessError from '../../../common/SuccessError';
import Loading from "../../../common/Loading";
import "../../../../css/datatable.css"

const List = () => {
    const history = useHistory();    
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
          setLoading(true);
          const response = await fetchAllUserData();
          console.log(response.data.data);
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
      } catch (error) {
          console.error('Error fetching users:', error);
      } finally {
          setLoading(false);
      }
    };

    const handleEdit = async (user) => {
        const isConfirmed = await ConfirmationWithTable(
            'Edit Confirmation',
            [
              { label: 'ID', value: user.id }, 
              { label: 'User-Code', value: user.user_code },
              { label: 'Name', value: user.name },
              { label: 'Email', value: user.email },
              { label: 'Phone', value: user.phone ? user.phone : ' ??? ' },
              { label: 'D.O.B', value: user.date_of_birth ? user.date_of_birth : ' ??? ' },
            ],
            'Proceed to edit',
            'Cancel'
        );

        if (isConfirmed) {
            history.push({
              pathname: `/admin/user-edit/${user.id}`,
              state: { user }
          });
        }
    };

    const handleDelete = async (user) => {
        const isConfirmed = await ConfirmationWithTable(
            'Delete Confirmation',
            [
              { label: 'ID', value: user.id }, 
              { label: 'User-Code', value: user.user_code },
              { label: 'Name', value: user.name },
              { label: 'Email', value: user.email }

            ],
            'Proceed to Delete',
            'Cancel'
        );

        if (isConfirmed) {
            try {
                setLoading(true);
                await axios.delete(`/api/user/remove/${user.id}`);
                fetchUsers();
                Swal.fire({
                    title: "Deleted!",
                    text: "User  has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "User could not be deleted.",
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

        const filteredData = users.filter((user) =>
            user.id.toString().includes(value) ||
            user.user_code.toLowerCase().includes(value) ||
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        );

        setFilteredUsers(filteredData);
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
            width: '110px', // Set the width for this column
            
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '150px', // Set the width for this column
            
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
        {
          name: 'Actions',
          cell: row => (
              <CDropdown>
                  <CDropdownToggle color="" size="" className="cdd-custom">
                      <img src={"/image/setting-setting-svgrepo-com.svg"} alt="Settings" style={{ width: 28, height: 28 }} />
                  </CDropdownToggle>
                  <CDropdownMenu className="custom-dropdown-menu">
                      <CDropdownItem onClick={() => handleEdit(row)} className="d-flex justify-content-between align-items-center">
                          Edit
                          <img src={"/image/Edit-Component-inactive.svg"} alt="Edit" style={{ width: 28, height: 28 }} />
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDelete(row)} className="d-flex justify-content-between align-items-center">
                          Delete
                          <img src={"/image/Delete-Component-inactive.svg"} alt="Delete" style={{ width: 28, height: 28 }} />
                      </CDropdownItem>
                  </CDropdownMenu>
              </CDropdown>
          )
        }
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
                            <CLink href="/admin/user-new" className="btn link">
                                {/* <FontAwesomeIcon icon={faCirclePlus} style={{marginRight: 10}}/>  */}
                                <img src={"/image/add-user-square-left-svgrepo-com.svg"} alt="Settings" style={{ marginRight: 15, width: 28, height: 28 }} />
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
                  <div style={{}}>
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
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
