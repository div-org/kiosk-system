import React, { useState } from 'react'
import Modal from '../../common/modal/Modal'
import Loader from '../../loader/Loader'
import useFetchOnMount from '../../../hooks/useFetchOnMount'
import { api } from '../../../api/api'
import Select from '../../custom/Select'
import SelectWithPopover from '../../custom/SelectWithPopover'
import Button from '../../custom/Button'
import handleApiRequest from '../../../api/handleApiRequest'
import { useDomain } from '../../../redux/features/domain/domainSlice'

const SelectedUserModal = ({
  selectedRow = {},
  onHide = () => {}
}) => {

  const domain = useDomain()

  const { id } = selectedRow

  const [values, setValues] = useState({})
  const [storeList, setStoreList] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [roleList, setRoleList] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)

  const { firstname, lastname, email, unique_id } = values

  const fetchUserDetails = (data) => {
    setValues({
      ...selectedRow,
      ...data
    })

    if (data.store) {
      setSelectedStore({
        ...data.store,
        value: data.store.id,
        label: data.store.store_name
      })
    }

    if (data.role) {
      setSelectedRole({
        ...data.role,
        value: data.role.id,
        label: data.role.name
      })
    }
  }

  const { isFetching } = useFetchOnMount({
    url: `${api.users}/${id}`,
    getData: fetchUserDetails,
  })

  
  const fetchStoreList = (data) => {
    const newData = data.map(item => ({
      ...data,
      value: item.id,
      label: item.store_name,
    }))
    setStoreList(newData)
  }
  
  useFetchOnMount({
    url: `${api.stores}`,
    getData: fetchStoreList,
    withAuth: true,
  })


  const fetchRolesList = (data) => {
    const newData = data.map(item => ({
      ...data,
      value: item.id,
      label: item.name,
    }))
    setRoleList(newData)
  }

  useFetchOnMount({
    url: `${api.roles}`,
    getData: fetchRolesList,
    withAuth: true,
  })


  const handleSave = async () => {
    try {

      const url = `${domain}/${api.users}/${id}`

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }

      const payload = {
        ...values,
        store_id: selectedStore.value,
        role_id: selectedRole.value
      }

      delete payload.id
      delete payload.created_at
      delete payload.updated_at
      
      const res = await handleApiRequest({ 
        url,
        method: 'PUT',
        headers,
        payload
      })

      console.log(res)
      
    } catch (error) {
      
    }
  } 
  
  
  
  return (
    <Modal
      show
      className='selected-user-modal'
      onHide={onHide}
      isCloseOutsideClick
    >

      <Loader
        isLoading={isFetching}
      />

      <div className="modal-header">
        <h3 className="modal-title">User Details</h3>
      </div>

      <div className="modal-content">

        <div className="detail-row">
          <span className="label">Unique ID: </span>
          <span className="value">{unique_id}</span>
        </div>

        <div className="detail-row">
          <span className="label">Name: </span>
          <span className="value">{firstname} {lastname}</span>
        </div>

        <div className="detail-row">
          <span className="label">Store: </span>
          <span className="value">
            <SelectWithPopover
              options={storeList}
              value={selectedStore ?? {}}
              onChange={setSelectedStore}
            />
          </span>
        </div>

        <div className="detail-row">
          <span className="label">Role: </span>
          <span className="value">
            <SelectWithPopover
              options={roleList}
              value={selectedRole ?? {}}
              onChange={setSelectedRole}
            />
          </span>
        </div>

        <div className="btn-container">
          <Button
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            onClick={onHide}
          >
            Cancel
          </Button>
        </div>

      </div>

    </Modal>
  )
}

export default SelectedUserModal