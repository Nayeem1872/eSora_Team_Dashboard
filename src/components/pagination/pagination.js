import PaginationButton from "../buttons/paginationbutton";

const Pagination = (props) => {
  const totalPageCount = Math.ceil(props?.totalPages / props?.limit);
  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= props?.totalPages) {
      props?.setCurrentPage(pageNumber);
      props?.onChange(pageNumber);
    }
  };

  return (
    <>
      <div className="flex">
        <PaginationButton
          text="Previous"
          onClick={() => handlePagination(props?.currentPage - 1)}
          disabled={props?.currentPage === 1}
        />
        <div className="w-3"></div>
        <PaginationButton
          text="Next"
          onClick={() => handlePagination(props?.currentPage + 1)}
          disabled={props?.currentPage === totalPageCount}
        />
      </div>
      <div className="text-subtitleText text-[14px] font-normal">
        Page <span className="font-medium">{props?.currentPage}</span> of{" "}
        <span className="font-medium">{totalPageCount}</span>
      </div>
    </>
  );
};

export default Pagination;
