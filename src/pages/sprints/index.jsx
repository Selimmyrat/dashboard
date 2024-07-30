import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
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

export default function SprintsPage() {
  const [dataBySprints, setDataBySprints] = useState(null);

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const sprints = [];

        data.items.forEach((sprintData) => {
          const sprint = sprintData.content.sprint;
          sprints.push(sprint);
        });
        setDataBySprints(sprints);
      });
  }, []);

  if (dataBySprints === null) {
    return "Loading...";
  }

  return (
    <div className="bg-white border shadow-sm p-4">
      <Table className="text-center">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="text-start ">Sprint Number</TableHead>
            <TableHead className="text-start ">Total Issues</TableHead>
            <TableHead className="text-start ">Total Points</TableHead>
            <TableHead className="text-start ">Closed Issues</TableHead>
            <TableHead className="text-start ">Closed Points</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {dataBySprints.map((dataSprint) => (
            <TableRow key={dataSprint.name} className="hover:bg-slate-100">
              <TableCell>{dataSprint.name}</TableCell>
              <TableCell>{dataSprint.total_issues}</TableCell>
              <TableCell>{dataSprint.total_pts}</TableCell>
              <TableCell>{dataSprint.closed_issues}</TableCell>
              <TableCell>{dataSprint.closed_pts}</TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger>
                    <Eye />
                  </DialogTrigger>
                  <DialogContent className="max-w-[1400px] w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
                    <DialogHeader>
                      <DialogTitle>
                        {dataSprint.name.toUpperCase()} sprint
                      </DialogTitle>
                      <DialogDescription>
                        <Table>
                          <TableHeader className="text-center">
                            <TableRow>
                              <TableHead className="text-center">
                                Contributor
                              </TableHead>
                              <TableHead className="text-center">
                                Total Issues
                              </TableHead>
                              <TableHead className="text-center">
                                Closed Issues
                              </TableHead>
                              <TableHead className="text-center">
                                Progress
                              </TableHead>
                              <TableHead className="text-center">
                                Closed Points
                              </TableHead>
                              <TableHead className="text-center">
                                Total Points
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-center">
                            {Object.entries(dataSprint.contributors).map(
                              ([key, value], index) => (
                                <TableRow key={index}>
                                  <TableCell>{key}</TableCell>
                                  <TableCell>{value.total_issues}</TableCell>
                                  <TableCell>{value.closed_issues}</TableCell>
                                  <TableCell>
                                    <ProgressBar
                                      completed={value.progress}
                                      bgColor={"#228B22"}
                                      labelColor={"#228B22"}
                                    />
                                    <p>{value.progress + "%"}</p>
                                  </TableCell>
                                  <TableCell>{value.closed_pts}</TableCell>
                                  <TableCell>{value.total_pts}</TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

{
  /* <TableBody className="text-center">
          {Object.entries(dataBySprints)
            .reverse()
            .map(([key, value]) => {
              return (
                <TableRow key={value} className="hover:bg-slate-100">
                  <TableCell className="text-start font-bold uppercase">
                    {key + ")" + " Sprint"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger>
                        <Eye />
                      </DialogTrigger>
                      <DialogContent className="max-w-[1400px] w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
                        <DialogHeader>
                          <DialogTitle>{key.toUpperCase()} sprint</DialogTitle>
                          <DialogDescription>
                            <Table>
                              <TableHeader className="text-center">
                                <TableRow>
                                  <TableHead className="text-center">
                                    Name
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Total Issues
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Closed Issues
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Progress
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Closed Points
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody className="text-center">
                                {[...value].map((sprint_data, index) => (
                                  <TableRow
                                    className="hover:bg-slate-100"
                                    key={index}
                                  >
                                    <TableCell className="font-semibold">
                                      {sprint_data.team_member.toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                      {sprint_data.total_issues}
                                    </TableCell>
                                    <TableCell>
                                      {sprint_data.closed_issues}
                                    </TableCell>
                                    <TableCell>
                                      <ProgressBar
                                        completed={calcPercentage(
                                          sprint_data.closed_issues,
                                          sprint_data.total_issues
                                        )}
                                        bgColor={"#228B22"}
                                      />
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
        </TableBody> */
}
