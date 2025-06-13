import { MdArrowUpward, MdArrowDownward, MdMoreHoriz, MdFlag, MdShare } from 'react-icons/md';
import { useState } from 'react';
import ReportModel from './ReportModel';
import './styles/Vote.css';
export const Vote = ({ result }) => {
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
          <div className='buttons'>
            <div
                id='upvote'
                className={`upvote ${upvoted ? 'active' : ''}`}
                onClick={handleUpvote}
            >
                <MdArrowUpward />
                <p>{upvotes}</p>
            </div>
            <div
              id='downvote'
              className={`downvote ${downvoted ? 'active' : ''}`}
              onClick={handleDownvote}
            >
                <MdArrowDownward />
                <p>{downvotes}</p>
            </div>
            <div id='report'>
              <ReportModel />
            </div>
            <div id='share'>
              <MdShare />
            </div>
            <MdMoreHoriz />
          </div>
        </>
    );
};

export default Vote;