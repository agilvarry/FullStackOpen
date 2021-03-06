interface BMIValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): String => {
  if (weight > 180 || height > 74) {
    return "Large (healthy weight)";
  } else if (weight > 180 || height > 74) {
    return "Small (healthy weight)";
  } else {
    return "Normal (healthy weight)";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  const bmi = calculateBmi(value1, value2);
  console.log(bmi);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
