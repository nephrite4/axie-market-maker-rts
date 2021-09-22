import { Component, FunctionComponent } from "react";
import AxieFilters from "../model/filters";
import Grid from "@material-ui/core/Grid";
import Aqua from "../images/classes/class_aquatic.svg";
import Beast from "../images/classes/class_beast.svg";
import Bird from "../images/classes/class_bird.svg";
import Bug from "../images/classes/class_bug.svg";
import Plant from "../images/classes/class_plant.svg";
import Reptile from "../images/classes/class_reptile.svg";
import Mech from "../images/classes/class_mech.svg";
import Dawn from "../images/classes/class_dawn.svg";
import Dusk from "../images/classes/class_dusk.svg";
import StatsPreview from "./StatsPreview";
import BodyCardPreview from "./BodyCardPreview";

interface ButtonPreviewProps {
  axieFilter: AxieFilters;
}

const ButtonPreview: FunctionComponent<ButtonPreviewProps> = (props) => {
  let classesStats = { ...props.axieFilter };
  delete classesStats.id;
  delete classesStats.name;
  delete classesStats.parts;

  let axiePartsList = Object.entries({ ...props.axieFilter.parts });

  let axieStats = { ...classesStats };
  axieStats.classes = [];
  let axieStatsList = Object.entries(axieStats);

  let axieClassDivHeight: any;
  if (classesStats.classes !== undefined) {
    axieClassDivHeight = classesStats.classes?.length > 7 ? 40 : 20;
  }

  return (
    <>
      <Grid container direction="column" style={{ width: 130, height: "auto", paddingBottom: 10 }}>
        <Grid item style={{ margin: 1, padding: 2, height: axieClassDivHeight }}>
          {classesStats.classes!.map((axieClass) => {
            let axieIcon = classImg(axieClass);
            return <img style={{ padding: 1, height: 15 }} src={axieIcon} alt="" />;
          })}
        </Grid>
        <Grid container>
          {axiePartsList.map((axiePart, index) => {
            return <BodyCardPreview bodyCard={axiePart} />;
          })}
        </Grid>
        <Grid container direction="row">
          {axieStatsList.map((statValue, index) => {
            let min, max;
            if (statValue[1]) {
              min = statValue[1][0] === 0 || statValue[1][0] === 27 ? undefined : statValue[1][0];
              max = statValue[1][1] === 7 || statValue[1][1] === 61 ? undefined : statValue[1][1];
            }
            let statValueCapital = statValue[0].charAt(0).toUpperCase() + statValue[0].slice(1);
            let statsPreview;
            if (min || max !== undefined) {
              statsPreview = (
                <Grid style={{ margin: 1 }} item xs={12}>
                  {/* <Grid item xs> */}
                  <StatsPreview min={min} max={max} stat={statValueCapital} />
                </Grid>
              );
            }
            return <>{statsPreview}</>;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonPreview;

const classImg = (axieClass: string) => {
  switch (axieClass) {
    case "Aqua":
      return Aqua;
    case "Beast":
      return Beast;
    case "Bird":
      return Bird;
    case "Bug":
      return Bug;
    case "Plant":
      return Plant;
    case "Reptile":
      return Reptile;
    case "Mech":
      return Mech;
    case "Dawn":
      return Dawn;
    case "Dusk":
      return Dusk;
  }
};
