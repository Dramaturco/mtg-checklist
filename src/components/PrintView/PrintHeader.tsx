import React from "react";
export type PrintHeaderProps = {
  pageNumber: number;
  totalPages: number;
};
function PrintHeader({ pageNumber, totalPages }: PrintHeaderProps) {
  return (
    <div className="absolute top-2 left-2">
      Page {pageNumber} of {totalPages}
    </div>
  );
}

export default PrintHeader;
