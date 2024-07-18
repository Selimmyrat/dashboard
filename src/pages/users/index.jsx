import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";

export default function Users() {
  // const [users, setUsers] = useState([]);
  const [dataByUsers, setDataByUsers] = useState({});
  const [totalPoints, setTotalPoints] = useState({});
  const [totalIssues, setTotalIssues] = useState({});

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/team_sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setUsers(data.items);
        const obj = {};
        const totalPointsObj = {};
        const totalIssuesObj = {};

        data.items.forEach((element) => {
          const member = element.team_member;
          if (!obj[member]) {
            obj[member] = [];
          }
          obj[member].push(element);

          if (!totalPointsObj[member]) {
            totalPointsObj[member] = 0;
          }
          totalPointsObj[member] += element.closed_points;

          if (!totalIssuesObj[member]) {
            totalIssuesObj[member] = 0;
          }
          totalIssuesObj[member] += element.total_issues;
        });
        setDataByUsers(obj);
        setTotalPoints(totalPointsObj);
        setTotalIssues(totalIssuesObj);
      });
  }, []);

  console.log(dataByUsers);

  return (
    <div className="bg-white border shadow-sm p-4">
      <Table className="text-center">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="text-start ">Name</TableHead>
            <TableHead className="text-center">Total Issues</TableHead>
            <TableHead className="text-center">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {Object.entries(dataByUsers).map(([key, value]) => {
            return (
              <TableRow key={value} className="hover:bg-slate-100">
                <TableCell className="text-start font-bold uppercase">
                  {key}
                </TableCell>
                <TableCell className="text-center">
                  {totalIssues[key]}
                </TableCell>
                <TableCell className="text-center">
                  {totalPoints[key]}
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger>
                      <Eye />
                    </DialogTrigger>
                    <DialogContent className="max-w-[1400px] w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
                      <DialogHeader>
                        <DialogTitle>{key.toUpperCase()}</DialogTitle>
                        <DialogDescription>
                          <Table>
                            <TableHeader className="text-center">
                              <TableRow>
                                <TableHead className="text-center">
                                  Sprint Number
                                </TableHead>
                                <TableHead className="text-center">
                                  Total Issues
                                </TableHead>
                                <TableHead className="text-center">
                                  Closed Issues
                                </TableHead>
                                <TableHead className="text-center">
                                  Closed Points
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="text-center">
                              {[...value]
                                .reverse()
                                .map((sprint_data, index) => (
                                  <TableRow
                                    className="hover:bg-slate-100"
                                    key={index}
                                  >
                                    <TableCell className="font-bold">
                                      {sprint_data.sprint_number + ")"}
                                    </TableCell>
                                    <TableCell>
                                      {sprint_data.total_issues}
                                    </TableCell>
                                    <TableCell>
                                      {sprint_data.closed_issues}
                                    </TableCell>
                                    <TableCell>
                                      {sprint_data.closed_points}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
