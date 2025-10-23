import React, { useEffect, useMemo, useState } from 'react'
import { useDomain } from '../../../redux/features/domain/domainSlice'
import handleApiRequest from '../../../api/handleApiRequest'
import { api } from '../../../api/api'
import DataTable from '../../common/datatable/DataTable'
import Button from '../../custom/Button'

const TableStoreList = () => {

  
  const domain = useDomain()

  const [tableData, setTableData] = useState([])
  const [linkFirst, setLinkFirst] = useState('')
  const [linkLast, setLinkLast] = useState('')
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const url = `${domain}/${api.stores}`

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

  
  const columns = useMemo(() => [
    {
      header: 'ID',
      accessorKey: "id",
    },
    {
      header: 'Store Name',
      accessorKey: "store_name",
    },
    // {
    //   header: '',
    //   accessorKey: "actions",
    //   enableSorting: false,
    //   cell: ({ row }) => {
    //     const item = row.original

    //     return (
    //       <div className="action-container">

    //         <Button onClick={() => console.log(item)}>
    //           View
    //         </Button>
            
    //       </div>
    //     )
    //   }
    // }
  ], [])
  
  
  return (
    <div className="table-user-list">
      
      <DataTable
        columns={columns}
        data={tableData}
      />
      
    </div>
  )
}

export default TableStoreList