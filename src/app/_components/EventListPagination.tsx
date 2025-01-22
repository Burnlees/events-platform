"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type EventListPaginationProps = {
  currentPage: number;
  totalPages: number | undefined;
};

const EventListPagination = ({
  currentPage,
  totalPages,
}: EventListPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (!totalPages) {
    return null;
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage === 1 ? "#" : createPageURL(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageURL(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href={
                currentPage === totalPages
                  ? "#"
                  : createPageURL(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EventListPagination;
