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
  const [closedPtsData, setClosedPtsData] = useState(null);
  const [closedPtsDataFilter, setClosedPtsDataFilter] = useState([]);

  const [totalPtsData, setTotalPtsData] = useState(null);
  const [totalPtsDataFilter, setTotalPtsDataFilter] = useState([]);

  const [closedIssuesData, setClosedIssuesData] = useState(null);
  const [closedIssuesDataFilter, setClosedIssuesDataFilter] = useState([]);

  const [totalIssuesData, setTotalIssuesData] = useState(null);
  const [totalIssuesDataFilter, setTotalIssuesDataFilter] = useState([]);

  const [progressData, setProgressData] = useState(null);
  const [progressDataFilter, setProgressDataFilter] = useState([]);

  const [SSPointsData, setSSPointsData] = useState(null);
  const [SSPointsDataFilter, setSSPointsDataFilter] = useState([]);

  const [fwls, setFwls] = useState({});

  const [colors, setColors] = useState({});

  useEffect(() => {
    fetch(
      "https://pb.mekdep.org/api/collections/sprint_statistic/records?sort=name"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const closedPtsArr = [];
        const totalPtsArr = [];
        const closedIssuesArr = [];
        const totalIssuesArr = [];
        const progressArr = [];
        const SSPointsArr = [];
        const colorsObj = {};

        data.items.map((sprint) => {
          const closedPtsObj = {};
          closedPtsObj["sprint"] = sprint.name;
          closedPtsObj["fwl"] = sprint.fwl;

          const totalPtsObj = {};
          totalPtsObj["sprint"] = sprint.name;
          totalPtsObj["fwl"] = sprint.fwl;

          const closedIssuesObj = {};
          closedIssuesObj["sprint"] = sprint.name;
          closedIssuesObj["fwl"] = sprint.fwl;

          const totalIssuesObj = {};
          totalIssuesObj["sprint"] = sprint.name;
          totalIssuesObj["fwl"] = sprint.fwl;

          const progressObj = {};
          progressObj["sprint"] = sprint.name;
          progressObj["fwl"] = sprint.fwl;

          const SSPointsObj = {};
          SSPointsObj["sprint"] = sprint.name;
          SSPointsObj["fwl"] = sprint.fwl;

          Object.entries(sprint.content.sprint.contributors).map(
            ([contributor, contributorData]) => {
              closedPtsObj[contributor] = contributorData.closed_pts;
              totalPtsObj[contributor] = contributorData.total_pts;
              closedIssuesObj[contributor] = contributorData.closed_issues;
              totalIssuesObj[contributor] = contributorData.total_issues;
              progressObj[contributor] = contributorData.progress;
              SSPointsObj[contributor] = contributorData.ss_pts;
              colorsObj[contributor] = contributorData.color;
            }
          );

          closedPtsArr.push(closedPtsObj);
          totalPtsArr.push(totalPtsObj);
          closedIssuesArr.push(closedIssuesObj);
          totalIssuesArr.push(totalIssuesObj);
          progressArr.push(progressObj);
          SSPointsArr.push(SSPointsObj);
        });
        setClosedPtsData(closedPtsArr);
        setClosedPtsDataFilter(closedPtsArr);

        setTotalPtsData(totalPtsArr);
        setTotalPtsDataFilter(totalPtsArr);

        setClosedIssuesData(closedIssuesArr);
        setClosedIssuesDataFilter(closedIssuesArr);

        setTotalIssuesData(totalIssuesArr);
        setTotalIssuesDataFilter(totalIssuesArr);

        setProgressData(progressArr);
        setProgressDataFilter(progressArr);

        setSSPointsData(SSPointsArr);
        setSSPointsDataFilter(SSPointsArr);

        setColors(colorsObj);

        const fwlObj = {};
        data.items.forEach((fwl) => {
          const fwlNum = fwl.fwl;

          fwlObj[fwlNum] = "FWL " + fwlNum;
        });
        setFwls(fwlObj);
      });
  }, []);

  // useEffect(() => {
  //   console.log(closedPtsData)
  // }, [closedPtsData])
  //   function getColorByContributor(contributorName) {
  //     var color = colors[contributorName]
  //     if (!color) {
  //         return 'black'
  //     }
  //     return color
  // }

  function handleFilterChangeFWL(e) {
    if (e.target.value === "default") {
      setClosedPtsDataFilter(closedPtsData);
      setTotalPtsDataFilter(totalPtsData);
      setClosedIssuesDataFilter(closedIssuesData);
      setTotalIssuesDataFilter(totalIssuesData);
      setProgressDataFilter(progressData);
      setSSPointsDataFilter(SSPointsData);
    } else {
      setClosedPtsDataFilter(
        closedPtsData.filter((item) => item.fwl === e.target.value)
      );
      setTotalPtsDataFilter(
        totalPtsData.filter((item) => item.fwl === e.target.value)
      );
      setClosedIssuesDataFilter(
        closedIssuesData.filter((item) => item.fwl === e.target.value)
      );
      setTotalIssuesDataFilter(
        totalIssuesData.filter((item) => item.fwl === e.target.value)
      );
      setProgressDataFilter(
        progressData.filter((item) => item.fwl === e.target.value)
      );
      setSSPointsDataFilter(
        SSPointsData.filter((item) => item.fwl === e.target.value)
      );
    }
  }

  // const colors = {
  //   NaZyM0101: "#F44611",
  //   Selimmyrat: "#D6AE01",
  //   Sohbetbackend: "#6C7156",
  //   TagandurdyB: "#1C1C1C",
  //   akynyaz: "#BEBD7F",
  // };

  if (closedPtsData === null) {
    return "Loading...";
  }

  return (
    <>
      <div className="border bg-white shadow p-2 flex flex-row items-center gap-1">
        <p>FWL saylan:</p>
        <select
          className="bg-white border shadow-none p-2"
          onChange={handleFilterChangeFWL}
        >
          <option value="default">Ahlisi</option>
          {Object.entries(fwls).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
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

      {/* Total Issues Chart */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Total Issues</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={totalIssuesDataFilter}
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

                {totalIssuesDataFilter &&
                  Object.keys(totalIssuesDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={member}
                          stroke={colors[member]}
                          activeDot={{ r: 8 }}
                        />
                      );
                    }
                  })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Total Issues</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={totalIssuesDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {totalIssuesDataFilter &&
                  Object.keys(totalIssuesDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Bar
                          key={index}
                          dataKey={member}
                          fill={colors[member]}
                        />
                      );
                    }
                  })}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Total Points Chart */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Total Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={totalPtsDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {totalPtsDataFilter &&
                  Object.keys(totalPtsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Bar
                          key={index}
                          dataKey={member}
                          fill={colors[member]}
                        />
                      );
                    }
                  })}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Total Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={totalPtsDataFilter}
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
                {totalPtsDataFilter &&
                  Object.keys(totalPtsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={member}
                          stroke={colors[member]}
                          activeDot={{ r: 8 }}
                        />
                      );
                    }
                  })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Closed Issues Chart */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Issues</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={closedIssuesDataFilter}
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
                {closedIssuesDataFilter &&
                  Object.keys(closedIssuesDataFilter[0]).map(
                    (member, index) => {
                      if (member !== "fwl" && member !== "sprint") {
                        return (
                          <Line
                            key={index}
                            type="monotone"
                            dataKey={member}
                            stroke={colors[member]}
                            activeDot={{ r: 8 }}
                          />
                        );
                      }
                    }
                  )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Issues</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={closedIssuesDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {closedIssuesDataFilter &&
                  Object.keys(closedIssuesDataFilter[0]).map(
                    (member, index) => {
                      if (member !== "fwl" && member !== "sprint") {
                        return (
                          <Bar
                            key={index}
                            dataKey={member}
                            fill={colors[member]}
                          />
                        );
                      }
                    }
                  )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Closed Points Chart */}
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={500} height={300} data={closedPtsDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {closedPtsDataFilter &&
                  Object.keys(closedPtsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Bar
                          key={index}
                          dataKey={member}
                          fill={colors[member]}
                        />
                      );
                    }
                  })}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Closed Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={closedPtsDataFilter}
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
                {closedPtsDataFilter &&
                  Object.keys(closedPtsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={member}
                          stroke={colors[member]}
                          activeDot={{ r: 8 }}
                        />
                      );
                    }
                  })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>Progress</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={progressDataFilter}
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

                {progressDataFilter &&
                  Object.keys(progressDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={member}
                          stroke={colors[member]}
                          activeDot={{ r: 8 }}
                        />
                      );
                    }
                  })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>Progress</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={progressDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {progressDataFilter &&
                  Object.keys(progressDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Bar
                          key={index}
                          dataKey={member}
                          fill={colors[member]}
                        />
                      );
                    }
                  })}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SS Points */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card className="bg-white boreder shadow">
          <CardHeader>SS Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={SSPointsDataFilter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                {SSPointsDataFilter &&
                  Object.keys(SSPointsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Bar
                          key={index}
                          dataKey={member}
                          fill={colors[member]}
                        />
                      );
                    }
                  })}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white boreder shadow">
          <CardHeader>SS Points</CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={SSPointsDataFilter}
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

                {SSPointsDataFilter &&
                  Object.keys(SSPointsDataFilter[0]).map((member, index) => {
                    if (member !== "fwl" && member !== "sprint") {
                      return (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={member}
                          stroke={colors[member]}
                          activeDot={{ r: 8 }}
                        />
                      );
                    }
                  })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
