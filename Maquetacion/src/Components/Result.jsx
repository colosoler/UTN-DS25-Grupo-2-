import './styles/Result.css';
import { MdArrowUpward, MdArrowDownward, MdMoreHoriz } from 'react-icons/md';
import { useState } from 'react';

export const Result = ({ result }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(result.upvotes);
  const [downvoted, setDownvoted] = useState(false);
  const [downvotes, setDownvotes] = useState(result.downvotes);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setUpvotes(upvotes - 1);
    } else {
      setUpvoted(true);
      setUpvotes(upvotes + 1);
      if (downvoted) {
        setDownvoted(false);
        setDownvotes(downvotes - 1);
      }
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setDownvoted(false);
      setDownvotes(downvotes - 1);
    } else {
      setDownvoted(true);
      setDownvotes(downvotes + 1);
      if (upvoted) {
        setUpvoted(false);
        setUpvotes(upvotes - 1);
      }
    }
  };

  return (
    <>
    <section className='result'>
      <p>@{result.user}</p>
      <h5>{result.title}</h5>
      <article>
      <p className='description'>{result.description}</p>
      <div className='buttons'>
        <div
          id='upvote'
          className={`upvote ${upvoted ? 'active' : ''}`}
          onClick={handleUpvote}
          style={{ cursor: 'pointer' }}
        >
          <MdArrowUpward />
          <p>{upvotes}</p>
        </div>
        <div
        id='downvote'
          className={`downvote ${downvoted ? 'active' : ''}`}
          onClick={handleDownvote}
          style={{ cursor: 'pointer' }}
        >
          <MdArrowDownward />
          <p>{downvotes}</p>
        </div>
        <MdMoreHoriz />
      </div>
      </article>
    </section>
    </>
  );
};
