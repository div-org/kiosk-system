import React, { useState } from 'react'
import PageTitleContainer from '../../../components/common/PageTitleContainer'
import Button from '../../../components/custom/Button';
import TableStoreList from '../../../components/dashboard/manage-store/TableStoreList';
import CreateStoreModal from '../../../components/dashboard/manage-store/CreateStoreModal';


const ManageStorePage = () => {


  const [showModal, setShowModal] = useState(false)


  return (
    <>

      <div className='manage-store-page'>

        <PageTitleContainer
          title='Manage Store'
          description='Manage your store settings and preferences.'
          rightSide={
            <>

              <Button
                onClick={() => setShowModal(true)}
              >
                Create Store
              </Button>

            </>
          }
        />

        <TableStoreList />
        
      </div>

      {
        showModal &&
        <CreateStoreModal
          onHide={() => setShowModal(false)}
        />
      }

    </>
  )
}

export default ManageStorePage