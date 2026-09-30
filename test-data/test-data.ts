type RoleTestData = {
  role: string;
  description: string;
  expectedResponseRoleText: string;
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
