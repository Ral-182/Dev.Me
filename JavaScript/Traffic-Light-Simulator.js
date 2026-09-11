const config1 = {
  fault: false,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 4 },
  ],
};

const config2 = {
  fault: false,
  phases: [
    { color: "red", duration: 3 },
    { color: "yellow", duration: -2 },
    { color: "green", duration: 6 },
  ],
};

const config3 = {
  fault: true,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 6 },
  ],
};

const config4 = {
  fault: false,
  phases: [],
};

function runSequence(config, cycles) {
  if (config["fault"]) {
    console.log("Faulted phase!");
  } else {
    if (config["phases"].length <= 0) {
      console.log("No phases found");
    } else {
      for (let j = 0; j < cycles; j++) {
        for (let i = 0; i < config["phases"].length; i++) {
          if (config["phases"][i]["duration"] < 0) {
            console.log("Invalid phase detected");
          } else {
            console.log(
              `Switching to ${config["phases"][i]["color"]} for ${config["phases"][i]["duration"]} s`,
            );
          }
        }
      }
    }
  }
}

function generateTimeline(config, cycles) {
  let timelineArray = [];

  for (let j = 0; j < cycles; j++) {
    for (let i = 0; i < config["phases"].length; i++) {
      let num = config["phases"][i]["duration"];

      if (timelineArray.length === 0) {
        timelineArray.push(num);
      } else {
        timelineArray.push(timelineArray[timelineArray.length - 1] + num);
      }
    }
  }

  return timelineArray;
}
