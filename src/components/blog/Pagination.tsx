import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (p: number) => {
    if (p === 1) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${p}`;
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center space-x-1.5 mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Prev</span>
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-zinc-400 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Prev</span>
        </span>
      )}

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-3 py-2 text-sm text-zinc-400 select-none"
              >
                &hellip;
              </span>
            );
          }

          const pageNum = Number(page);
          const isCurrent = pageNum === currentPage;

          return isCurrent ? (
            <span
              key={pageNum}
              aria-current="page"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold text-white bg-indigo-600 shadow-md shadow-indigo-500/20 select-none"
            >
              {pageNum}
            </span>
          ) : (
            <Link
              key={pageNum}
              href={createPageUrl(pageNum)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-zinc-400 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed">
          <span>Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </nav>
  );
}
