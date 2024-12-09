import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Comment({ comment }) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg border-2 border-primary">
      <Avatar title={comment?.userId?.fullname}>
        <AvatarImage src={comment?.userId?.profileImg} />
        <AvatarFallback />
      </Avatar>
      <div className="flex-1">
        <p className="font-lilita text-primary text-sm">
          {comment?.userId?.fullname}
        </p>
        <p className="text-xs font-poppins text-white mt-1">
          {comment?.comment}
        </p>
        <p className="text-xs text-white font-poppins mt-1">
          {dayjs().from(dayjs(comment?.createdAt))}
        </p>
      </div>
    </div>
  );
}
