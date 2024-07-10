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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Users() {
  // const [users, setUsers] = useState([]);
  const [dataByUsers, setDataByUsers] = useState({});

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/team_sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data.items +++++", data.items);
        console.log("data +++++", data);
        // setUsers(data.items);
        const obj = {};
        data.items.forEach((element) => {
          const member = element.team_member;
          if (!obj[member]) {
            obj[member] = [];
          }
          obj[member].push(element);
        });
        setDataByUsers(obj);
      });
  }, []);

  console.log(dataByUsers);

  return (
    <div className="bg-white border shadow-sm p-4">
      {Object.entries(dataByUsers).map(([key, value]) => {
        return (
          <Accordion type="single" collapsible key={value}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="uppercase">{key}</AccordionTrigger>
              <AccordionContent>
                <Table className="text-center">
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
                    {[...value].reverse().map((sprint_data, index) => (
                      <TableRow className="hover:bg-slate-100" key={index}>
                        <TableCell className='font-bold'>{sprint_data.sprint_number + ')'}</TableCell>
                        <TableCell>{sprint_data.total_issues}</TableCell>
                        <TableCell>{sprint_data.closed_issues}</TableCell>
                        <TableCell>{sprint_data.closed_points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
