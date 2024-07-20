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
  const [dataByTotalIssues, setDataByTotalIssues] = useState();
  const [dataByProgress, setDataByProgress] = useState();

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

        const sprintChartData = [];
        const totalIssues = [];
        const progress = [];

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = item.closed_points;
          });
          sprintChartData.push(chartObj);
        });
        setDataBySprint(sprintChartData);

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = item.total_issues;
          });
          totalIssues.push(chartObj);
        });
        setDataByTotalIssues(totalIssues);

        Object.entries(obj).map(([key, value]) => {
          const chartObj = {};
          chartObj.sprint = key + " sprint";
          value.map((item) => {
            const member = item.team_member;
            chartObj[member] = Math.round(
              (item.closed_issues / item.total_issues) * 100
            );
          });
          progress.push(chartObj);
        });
        setDataByProgress(progress);
      });
  }, []);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={dataBySprint}
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
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataBySprint}>
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
              <BarChart width={150} height={40} data={dataByTotalIssues}>
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
                data={dataByTotalIssues}
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
                data={dataByProgress}
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
              <BarChart width={150} height={40} data={dataByProgress}>
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
