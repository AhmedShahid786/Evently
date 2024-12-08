import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function Attendees({ attendees }) {
  return (
    <div>
      <h3 className="text-3xl font-lilita tracking-wider text-primary mb-2">
        Attendees
      </h3>
      <div className="flex flex-wrap gap-2">
        {attendees?.map((user) => (
          <Avatar key={user._id} title={user.fullname}>
            <AvatarImage src={user.profileImg} />
            <AvatarFallback>{user.fullname}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}
