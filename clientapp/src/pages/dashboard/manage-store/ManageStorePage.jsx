import React from 'react'
import PageTitleContainer from '../../../components/common/PageTitleContainer'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/custom/Button';
import TableStoreList from '../../../components/dashboard/manage-store/TableStoreList';

const ManageStorePage = () => {

  const navigate = useNavigate();
  
  const columns = [
    { header: 'Store Name', accessorKey: 'storeName' },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Actions', accessorKey: 'actions' },
  ]

  const data = [
    {
      storeName: 'Store 1',
      owner: 'Owner 1',
      location: 'Location 1',
      status: 'Active',
      actions: 'Edit | Delete'
    },
    {
      storeName: 'Store 2',
      owner: 'Owner 2',
      location: 'Location 2',
      status: 'Inactive',
      actions: 'Edit | Delete'
    }
  ]

  return (
    <div className='manage-store-page'>

      <PageTitleContainer
        title='Manage Store'
        description='Manage your store settings and preferences.'
        rightSide={
          <>

            <Button
              onClick={() => navigate('/dashboard/create-store')}
            >
              Create Store
            </Button>

          </>
        }
      />

      <TableStoreList />
      
    </div>
  )
}

export default ManageStorePage