import { getUsers } from "@/actions/users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default async function Users() {
  const users = (await getUsers()).users;

  return (
    <div className="min-h-screen mx-10">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">Users</h1>
      </div>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Image</TableHead>
            <TableHead className="w-[100px]">Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Events</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.fullname}>
              <TableCell className="text-right">
                <Image
                  src={user.profileImg}
                  style={{ objectFit: "cover" }}
                  height={40}
                  width={40}
                />
              </TableCell>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
