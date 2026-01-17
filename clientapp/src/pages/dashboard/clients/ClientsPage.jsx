import { useNavigate } from 'react-router-dom'
import Button from '../../../components/custom/Button'
import TableUserList from '../../../components/dashboard/home/TableUserList'
import PageTitleContainer from '../../../components/common/PageTitleContainer';
import { useLoginData } from '../../../redux/features/login/loginSlice';
import { useState } from 'react';
import SelectedUserModal from '../../../components/dashboard/home/SelectedUserModal';

const ClientsPage = () => {

  const { company = {} } = useLoginData();
  const { company_name = '' } = company;

  const navigate = useNavigate();
  
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <>
      <div className='dashboard-page'>

        <TableUserList
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
        
      </div>

      {
        selectedRow &&
        <SelectedUserModal
          selectedRow={selectedRow}
          onHide={() => setSelectedRow(null)}
        />
      }

    </>
  )
}

export default ClientsPage