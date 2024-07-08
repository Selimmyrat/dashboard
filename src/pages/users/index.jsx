import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/team_sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data.items +++++', data.items);
        console.log('data +++++', data)
        setUsers(data.items);
      });
  }, []);
  // console.log(users.items);
  return (
    <div className="bg-white border shadow-sm p-4">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className='text-center'>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Sprint Number</TableHead>
            <TableHead>Total Issues</TableHead>
            <TableHead>Closed Issues</TableHead>
            <TableHead className="text-right">Closed Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, key) => (
            <TableRow className="text-center" key={key}>
              <TableCell className="font-medium uppercase">{user.team_member}</TableCell>
              <TableCell>{user.sprint_number}</TableCell>
              <TableCell>{user.total_issues}</TableCell>
              <TableCell>{user.closed_issues}</TableCell>
              <TableCell className="text-right">{user.closed_points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
