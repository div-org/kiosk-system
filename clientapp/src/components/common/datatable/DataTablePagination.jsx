import { useState } from 'react'
import { LiaCaretLeftSolid, LiaCaretRightSolid } from 'react-icons/lia'
import Input from '../../custom/input/Input'
// import CustomSelectWithPopover from '../../custom/CustomSelectWithPopover'
// import useMyTranslation from '../../../hooks/useMyTranslation'

const entriesList = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
  { label: '50', value: 50 }
]

const DataTablePagination = ({
  table
}) => {

  // const { t, isArabic } = useMyTranslation()

  const [selectedEntry, setSelectedEntry] = useState(entriesList[0])
  const [currentPage, setCurrentPage] = useState(table.getState().pagination.pageIndex + 1)

  const handleEntriesChanged = (item) => {
    table.setPageSize(Number(item.value))
    setSelectedEntry(item)
  }

  const handleInputChanged = (e) => {
    const { value } = e.target;

    setCurrentPage(value);
  }

  const handlePageSubmit = () => {
    let page = Number(currentPage);

    if (page > table.getPageCount()) {
      page = table.getPageCount()
    } else if (page < 1) {
      page = 1
    }

    table.setPageIndex(page - 1);
    setCurrentPage(page)
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return
    handlePageSubmit()
  }

  const handleChangePage = (type) => {
    const isPrevPage = type === 'prev' && table.getCanPreviousPage();
    const isNextPage = type === 'next' && table.getCanNextPage();

    if (isPrevPage) {
      table.previousPage();
      setCurrentPage(p => p - 1);
    }

    if (isNextPage) {
      table.nextPage();
      setCurrentPage(p => p + 1);
    }
  }

  return (
    <div className="bottom-table-actions-container">

      <div className="bottom-table-actions-wrapper">

        <div className="entries-control">
          <p>Show</p>
          {/* <CustomSelectWithPopover
            options={entriesList}
            value={selectedEntry}
            onChange={handleEntriesChanged}
          /> */}
          <p>Entries</p>
        </div>

        <div className="page-control">
          <div
            className={`page-prev`}
            onClick={() => handleChangePage('prev')}
            disabled={!table.getCanPreviousPage()}
          >
            <LiaCaretLeftSolid />
            <span>Prev</span>
          </div>

          <div className="page-input-wrapper">
            <Input
              type="number"
              min="1"
              max={table.getPageCount()}
              value={currentPage}
              onChange={handleInputChanged}
              onKeyDown={handleKeyDown}
              onBlur={handlePageSubmit}
              className="page-input"
            />
            <p>of {table.getPageCount().toLocaleString()}</p>
          </div>

          <div
            className={`page-next`}
            onClick={() => handleChangePage('next')}
            disabled={!table.getCanNextPage()}
          >
            <span>Next</span>
            <LiaCaretRightSolid />
          </div>
        </div>

      </div>

    </div>
  )
}

export default DataTablePagination