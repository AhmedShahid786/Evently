import Comment from "../Comment/Comment";
import AddCommentForm from "../Add-Comment-Form/AddCommentForm";

export default function Comments({ comments, currentUserId, eventId }) {
  return (
    <div className="w-full space-y-4 border-2 border-primary p-3 rounded-lg">
      <h2 className="text-3xl text-primary tracking-wider font-lilita">
        Comments
      </h2>
      <AddCommentForm currentUserId={currentUserId} eventId={eventId} />
      <div className="space-y-4 overflow-y-scroll h-40">
        {comments?.length > 0 ? (
          comments?.map((comment, ind) => (
            <Comment comment={comment} key={ind} />
          ))
        ) : (
          <p className="text-center text-sm text-white font-poppins">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
