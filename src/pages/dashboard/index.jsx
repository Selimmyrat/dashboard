import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dataBySprint, setDataBySprint] = useState();
  const [filterSprint, setFilterSprint] = useState([]);
  const [dataByTotalIssues, setDataByTotalIssues] = useState();
  const [filterTotalIssues, setFilterTotalIssues] = useState();
  const [dataByProgress, setDataByProgress] = useState();
  const [filterProgress, setFilterProgress] = useState();
  const [dataByFWL, setDataByFWL] = useState({});

  const [test, setTest] = useState();

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const obj = {};
        data.items.forEach((sprints) => {
          const sprint = sprints.name;
          if (!obj[sprint]) {
            obj[sprint] = [];
          }
          obj[sprint].push(sprints);
          const sprintChartData = [];
          Object.entries(obj).map(([key, value]) => {
            const chartObj = {};
            chartObj.sprint = key;
            value.map((item) => {
              const members = item.content.sprint.contributors;
              const membersClosedPts = {};
              Object.entries(members).map(([k, val]) => {
                membersClosedPts[k] = val.closed_pts;
              });
              chartObj.fwl_number = item.fwl;
              chartObj.members = membersClosedPts
            });
            sprintChartData.push(chartObj);
          });
          setTest(sprintChartData);
          console.log(sprintChartData);
        });
      });
  }, []);
  console.log("test", test);

  useEffect(() => {
    fetch("https://pb.mekdep.org/api/collections/team_sprint_statistic/records")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const obj = {};

        data.items.forEach((element) => {
          const sprint = element.sprint_number;
          if (!obj[sprint]) {
            obj[sprint] = [];
          }
          obj[sprint].push(element);
        });
        console.log("old", obj);

        const sprintChartData = [];
        const totalIssues = [];
        const progress = [];
        const FWL = {};

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = item.closed_points;
            chartObj.fwl_number = item.fwl_number;
          });
          sprintChartData.push(chartObj);
        });
        setFilterSprint(sprintChartData);
        setDataBySprint(sprintChartData);
        console.log("data old", sprintChartData);

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = item.total_issues;
            chartObj.fwl_number = item.fwl_number;
          });
          totalIssues.push(chartObj);
        });
        setFilterTotalIssues(totalIssues);
        setDataByTotalIssues(totalIssues);

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = Math.round(
              (item.closed_issues / item.total_issues) * 100
            );
            chartObj.fwl_number = item.fwl_number;
          });
          progress.push(chartObj);
        });
        setFilterProgress(progress);
        setDataByProgress(progress);

        data.items.forEach((element) => {
          const addFWL = element.fwl_number;
          if (!FWL[addFWL]) {
            FWL[addFWL] = [];
          }
          FWL[addFWL].push(element);
        });
        setDataByFWL(FWL);
      });
  }, []);
  function change(e) {
    if (e.target.value === "default") {
      setFilterSprint(dataBySprint);
      setFilterTotalIssues(dataByTotalIssues);
      setFilterProgress(dataByProgress);
    } else {
      setFilterSprint(
        dataBySprint.filter(
          (item) => item.fwl_number === parseInt(e.target.value)
        )
      );
      setFilterTotalIssues(
        dataByTotalIssues.filter(
          (item) => item.fwl_number === parseInt(e.target.value)
        )
      );
      setFilterProgress(
        dataByProgress.filter(
          (item) => item.fwl_number === parseInt(e.target.value)
        )
      );
    }
  }

  return (
    <>
      <div className="border bg-white shadow p-2 flex flex-row items-center gap-1">
        <p>FWL saylan:</p>
        <select className="bg-white border shadow-none p-2" onChange={change}>
          <option value="default">Ahlisi</option>
          {Object.keys(dataByFWL).map((value, index) => (
            <option key={index} value={value}>
              FWL {value}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border bg-white shadow">
          <CardHeader>Issues</CardHeader>
          <CardContent>sss</CardContent>
        </Card>

        <Card className="border bg-white shadow">
          <CardHeader>Issues</CardHeader>
          <CardContent>sss</CardContent>
        </Card>

        <Card className="border bg-white shadow">
          <CardHeader>Issues</CardHeader>
          <CardContent>sss</CardContent>
        </Card>

        <Card className="border bg-white shadow">
          <CardHeader>Issues</CardHeader>
          <CardContent>sss</CardContent>
        </Card>
      </div> */}

      <div className="mt-2 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={test}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='sprint' />
                <YAxis />
                <Tooltip />
                <Legend />
               {
                
               }
                <Line
                  type="monotone"
                  dataKey=''
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />

                {/* <Line
                  type="monotone"
                  dataKey="nazym maksadov"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                /> */}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={filterSprint}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="akynyaz yazmyradov" fill="#8884d8" />
                <Bar dataKey="nazym maksadov" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Total Issues</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={filterTotalIssues}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="akynyaz yazmyradov" fill="#8884d8" />
                <Bar dataKey="nazym maksadov" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Total Issues</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={filterTotalIssues}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="akynyaz yazmyradov"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="nazym maksadov"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Progress</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={filterProgress}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="akynyaz yazmyradov"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="nazym maksadov"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Progress</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={filterProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="akynyaz yazmyradov" fill="#8884d8" />
                <Bar dataKey="nazym maksadov" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
