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

type IFrameListData = {
  itemID: string;
  item: string;
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

export const iFrameWebsites = [
  {
    option: "https://eviltester.com",
    embeddable: true,
    site: "eviltester.com",
  },
  { option: "https://google.com", embeddable: false, site: "google.com" },
  { option: "https://wikipedia.org", embeddable: true, site: "wikipedia.org" },
  { option: "https://github.com", embeddable: false, site: "github.com" },
  { option: "https://archive.org", embeddable: true, site: "archive.org" },
];

export const iFrameListData: IFrameListData[] = [
  { itemID: "0", item: "iFrame List Item 0" },
  { itemID: "1", item: "iFrame List Item 1" },
  { itemID: "2", item: "iFrame List Item 2" },
  { itemID: "3", item: "iFrame List Item 3" },
  { itemID: "4", item: "iFrame List Item 4" },
  { itemID: "5", item: "iFrame List Item 5" },
  { itemID: "6", item: "iFrame List Item 6" },
  { itemID: "7", item: "iFrame List Item 7" },
  { itemID: "8", item: "iFrame List Item 8" },
  { itemID: "9", item: "iFrame List Item 9" },
  { itemID: "10", item: "iFrame List Item 10" },
  { itemID: "11", item: "iFrame List Item 11" },
  { itemID: "12", item: "iFrame List Item 12" },
  { itemID: "13", item: "iFrame List Item 13" },
  { itemID: "14", item: "iFrame List Item 14" },
  { itemID: "15", item: "iFrame List Item 15" },
  { itemID: "16", item: "iFrame List Item 16" },
  { itemID: "17", item: "iFrame List Item 17" },
  { itemID: "18", item: "iFrame List Item 18" },
  { itemID: "19", item: "iFrame List Item 19" },
  { itemID: "20", item: "iFrame List Item 20" },
  { itemID: "21", item: "iFrame List Item 21" },
  { itemID: "22", item: "iFrame List Item 22" },
  { itemID: "23", item: "iFrame List Item 23" },
  { itemID: "24", item: "iFrame List Item 24" },
  { itemID: "25", item: "iFrame List Item 25" },
  { itemID: "26", item: "iFrame List Item 26" },
  { itemID: "27", item: "iFrame List Item 27" },
  { itemID: "28", item: "iFrame List Item 28" },
  { itemID: "29", item: "iFrame List Item 29" },
  { itemID: "30", item: "iFrame List Item 30" },
  { itemID: "31", item: "iFrame List Item 31" },
  { itemID: "32", item: "iFrame List Item 32" },
  { itemID: "33", item: "iFrame List Item 33" },
  { itemID: "34", item: "iFrame List Item 34" },
  { itemID: "35", item: "iFrame List Item 35" },
  { itemID: "36", item: "iFrame List Item 36" },
  { itemID: "37", item: "iFrame List Item 37" },
  { itemID: "38", item: "iFrame List Item 38" },
  { itemID: "39", item: "iFrame List Item 39" },
  { itemID: "40", item: "iFrame List Item 40" },
  { itemID: "41", item: "iFrame List Item 41" },
  { itemID: "42", item: "iFrame List Item 42" },
  { itemID: "43", item: "iFrame List Item 43" },
  { itemID: "44", item: "iFrame List Item 44" },
  { itemID: "45", item: "iFrame List Item 45" },
  { itemID: "46", item: "iFrame List Item 46" },
  { itemID: "47", item: "iFrame List Item 47" },
  { itemID: "48", item: "iFrame List Item 48" },
  { itemID: "49", item: "iFrame List Item 49" },
  { itemID: "50", item: "iFrame List Item 50" },
  { itemID: "51", item: "iFrame List Item 51" },
  { itemID: "52", item: "iFrame List Item 52" },
  { itemID: "53", item: "iFrame List Item 53" },
  { itemID: "54", item: "iFrame List Item 54" },
  { itemID: "55", item: "iFrame List Item 55" },
  { itemID: "56", item: "iFrame List Item 56" },
  { itemID: "57", item: "iFrame List Item 57" },
  { itemID: "58", item: "iFrame List Item 58" },
  { itemID: "59", item: "iFrame List Item 59" },
  { itemID: "60", item: "iFrame List Item 60" },
  { itemID: "61", item: "iFrame List Item 61" },
  { itemID: "62", item: "iFrame List Item 62" },
  { itemID: "63", item: "iFrame List Item 63" },
  { itemID: "64", item: "iFrame List Item 64" },
  { itemID: "65", item: "iFrame List Item 65" },
  { itemID: "66", item: "iFrame List Item 66" },
  { itemID: "67", item: "iFrame List Item 67" },
  { itemID: "68", item: "iFrame List Item 68" },
  { itemID: "69", item: "iFrame List Item 69" },
  { itemID: "70", item: "iFrame List Item 70" },
  { itemID: "71", item: "iFrame List Item 71" },
  { itemID: "72", item: "iFrame List Item 72" },
  { itemID: "73", item: "iFrame List Item 73" },
  { itemID: "74", item: "iFrame List Item 74" },
  { itemID: "75", item: "iFrame List Item 75" },
  { itemID: "76", item: "iFrame List Item 76" },
  { itemID: "77", item: "iFrame List Item 77" },
  { itemID: "78", item: "iFrame List Item 78" },
  { itemID: "79", item: "iFrame List Item 79" },
  { itemID: "80", item: "iFrame List Item 80" },
  { itemID: "81", item: "iFrame List Item 81" },
  { itemID: "82", item: "iFrame List Item 82" },
  { itemID: "83", item: "iFrame List Item 83" },
  { itemID: "84", item: "iFrame List Item 84" },
  { itemID: "85", item: "iFrame List Item 85" },
  { itemID: "86", item: "iFrame List Item 86" },
  { itemID: "87", item: "iFrame List Item 87" },
  { itemID: "88", item: "iFrame List Item 88" },
  { itemID: "89", item: "iFrame List Item 89" },
  { itemID: "90", item: "iFrame List Item 90" },
  { itemID: "91", item: "iFrame List Item 91" },
  { itemID: "92", item: "iFrame List Item 92" },
  { itemID: "93", item: "iFrame List Item 93" },
  { itemID: "94", item: "iFrame List Item 94" },
  { itemID: "95", item: "iFrame List Item 95" },
  { itemID: "96", item: "iFrame List Item 96" },
  { itemID: "97", item: "iFrame List Item 97" },
  { itemID: "98", item: "iFrame List Item 98" },
  { itemID: "99", item: "iFrame List Item 99" },
];

export const iFrameIncrementNumber = {
  positiveAmount: "100",
  negativeAmount: "-100",
};
