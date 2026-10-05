type RoleTestData = {
  role: string;
  description: string;
  expectedResponseRoleText: string;
};

type BoundaryValue = {
  value: string;
  note: string;
};

type InvalidValue = {
  value: string;
  note: string;
};

type FormCase = {
  first: string;
  second: string;
  note: string;
};

export const roleTestData: RoleTestData[] = [
  {
    role: "tester",
    description:
      "Explore the software functionality to compare with stakeholder needs and requirements, identifying bugs, verifying fixes, and raising unexpected risks and issues.",
    expectedResponseRoleText: "tester",
  },
  {
    role: "programmer",
    description:
      "Design, write, test, and maintain code to build software applications. Transform requirements into functional solutions using various programming languages and frameworks.",
    expectedResponseRoleText: "programmer",
  },
  {
    role: "manager",
    description:
      "Lead and coordinate the development team, manage project timelines, allocate resources, and be responsible for delivery of software projects while fostering team collaboration.",
    expectedResponseRoleText: "manager",
  },
  {
    role: "all",
    description:
      "Take on multiple responsibilities across management, development, and testing. Perfect for versatile professionals who enjoy wearing different hats and contributing to all aspects of software delivery.",
    expectedResponseRoleText: "generalist (one who does it all)",
  },
];

export const ajaxCategory = [
  {
    value: "1",
    category: "Web",
    languages: [
      { languageValue: "0", language: "Javascript" },
      { languageValue: "1", language: "VBScript" },
      { languageValue: "2", language: "Flash" },
    ],
    response: [
      { optionValue: 0, optionDisplay: "Javascript" },
      { optionValue: 1, optionDisplay: "VBScript" },
      { optionValue: 2, optionDisplay: "Flash" },
    ],
  },
  {
    value: "2",
    category: "Desktop",
    languages: [
      { languageValue: "10", language: "C++" },
      { languageValue: "11", language: "Assembler" },
      { languageValue: "12", language: "C" },
      { languageValue: "13", language: "Visual Basic" },
    ],
    response: [
      { optionValue: 10, optionDisplay: "C++" },
      { optionValue: 11, optionDisplay: "Assembler" },
      { optionValue: 12, optionDisplay: "C" },
      { optionValue: 13, optionDisplay: "Visual Basic" },
    ],
  },
  {
    value: "3",
    category: "Server",
    languages: [
      { languageValue: "20", language: "Cobol" },
      { languageValue: "21", language: "Fortran" },
      { languageValue: "22", language: "C++" },
      { languageValue: "23", language: "Java" },
    ],
    response: [
      { optionValue: 20, optionDisplay: "Cobol" },
      { optionValue: 21, optionDisplay: "Fortran" },
      { optionValue: 22, optionDisplay: "C++" },
      { optionValue: 23, optionDisplay: "Java" },
    ],
  },
];

export const validBoundaryValuesFirstInput: BoundaryValue[] = [
  { value: "29", note: "upper boundary" },
  { value: "29.9", note: "upper boundary decimal" },
  { value: "1", note: "min positive integer" },
  { value: "0.1", note: "small positive decimal" },
  { value: "0", note: "zero" },
  { value: "-0.1", note: "small negative decimal" },
  { value: "-1", note: "negative boundary" },
  { value: "-100", note: "negative" },
  { value: "1e1", note: "Scientific notation" },
];
export const validBoundaryValuesSecondInput: BoundaryValue[] = [
  { value: "29", note: "upper boundary" },
  { value: "1", note: "min positive integer" },
  { value: "0", note: "zero" },
  { value: "-1", note: "negative boundary" },
  { value: "-100", note: "negative" },
  { value: "1e1", note: "Scientific notation" },
];

export const validFormCases: FormCase[] = [
  { first: "29.9", second: "29", note: "upper decimal + upper integer" },
  { first: "29", second: "-1", note: "upper integer + negative boundary" },
  {
    first: "0.1",
    second: "1",
    note: "small positive decimal + min positive integer",
  },
  { first: "-0.1", second: "0", note: "small negative decimal + zero" },
  { first: "1", second: "-100", note: "min positive integer + negative" },
  { first: "0", second: "29", note: "zero + upper integer" },
  { first: "-100", second: "1", note: "negative + min positive integer" },
  { first: "1e1", second: "29", note: "scientific in first field" },
  { first: "29", second: "1e1", note: "scientific in second field" },
];

