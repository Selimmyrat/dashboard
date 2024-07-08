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
  BarChart
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
const data = [
  {
    name: "Page A",
    aky: 4000,
    owez: 3000,
    tagan: 2400,
  },
  {
    name: "Page B",
    aky: 3000,
    owez: 4000,
    tagan: 1398,
  },
  {
    name: "Page C",
    aky: 2000,
    owez: 1500,
    tagan: 9800,
  },
  {
    name: "Page D",
    aky: 2780,
    owez: 4180,
    tagan: 3908,
  },
  {
    name: "Page E",
    aky: 1890,
    owez: 190,
    tagan: 4800,
  },
  {
    name: "Page F",
    aky: 2390,
    owez: 3390,
    tagan: 3800,
  },
  {
    name: "Page G",
    aky: 3490,
    owez: 2290,
    tagan: 4300,
  },
];

export default function Dashboard() {
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

      <div className="bg-white mt-2 shadow-sm border">
        <Card>
          <CardHeader>Active Users</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tagan"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="owez"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="aky"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white mt-2 shadow-sm border">
        <Card>
          <CardHeader>Active Users</CardHeader>
          <CardContent className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tagan" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
