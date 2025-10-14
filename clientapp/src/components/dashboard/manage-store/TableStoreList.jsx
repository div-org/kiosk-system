import React, { useEffect, useState } from 'react'
import { useDomain } from '../../../redux/features/domain/domainSlice'
import handleApiRequest from '../../../api/handleApiRequest'
import { api } from '../../../api/api'

const TableStoreList = () => {

  
  const domain = useDomain()

  const [tableData, setTableData] = useState([])
  const [linkFirst, setLinkFirst] = useState('')
  const [linkLast, setLinkLast] = useState('')
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const url = `${domain}/${api.users}`

        const headers = {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
        
        const res = await handleApiRequest({ url, headers })

        const { data, links } = res
        const { first, last } = links

        setTableData(data)
        setLinkFirst(first)
        setLinkLast(last)
      } catch (error) { }

    }

    fetchData()
  }, [])
  
  
  return (
    <div className="table-user-list">
      {
        tableData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Unique ID</th>
                <th>PIN Code</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map(item => {
                  const { id, email, firstname, lastname, created_at, unique_id, pin_code } = item

                  return (
                    <tr
                      key={id}
                    >
                      <td>{email}</td>
                      <td>{unique_id}</td>
                      <td>{pin_code}</td>
                      <td>{firstname}</td>
                      <td>{lastname}</td>
                      <td>{created_at}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }

      <div className="page-control">
        
      </div>
    </div>
  )
}

export default TableStoreList