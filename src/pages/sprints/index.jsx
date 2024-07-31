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
            <TableHead className="text-center">Sprint Number</TableHead>
            <TableHead className="text-center">Total Issues</TableHead>
            <TableHead className="text-center">Total Points</TableHead>
            <TableHead className="text-center">Closed Issues</TableHead>
            <TableHead className="text-center">Closed Points</TableHead>
            <TableHead className="text-center">Gor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {dataBySprints.map((dataSprint) => (
            <TableRow key={dataSprint.name} className="hover:bg-slate-100">
              <TableCell className="text-center">{dataSprint.name}</TableCell>
              <TableCell className="text-center">
                {dataSprint.total_issues}
              </TableCell>
              <TableCell className="text-center">
                {dataSprint.total_pts}
              </TableCell>
              <TableCell className="text-center">
                {dataSprint.closed_issues}
              </TableCell>
              <TableCell className="text-center">
                {dataSprint.closed_pts}
              </TableCell>
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
