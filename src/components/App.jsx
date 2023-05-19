// import data from '../data/data.json';
// import css from './App.module.css';
// import { TweetItem } from './TweetItem/TweetItem';

// export const App = () => {
//   return (
//     <section>
//       <ul className={css.container}>
//         {data.users.map(user => (
//           <TweetItem key={user.id} user={user} />
//         ))}
//       </ul>
//     </section>
//   );
// };
import React, { useState } from 'react';
import data from '../data/data.json';
import css from './App.module.css';
import { TweetItem } from './TweetItem/TweetItem';

export const App = () => {
  const [displayedUsers, setDisplayedUsers] = useState(data.users.slice(0, 3));
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const handleLoadMore = () => {
    const nextUsers = data.users.slice(
      displayedUsers.length,
      displayedUsers.length + 3
    );
    setDisplayedUsers(prevUsers => [...prevUsers, ...nextUsers]);

    if (displayedUsers.length + 3 >= data.users.length) {
      setLoadMoreVisible(false);
    }
  };

  return (
    <section>
      <ul className={css.container}>
        {displayedUsers.map(user => (
          <TweetItem key={user.id} user={user} />
        ))}
      </ul>
      {loadMoreVisible && (
        <button className={css.followBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default App;
