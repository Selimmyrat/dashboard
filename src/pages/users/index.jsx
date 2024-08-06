import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Eye } from "lucide-react";

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

export default function Users() {
  const [dataByUsers, setDataByUsers] = useState({});
  const [dataByTotalPoints, setDataByTotalPoints] = useState({});
  const [dataByTotalIssues, setDataByTotalIssues] = useState({});

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const obj = {};
        const totalPtsObj = {};
        const totalIssuesObj = {};
        data.items.forEach((cons) => {
          const members = cons.content.sprint.contributors;
          const sprintData = cons.content.sprint;
          Object.keys(members).forEach((member) => {
            if (!obj[member]) {
              obj[member] = [];
            }

            obj[member].push({
              ...members[member],
              sprintName: sprintData.name,
            });

            if (!totalPtsObj[member]) {
              totalPtsObj[member] = 0;
            }
            totalPtsObj[member] += members[member].total_pts;

            if (!totalIssuesObj[member]) {
              totalIssuesObj[member] = 0;
            }
            totalIssuesObj[member] += members[member].total_issues;
          });
        });
        setDataByUsers(obj);
        setDataByTotalPoints(totalPtsObj);
        setDataByTotalIssues(totalIssuesObj);
      });
  }, []);

  return (
    <div className="bg-white border shadow-sm p-4">
      <Table className="text-center">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Total Issues</TableHead>
            <TableHead className="text-center">Total Points</TableHead>
            <TableHead className="text-center">Gor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {Object.entries(dataByUsers).map(
            ([contributors, contributorValue]) => {
              return (
                <TableRow key={contributors} className="hover:bg-slate-100">
                  <TableCell className="text-center">{contributors}</TableCell>
                  <TableCell>{dataByTotalPoints[contributors]}</TableCell>
                  <TableCell>{dataByTotalIssues[contributors]}</TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger>
                        <Eye />
                      </DialogTrigger>
                      <DialogContent className="max-w-[1400px] w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
                        <DialogHeader>
                          <DialogTitle>{contributors}</DialogTitle>
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
                                    Total Points
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Progress
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Closed Issues
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Closed Points
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {contributorValue.map((sprint_data, index) => {
                                  return (
                                    <TableRow
                                      className="hover:bg-slate-100"
                                      key={index}
                                    >
                                      <TableCell className="text-center">
                                        {sprint_data.sprintName + ")"}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {sprint_data.total_issues}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {sprint_data.total_pts}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <ProgressBar
                                          completed={sprint_data.progress}
                                          bgColor={"#228B22"}
                                          labelColor={"#228B22"}
                                        />
                                        {sprint_data.progress + "%"}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {sprint_data.closed_issues}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {sprint_data.closed_pts}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
