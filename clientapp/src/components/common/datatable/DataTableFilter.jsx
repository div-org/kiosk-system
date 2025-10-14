import { useState } from 'react'
// import CustomSelect from '../../custom/CustomSelect'
// import DebouncedInput from '../../custom/input/DebouncedInput'
// import { useTranslation } from 'react-i18next'

const DataTableFilter = ({
  table,
  filterData = [],
  setGlobalFilter = () => {},
  showSearch = false
}) => {

  // const { t } = useTranslation()

  if (filterData.length <= 0 && !showSearch) {
    return
  }
  
  return (
    <div className="top-table-actions-container">
            
      <div className="top-table-actions-wrapper">
        <div className="table-filter-wrapper">
          {
            filterData.map(filterObj => {
              const { key } = filterObj
              
              return <FilterWrapper key={key} table={table} filterObj={filterObj} />
            })
          }
        </div>

        {showSearch &&
          <div className="search-table-wrapper">
            {/* <DebouncedInput onChange={(value) => setGlobalFilter(value)} delay={250} placeholder={t('search_with_dot')} /> */}
          </div>}
      </div>

    </div>
  )
}

export default DataTableFilter


const FilterWrapper = ({
  table,
  filterObj = {}
}) => {
  const { key, filterName = '', filterList = [] } = filterObj

  const [selectedFilter, setSelectedFilter] = useState(filterList[0])

  const handleSelectChanged = (item) => {
    table.getColumn(key)?.setFilterValue(item.value)
    setSelectedFilter(item)
  }

  return (
    <div className="table-filter">
      <p>{filterName}</p>
      {/* <CustomSelect
        options={filterList}
        onChange={handleSelectChanged}
        value={selectedFilter}
      /> */}
    </div>
  )
}