import { Fragment, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  sortingFns,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import Checkbox from "../../custom/Checkbox";
import { FaCaretDown, FaCaretRight, FaCaretUp } from "react-icons/fa6";
// import DataTableFilter from "./DataTableFilter";
import DataTablePagination from "./DataTablePagination";
import DataTableEmpty from "./DataTableEmpty";
import Loader from "../../loader/Loader";
import { TbCaretUpDownFilled } from "react-icons/tb";

const DataTable = ({
  data,
  columns,
  checkbox = false,
  filterData = [],
  emptyTableMessage = {},
  isLoading = false,
  pinnedColumn = [], // List the column using the accessorKey to sticky on horizontal,
  selectedRow = {},
  isRowClickable = false,
  rowClickAction = () => { },
  showSearch = false,
  showPagination = true,
  showFooter = false,
  enableSubRow = false,
  RenderSubContent = null,
  rowSelection = {},
  setRowSelection = () => { },
  skipPageReset = false,
  showToggleSubRow = true,
}) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const [columnPinning, setColumnPinning] = useState({
    left: ['select', 'expander', ...pinnedColumn],
  });

  // HERE THE PROCESS ADDING THE CHECKBOX AND SUB ROW TOGGLE COLUMN
  const modifiedColumns = useMemo(() => [
    ...checkbox ? [{
      id: 'select',
      header: ({ table }) => (
        <div className="table-checkbox">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="table-checkbox">
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      footer: () => (
        <div className="table-checkbox"></div>
      ),
      size: 40
    }] : [],
    ...(enableSubRow && showToggleSubRow) ? [{
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <div
            className="sub-toggle"
            style={{ cursor: 'pointer' }}
            {
            ...(enableSubRow && !isRowClickable) ? {
              onClick: row.getToggleExpandedHandler()
            } : {}
            }
          >
            {row.getIsExpanded() ? <FaCaretDown /> : <FaCaretRight />}
          </div>
        ) : (
          null
        )
      },
      footer: () => null,
      enableSorting: false,
      size: 40
    }] : [],
    ...columns
  ], [columns])



  const table = useReactTable(
    {
      data,
      columns: modifiedColumns,
      state: {
        sorting,
        rowSelection,
        pagination: showPagination ? pagination : undefined,
        columnFilters,
        globalFilter,
        columnPinning,
      },
      getRowId: row => row.id,
      getRowCanExpand: () => enableSubRow,
      // debugTable: true,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onRowSelectionChange: setRowSelection,
      getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined,
      onPaginationChange: setPagination,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      sortingFns,
      enableRowSelection: checkbox,
      enableMultiRowSelection: true,
      onColumnPinningChange: setColumnPinning,
      autoResetPageIndex: !skipPageReset,
    },
  );


  // This code's purpose is for inserting sticky columns through inline styles.
  // If you want to use this, uncomment the code below and the style on the th and td elements.
  // const getCommonPinningStyles = (column) => {
    // const isPinned = column.getIsPinned()
    // return {
    //   left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    //   right: isPinned === 'right' ? `${column.getStart('right')}px` : undefined,
    //   position: isPinned ? 'sticky' : '', /* 'relative', */
    //   width: column.getSize(),
    //   zIndex: isPinned ? 1 : 0,
    // }
  // }

  // This code purpose will add the class 'column-pinned' to the columns that are pinned.
  // If you want to use this, uncomment the code below and the className on the th and td elements.
  const getCommonPinningClasses = (column) => {
    const isPinned = column.getIsPinned()
    return isPinned ? 'column-pinned' : '';
  }


  const handleDataTableRowClick = (row) => {
    if (enableSubRow && isRowClickable) {
      row.toggleExpanded()
    }

    if (!isRowClickable) return
    rowClickAction(row)
  }

  return (
    <div className="data-table-container">
      <Loader isLoading={isLoading} />

      {data.length === 0 ? (
        <DataTableEmpty emptyTableMessage={emptyTableMessage} />
      ) : (
        <>
          {/* <DataTableFilter table={table} filterData={filterData} setGlobalFilter={setGlobalFilter} showSearch={showSearch} /> */}

          <div className="data-table-wrapper">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        colSpan={header.colSpan}
                        key={header.id}
                        className={`${header.column.columnDef.enableSorting === false ? 'sort-disabled' : ''} ${header.column.columnDef.accessorKey === 'action' ? 'action-col' : ''} ${getCommonPinningClasses(header.column)}`}
                        onClick={header.column.getToggleSortingHandler()}
                        // style={{ ...getCommonPinningStyles(header.column) }}
                      >
                        <div className="cell-content" onClick={() => console.log(header.column)}>
                          <div
                            className="header-name-w"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            {header.column.columnDef.enableSorting === false
                              ? null
                              : header.column.getIsSorted()
                                ? header.column.getIsSorted() === 'desc'
                                  ? <FaCaretDown />
                                  : <FaCaretUp />
                                : <TbCaretUpDownFilled />}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {(showPagination ? table.getRowModel().rows : table.getFilteredRowModel().rows).map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      className={`${isRowClickable ? 'row-clickable' : ''} ${rowSelection[row.id] ? 'row-checked' : ''} ${selectedRow?.id === row.id ? 'row-selected' : ''}`}
                      onClick={() => handleDataTableRowClick(row)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`${getCommonPinningClasses(cell.column)}`}
                          // style={{ ...getCommonPinningStyles(cell.column) }}
                        >
                          <div className="cell-content">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {(row.getIsExpanded() && RenderSubContent) && (
                      <tr className="tr-subcontent">
                        <td colSpan={row.getVisibleCells().length}>
                          <RenderSubContent
                            row={row}
                            handleCloseRow={() => row.toggleExpanded()}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
              {showFooter &&
                <tfoot>
                  {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                      {footerGroup.headers.map(footer => (
                        <td
                          key={footer.id}
                          className={`${getCommonPinningClasses(footer.column)}`}
                          // style={{ ...getCommonPinningStyles(footer.column) }}
                        >
                          <div className="footer-cell">
                            {flexRender(footer.column.columnDef.footer, footer.getContext())}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              }
            </table>
          </div>

          {showPagination &&
            <DataTablePagination table={table} />
          }
        </>
      )}

    </div>
  );
};

export default DataTable;