export const invalidValue: InvalidValue[] = [
  { value: "30", note: "boundary itself" },
  { value: "30.1", note: "boundary decimal" },
  { value: "31", note: "next integer" },
  { value: "100", note: "too large" },
  { value: "999999999999", note: "huge number" },
  { value: "3e1", note: "exponent = 30" },
  { value: "1e5", note: "exponent = 100000" },
  { value: "", note: "empty" },
  { value: "   ", note: "spaces only" },
  { value: "abc", note: "letters" },
  { value: "10abc", note: "number + letters" },
  { value: "abc10", note: "letters + number" },
  { value: "!@#$%", note: "special chars" },
  { value: "1.2.3", note: "multiple dots" },
  { value: "1,5", note: "comma separator" },
  { value: "+", note: "plus only" },
  { value: "-", note: "minus only" },
  { value: "--5", note: "double minus" },
  { value: "Infinity", note: "JS Infinity" },
  { value: "NaN", note: "JS NaN" },
  { value: "один", note: "word" },
  { value: "1 0", note: "space inside" },
  { value: "A".repeat(10000), note: "very long string" },
];

export const invalidValueSecondInput: InvalidValue[] = [
  { value: "30", note: "boundary" },
  { value: "31", note: "next integer" },
  { value: "100", note: "too large" },
  { value: "999999999999", note: "huge number" },
  { value: "3e1", note: "exponent = 30" },
  { value: "1e5", note: "exponent = 100000" },
  { value: "", note: "empty" },
];

export const invalidFirstValueFormCases: FormCase[] = [
  { first: "30", second: "10", note: "boundary" },
  { first: "100", second: "10", note: "too large" },
  { first: "999999999999", second: "10", note: "huge number" },
  { first: "1e5", second: "10", note: "exponent = 100000" },
  { first: "", second: "10", note: "empty" },
  { first: "   ", second: "10", note: "spaces only" },
  { first: "abc", second: "10", note: "letters" },
  { first: "10abc", second: "10", note: "number + letters" },
  { first: "abc10", second: "10", note: "letters + number" },
  { first: "!@#$%", second: "10", note: "special chars" },
  { first: "+", second: "10", note: "plus only" },
  { first: "-", second: "10", note: "minus only" },
  { first: "--5", second: "10", note: "double minus" },
  { first: "Infinity", second: "10", note: "JS Infinity" },
  { first: "NaN", second: "10", note: "JS NaN" },
  { first: "один", second: "10", note: "word" },
  { first: "1 0", second: "10", note: "space inside" },
  { first: "A".repeat(10000), second: "10", note: "very long string" },
];

export const invalidSecondInputCases: FormCase[] = [
  { first: "10", second: "30", note: "boundary" },
  { first: "10", second: "100", note: "too large" },
  { first: "10", second: "999999999999", note: "huge number" },
  { first: "10", second: "3e1", note: "exponent = 30" },
  { first: "10", second: "1e5", note: "exponent = 100000" },
  { first: "10", second: "", note: "empty" },
];

export const alert = {
  explanation: "You triggered and handled the alert dialog",
};

export const confirm = {
  explanationTrue: "You clicked OK, confirm returned true.",
  explanationFalse: "You clicked Cancel, confirm returned false.",
  returnTrue: "true",
  returnFalse: "false",
};

export const promptTrue = [
  {
    thePrompt: "Hello",
    explanationTrue: "You clicked OK. 'prompt' returned Hello",
  },
  {
    thePrompt: "Bye",
    explanationTrue: "You clicked OK. 'prompt' returned Bye",
  },
  {
    thePrompt: "NewYear2027",
    explanationTrue: "You clicked OK. 'prompt' returned NewYear2027",
  },
];

export const promptFalse = {
  explanationFalse: "You clicked Cancel. 'prompt' returned null",
};

export const dialogMessage = {
  alert: "I am an alert box!",
  confirm: "I am a confirm alert",
  prompt: "I prompt you",
};

export const promptEdgeCases = {
  input: "<b>x</b>",
  explanation: "You clicked OK. 'prompt' returned <b>x</b>",
};
