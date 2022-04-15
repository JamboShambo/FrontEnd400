/* eslint-disable no-unused-vars */
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { AreaChart, Area } from "recharts";

import { LineChart, Line } from "recharts";
import envVars from "../../config";
import axios from "axios";

function Flotr1() {
  const [getEvents, setGetEvents] = useState([]);

  useEffect(() => {
    getTheEvents();
  }, []);

  const data = [
    {
      name: "Janeiro",
      Teste1: 895,
      Teste2: 2400,
      amt: 2400,
    },
    {
      name: "Fevereiro",
      Teste1: 3000,
      Teste2: 1398,
      amt: 2210,
    },
    {
      name: "Março",
      Teste1: 2000,
      Teste2: 9800,
      amt: 2290,
    },
    {
      name: "Abril",
      Teste1: 2780,
      Teste2: 3908,
      amt: 2000,
    },
    {
      name: "Maio",
      Teste1: 1890,
      Teste2: 4800,
      amt: 2181,
    },
    {
      name: "Junho",
      Teste1: 800,
      Teste2: 3800,
      amt: 2500,
    },
    {
      name: "Julho",
      Teste1: 3490,
      Teste2: 4300,
      amt: 2100,
    },
  ];

  const getTheEvents = () => {
    axios
      .get(envVars.GetAllEvents, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
        },
      })
      .then((response) => {
        response.data.events.forEach((el) => {
          el.lat = parseFloat(el.lat);
          el.lng = parseFloat(el.lng);
        });
        console.log(response.data.events);
        setGetEvents(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    // filter((element, index, array) => { /* ... */ } )
    // var countyArray = [
    //   "Carlow",
    //   "Cavan",
    //   "Clare",
    //   "Cork",
    //   "Donegal",
    //   "Dublin",
    //   "Galway",
    //   "Kerry",
    //   "Kildare",
    //   "Kilkenny",
    //   "Laois",
    //   "Leitrim",
    //   "Limerick",
    //   "Longford",
    //   "Louth",
    //   "Mayo",
    //   "Meath",
    //   "Monaghan",
    //   "Offaly",
    //   "Roscommon",
    //   "Sligo",
    //   "Tipperary",
    //   "Waterford",
    //   "Westmeath",
    //   "Wexford",
    //   "Wicklow",
    // ];
    // const Carlow = getEvents.filter((e) => e.county === "County Carlow");
    // const Cavan = getEvents.filter((e) => e.county === "County Cavan");
    // const Clare = getEvents.filter((e) => e.county === "County Clare");
    // const Cork = getEvents.filter((e) => e.county === "County Cork");
    // const Donegal = getEvents.filter((e) => e.county === "County Donegal");
    // const Dublin = getEvents.filter((e) => e.county === "County Dublin");
    // const Galway = getEvents.filter((e) => e.county === "County Galway");
    // const Kerry = getEvents.filter((e) => e.county === "County Kerry");
    // const Kildare = getEvents.filter((e) => e.county === "County Kildare");
    // const Kilkenny = getEvents.filter((e) => e.county === "County Kilkenny");
    // const Laois = getEvents.filter((e) => e.county === "County Laois");
    // const Leitrim = getEvents.filter((e) => e.county === "County Leitrim");
    // const Limerick = getEvents.filter((e) => e.county === "County Limerick");
    // const Longford = getEvents.filter((e) => e.county === "County Longford");
    // const Louth = getEvents.filter((e) => e.county === "County Louth");
    // const Mayo = getEvents.filter((e) => e.county === "County Mayo");
    // const Meath = getEvents.filter((e) => e.county === "County Meath");
    // const Monaghan = getEvents.filter((e) => e.county === "County Monaghan");
    // const Offaly = getEvents.filter((e) => e.county === "County Offaly");
    // const Roscommon = getEvents.filter((e) => e.county === "County Roscommon");
    // const Sligo = getEvents.filter((e) => e.county === "County Sligo");
    // const Tipperary = getEvents.filter((e) => e.county === "County Tipperary");
    // const Waterford = getEvents.filter((e) => e.county === "County Waterford");
    // const Westmeath = getEvents.filter((e) => e.county === "County Westmeath");
    // const Wexford = getEvents.filter((e) => e.county === "County Wexford");
    // const Wicklow = getEvents.filter((e) => e.county === "County Wicklow");

    // let a = Sligo;
    // let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
    // console.log(unique);

    var totalGraffiti = getEvents.filter(function (i, n) {
      return i.eventType === "Graffiti";
    });

    var totalRoad = getEvents.filter(function (i, n) {
      return i.eventType === "Road or Path";
    });

    var totalLight = getEvents.filter(function (i, n) {
      return i.eventType === "Street Lighting";
    });

    var totalTrash = getEvents.filter(function (i, n) {
      console.log(i);
      return i.eventType === "Litter and Illegal Dumping";
    });

    var totalTree = getEvents.filter(function (i, n) {
      return i.eventType === "Trees and Grass";
    });

    const totalEventsOnMap = [
      { totalGraffiti: totalGraffiti.length },
      { totalRoad: totalRoad.length },
      { totalLight: totalLight.length },
      { totalTrash: totalTrash.length },
      { totalTrash: totalTree.length },
    ];

    // const finalResult = Object.assign(course,grade);

    // var theEvents = getEvents;
    // theEvents.reduce(function (acc, curr) {
    //   return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    // }, {});

    // console.log(theEvents); // => {2: 5, 4: 1, 5: 3, 9: 1}
  };

  //Get today's date using the JavaScript Date object.
  var ourDate = new Date();
  //Change it so that it is 7 days in the past.
  var pastDate = ourDate.getDate() - 7;
  ourDate.setDate(pastDate);

  //Log the date to our web console.
  console.log(ourDate);

  //-----------------------------------------------

  //filter by one week ago
  var startDateWeek = new Date();
  var pastWeekDate = startDateWeek.getDate() - 7; // -7 days
  startDateWeek.setDate(pastWeekDate);
  var endDateWeek = new Date(); //todays date

  var resultOneWeekAgo = getEvents.filter((a) => {
    var date = new Date(a.eventTimeDefault);
    return date >= startDateWeek && date <= endDateWeek;
  });
  console.log(resultOneWeekAgo);
  var OneWeekCount = resultOneWeekAgo.length;

  //------------------------------------------------

  //filter by one month ago
  var startDateMonth = new Date();
  var pastMonthDate = startDateMonth.getDate() - 30; // -30 days
  startDateMonth.setDate(pastMonthDate);
  var endDateMonth = new Date(); //todays date

  var resultOneMonthAgo = getEvents.filter((a) => {
    var date = new Date(a.eventTimeDefault);
    return date >= startDateMonth && date <= endDateMonth;
  });
  console.log(resultOneMonthAgo);
  var OneMonthCount = resultOneMonthAgo.length;

  //------------------------------------------------

  //filter by one Year ago
  var startDateYear = new Date();
  var pastYearDate = startDateYear.getDate() - 365; // -30 days
  startDateYear.setDate(pastYearDate);
  var endDateYear = new Date(); //todays date

  var resultOneYearAgo = getEvents.filter((a) => {
    var date = new Date(a.eventTimeDefault);
    return date >= startDateYear && date <= endDateYear;
  });
  console.log(resultOneYearAgo);
  var OneYearCount = resultOneYearAgo.length;

  //------------------------------------------------

  //   //filter by date
  //   var startDate = new Date("2015-01-01");
  //   var endDate = new Date();

  //   var resultProductData = getEvents.filter((a) => {
  //     var date = new Date(a.eventTimeDefault);
  //     return date >= startDate && date <= endDate;
  //   });
  //   console.log(resultProductData);

  //------------------------------------------------

  //   //filter by county
  //   var resultCountyData = getEvents.filter((a) => {
  //     var date = new Date(a.eventTimeDefault);
  //     return date >= startDate && date <= endDate;
  //   });

  //   const arr = ["a", "b", "a", "a", "c", "c"];

  //   const count = {};

  //   for (const element of arr) {
  //     if (count[element]) {
  //       count[element] += 1;
  //     } else {
  //       count[element] = 1;
  //     }
  //   }

  //------------------------------------------------

  var totalGraffiti = getEvents.filter(function (i, n) {
    return i.eventType === "Graffiti";
  });

  var totalRoad = getEvents.filter(function (i, n) {
    return i.eventType === "Road or Path";
  });

  var totalLight = getEvents.filter(function (i, n) {
    return i.eventType === "Street Lighting";
  });

  var totalTrash = getEvents.filter(function (i, n) {
    return i.eventType === "Litter and Illegal Dumping";
  });

  var totalTree = getEvents.filter(function (i, n) {
    return i.eventType === "Trees and Grass";
  });

  const totalEventsOnMap = [
    { events: totalGraffiti.length, name: "Graffiti" },
    { events: totalRoad.length, name: "Road" },
    { events: totalLight.length, name: "Lighting" },
    { events: totalTrash.length, name: "Trash" },
    { events: totalTree.length, name: "Tree" },

    // { totalEvent: totalGraffiti.length },
    // { totalEvent: totalRoad.length },
    // { totalEvent: totalLight.length },
    // { totalEvent: totalTrash.length },
    // { totalEvent: totalTree.length },
  ];

  return (
    <div className="">
      <div className="container ">
        <div className="row">
          <div class="col l4">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text center">
                <span class="card-title">Reports in previous Week </span>
                {OneWeekCount}
              </div>
            </div>
          </div>
          <div class="col l4">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text center">
                <span class="card-title">Reports in previous Month </span>
                {OneMonthCount}
              </div>
            </div>
          </div>
          <div class="col l4">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text center">
                <span class="card-title">Reports in previous Year </span>
                {OneYearCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col l4">
            <div style={{ border: "1px solid black" }}>
              <LineChart
                width={400}
                height={300}
                data={totalEventsOnMap}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#00008B"
                  activeDot={{ r: 8 }}
                />
              </LineChart>{" "}
            </div>
          </div>

          <div className="col l4">
            <div style={{ border: "1px solid black" }}>
              <BarChart
                width={400}
                height={300}
                data={totalEventsOnMap}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#8884d8" />
              </BarChart>
            </div>
          </div>

          <div className="col l4">
            <div style={{ border: "1px solid black" }}>
              <AreaChart
                width={400}
                height={300}
                data={totalEventsOnMap}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="events"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flotr1;
