import { useEffect, useState } from 'react'
import { LiaCaretLeftSolid, LiaCaretRightSolid } from 'react-icons/lia'
import Input from '../../custom/input/Input'
import CustomSelectWithPopover from '../../custom/CustomSelectWithPopover'
import useMyTranslation from '../../../hooks/useMyTranslation'



const entriesList = [
   { label: '10', value: 10 },
   { label: '20', value: 20 },
   { label: '30', value: 30 },
   { label: '40', value: 40 },
   { label: '50', value: 50 }
]




const DataTableServerSidePagination = ({
   table,
}) => {

   const { t, isArabic } = useMyTranslation()


   const [selectedEntry, setSelectedEntry] = useState(entriesList[0])
   const [currentPage, setCurrentPage] = useState(table.getState().pagination.pageIndex + 1)


   const pageCount = table.getPageCount()



   useEffect(() => {
      setCurrentPage(table.getState().pagination.pageIndex + 1)
   }, [table.getState().pagination.pageIndex])



   const handleEntriesChanged = (item) => {
      table.setPageSize(Number(item.value))
      setSelectedEntry(item)
      
      // resetting the state to 0
      // table.setPageIndex(0);
      // setCurrentPage(1);
   }

   const handleInputChanged = (e) => {
      const { value } = e.target;

      setCurrentPage(value);
   }


   const handlePageSubmit = () => {
      let page = Number(currentPage);

      if (page > pageCount) {
         page = pageCount
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
               <p>{t('show')}</p>
               <CustomSelectWithPopover
                  options={entriesList}
                  value={selectedEntry}
                  onChange={handleEntriesChanged}
               />
               <p>{t('entries')}</p>
            </div>

            <div className="page-control">
               <div
                  className={`page-prev ${isArabic ? 'arabic' : ''}`}
                  onClick={() => handleChangePage('prev')}
                  disabled={!table.getCanPreviousPage()}
               >
                  <LiaCaretLeftSolid />
                  <span>{t('prev')}</span>
               </div>

               <div className="page-input-wrapper">
                  <Input
                     type="number"
                     min="1"
                     max={pageCount}
                     value={currentPage}
                     onChange={handleInputChanged}
                     onKeyDown={handleKeyDown}
                     onBlur={handlePageSubmit}
                     className="page-input"
                  />
                  <p>{t('of')} {pageCount}</p>
               </div>

               <div
                  className={`page-next ${isArabic ? 'arabic' : ''}`}
                  onClick={() => handleChangePage('next')}
                  disabled={!table.getCanNextPage()}
               >
                  <span>{t('next')}</span>
                  <LiaCaretRightSolid />
               </div>
            </div>

         </div>

      </div>
   )
}

export default DataTableServerSidePagination