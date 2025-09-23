import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

export function VotesDisplay({ upvotes = 0, downvotes = 0 }) {
  return (
    <div className="votes-display d-flex align-items-center gap-3 mt-3 pt-3 border-top">
      <div className="d-flex align-items-center gap-4">
        {/* Upvotes */}
        <div className="d-flex align-items-center vote-display">
          <MdArrowUpward className="text-success me-1" size={20} />
          <span className="fw-semibold">{upvotes}</span>
        </div>
        {/* Downvotes */}
        <div className="d-flex align-items-center vote-display">
          <MdArrowDownward className="text-danger me-1" size={20} />
          <span className="fw-semibold">{downvotes}</span>
        </div>
        {/* Puntuación neta */}
        <div className="d-flex align-items-center">
          <i className="bi bi-trophy text-warning me-1"></i>
          <span className="fw-semibold text-muted">
            {upvotes - downvotes > 0 ? "+" : ""}
            {upvotes - downvotes}
          </span>
        </div>
      </div>
    </div>
  );
}