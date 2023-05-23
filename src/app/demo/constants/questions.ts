export const QUESTIONS: Array<FormCard> = [
  {
    id: "background",
    title: "활동의 계기나 배경이 무엇인가요?",
    description:
      "구체적인 상황 정보(언제, 어디서, 누구와 어떻게 등) 처음 보는 사람도 이해갈 수 있도록 작성해주세요",
    chipText: "활동 배경",
    placeholder: "ex. 개발자와 협업 역량을 쌓기 위해 IT 동아리에 들어감",
    required: true,
    maxLength: 100,
  },
  {
    id: "problem",
    title: "당시 해결해야하는 과제나 목표가 무엇이었나요?",
    description: "인식한 과제와 목표에 대해 작성해주세요",
    chipText: "문제 상황",
    placeholder: "ex.개발 기간이 짧아서 빠른 기간 내 런칭을 완료해야 했음",
    required: true,
    maxLength: 100,
  },
  {
    id: "behavior",
    title: "내가 취한 행동 또는 계획은 무엇이였나요?",
    description:
      "과제 해결 또는 목표 달성을 위한 구체적 행동과 이유를 작성해주세요",
    chipText: "나의 행동",
    placeholder:
      "ex.디자인 시스템 제작, 런칭일 정해서 린하게 개발하는 방법 제의",
    required: true,
    maxLength: 100,
  },
  {
    id: "result",
    title: "그 결과 어떤 성과(객관적 사실, 정량적 수치)를 이룰 수 있었나요?",
    description:
      "경험(행동)의 결과와 그로 인해 배운 점과 아쉬운 점 등을 작성해주세요",
    chipText: "결과 및 성과",
    placeholder: "ex.4개월만에 출시에 성공하게 됨",
    required: true,
    maxLength: 100,
  },
];
