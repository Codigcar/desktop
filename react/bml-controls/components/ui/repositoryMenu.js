import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "transparent",
    borderRadius: "6px",
    border: "1px solid #D05FDA",
    marginBottom: 15,
    height: "100%",
  },
  cardContent: {
    marginBottom: 100,
    // backgroundColor: "#F0E8E8",
    backgroundColor: "transparent",
    color:"white",
    borderTop: "1px solid #D05FDA",
  },
  textHeader: {
    color: "rgb(153, 239, 208)",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    marginLeft:20
  },
  expand: {
    color: "rgb(153, 239, 208)",
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

export const RepositoryMenu = ({ data, nameCategory="" }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper elevation={6} square className={classes.card}>
      <CardActions>
        <Grid item xs={12} sm={12} md={12}>
          <Typography className={classes.textHeader}>
            {nameCategory}
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
              <ul>
                {data.map((item, index) => (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" key={item._id}>
                    <li>{item.name}</li>
                  </a>
                ))}
              </ul>
            </div>
          </Grid>
        </CardContent>
      </Collapse>
    </Paper>
  );
};
