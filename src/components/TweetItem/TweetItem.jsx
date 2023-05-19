import { useEffect, useState } from 'react';
import logo from '../../png/logo.png';
import css from './TweetItem.module.css';

const FOLLOWED_KEY = 'followed';

export function TweetItem({ user }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followers);

  useEffect(() => {
    const savedFollowedIds =
      JSON.parse(localStorage.getItem(FOLLOWED_KEY)) || [];
    const isUserFollowed = savedFollowedIds.includes(user.id);

    if (isUserFollowed) {
      setIsFollowed(true);
      setFollowersCount(prevFollowersCount => prevFollowersCount + 1);
    }
  }, [user.id]);

  const handleToggleFollow = () => {
    setIsFollowed(prevIsFollowed => !prevIsFollowed);
    setFollowersCount(
      prevFollowersCount => prevFollowersCount - (isFollowed ? 1 : -1)
    );

    const savedFollowedIds =
      JSON.parse(localStorage.getItem(FOLLOWED_KEY)) || [];
    const newFollowedIds = isFollowed
      ? savedFollowedIds.filter(id => id !== user.id)
      : [...savedFollowedIds, user.id];

    localStorage.setItem(FOLLOWED_KEY, JSON.stringify(newFollowedIds));
  };

  const btnText = isFollowed ? 'Following' : 'Follow';
  const formattedTweetsCount = user.tweets.toLocaleString('en');
  const formattedFollowersCount = followersCount.toLocaleString('en');

  return (
    <li className={css.cardContainer}>
      <img src={logo} alt="Logo" className={css.logo} />
      <div className={css.imageContainer}></div>
      <div className={css.userPhotoContainer}>
        <img src={user.avatar} alt="User" className={css.userPhoto} />
      </div>
      <p className={css.stats}>{formattedTweetsCount} tweets</p>
      <p className={css.stats}>{formattedFollowersCount} Followers</p>
      <button
        type="button"
        className={`${css.followBtn} ${isFollowed ? css.followBtnActive : ''}`}
        onClick={handleToggleFollow}
      >
        {btnText}
      </button>
    </li>
  );
}
