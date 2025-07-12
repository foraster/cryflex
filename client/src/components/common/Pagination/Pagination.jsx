import { ReactComponent as RightArrow } from '../../../img/icons/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../../img/icons/left-arrow.svg';
import styles from './Pagination.module.css';

const Pages = ({ list }) => {
  const currentList = list.filteredList.length
    ? list.filteredList
    : list.list;

  const pageCount = Math.ceil(currentList.length / list.limit);
  const pages = [];

  for (let page = 1; page <= pageCount; page++) {
    pages.push(
      <li
        key={page}
        className={`${styles.pageItem} ${page === list.page ? styles.active : ''}`}
      >
        <button onClick={() => list.setPage(page)}>
          {page}
        </button>
      </li>
    );
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.pageControl}
        onClick={() => list.page > 1 && list.setPage(list.page - 1)}
        aria-label="Previous page"
      >
        <LeftArrow />
      </button>

      {pages[0]}

      {list.page > 2 && <div className={styles.ellipsis}>…</div>}

      {pages.slice(
        Math.max(list.page - 2, 1),
        list.page + 1
      )}

      {list.page < pageCount - 2 && <div className={styles.ellipsis}>…</div>}

      {list.page < pageCount - 1 && pages[pageCount - 1]}

      <button
        className={styles.pageControl}
        onClick={() => list.page < pageCount && list.setPage(list.page + 1)}
        aria-label="Next page"
      >
        <RightArrow />
      </button>
    </nav>
  );
};

export default Pages;