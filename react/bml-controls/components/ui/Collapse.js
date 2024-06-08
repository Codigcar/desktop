import React from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "6px",
    backgroundColor: "#FDF4F4",
    marginBottom: 15,
    height: "100%",
  },
  cardContent: {
    marginBottom: 100,
    backgroundColor: "#F0E8E8",
  },
  textHeader: {
    color: "#383838",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  textTableHeader: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: "13px",
  },
  icon: {
    color: "#383838",
  },
  buttonAcept: {
    background: "#67C4F2",
    borderRadius: 3,
    border: 0,
    color: "white",
    fontSize: 15,
    height: 40,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: theme.spacing(1),
  },
}));

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const poligono = (subcategoriesList) => {
  let labelsList = [];
  let dataList = [];

  subcategoriesList.map((subcategory) => {
    labelsList.push(subcategory.name);
    dataList.push(subcategory.average);
  });

  let RadarData = {
    labels: labelsList,
    datasets: [
      {
        label: "Valores",
        backgroundColor: "rgba(242, 153, 74, .2)",
        borderColor: "rgba(242, 153, 74, 1)",

        pointBackgroundColor: "rgba(242, 153, 74, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(242, 153, 74, 1)",

        data: dataList,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    // scale: {
    //     pointLabels: {
    //         fontSize: 20
    //     }
    // }
  };

  return (
    <div
      style={{ backgroundColor: "white", /*  padding:30, */ borderRadius: 20 }}
    >
      <Radar data={RadarData} options={options} />
    </div>
  );
};

const bar = (controlList, nameControl) => {
  let labels = [];
  let valueList = [];

  let dataPoints = [];

  controlList.map((control) => {
    labels.push(control.name);
    valueList.push(control.value);
    dataPoints.push({ y: control.value, label: control.name });
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 20,
        padding: 40,
      }}
    >
      <DynamicComponentWithNoSSR
        dataPoints={dataPoints}
        nameControl={nameControl}
      />
    </div>
  );
};

const DynamicComponentWithNoSSR = dynamic(() => import("./BarChart.tsx"), {
  ssr: false,
});

export const CCollapse = ({ record }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={6} square className={classes.card}>
      <CardActions>
        <Grid item xs={12} sm={12} md={12}>
          <Typography className={classes.textHeader}>
            {"Fecha consultada: " + record.date}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={classes.cardContent}
      >
        <CardContent>
          <Grid container spacing={20}>
            <div style={{ width: "100%" }}>
              {record.form.categories.map((category, index) => (
                <div key={index}>
                  <h2>{category.name}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{ minWidth: "30%" }}>
                      {poligono(category.subcategories)}
                    </div>
                    {category.subcategories.map((subcategory, index) => (
                      <div
                        key={index}
                        style={{ width: "48%", height: "100%", marginLeft: 1 }}
                      >
                        {bar(subcategory.controls, subcategory.name)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </CardContent>
      </Collapse>
    </Paper>
  );
};
