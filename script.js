// =========================
// 极简荣格八维测试网站
// 纯 HTML + CSS + JavaScript，无需后端
// =========================

// 八维功能基础资料：用于结果页展示
const functionInfo = {
  Te: {
    name: "Te 外向思维",
    ability: "执行力 / 效率力",
    oneLine: "把目标变成结果。",
    simple: "怎么推进？怎么落地？怎么更快更有效？",
    keywords: ["目标", "计划", "效率", "执行", "结果"],
    daily: "Te 关心的是：怎么推进？怎么落地？怎么更快更有效？",
    example: "做一件事时，Te 会先想目标、步骤、时间、分工和结果。"
  },
  Ti: {
    name: "Ti 内向思维",
    ability: "逻辑力 / 分析力",
    oneLine: "把事情想清楚。",
    simple: "这件事到底讲不讲得通？逻辑有没有漏洞？",
    keywords: ["逻辑", "原理", "分析", "自洽", "定义"],
    daily: "Ti 关心的是：这件事到底讲不讲得通？逻辑有没有漏洞？",
    example: "听到一个观点时，Ti 会先拆开看概念、前提和推理。"
  },
  Fe: {
    name: "Fe 外向情感",
    ability: "共情力 / 协调力",
    oneLine: "让关系和气氛顺起来。",
    simple: "别人舒不舒服？气氛对不对？关系有没有失衡？",
    keywords: ["关系", "氛围", "情绪", "反馈", "照顾"],
    daily: "Fe 关心的是：别人舒不舒服？气氛对不对？关系有没有失衡？",
    example: "聊天或聚会时，Fe 很容易察觉谁尴尬、谁不开心、哪里冷场了。"
  },
  Fi: {
    name: "Fi 内向情感",
    ability: "价值感 / 自我认同力",
    oneLine: "判断自己内心认不认。",
    simple: "这是不是我真正认同的？我心里能不能接受？",
    keywords: ["真实", "价值", "认同", "边界", "喜欢"],
    daily: "Fi 关心的是：这是不是我真正认同的？我心里能不能接受？",
    example: "别人都觉得没问题，但 Fi 会在意自己心里过不过得去。"
  },
  Ne: {
    name: "Ne 外向直觉",
    ability: "联想力 / 创造力",
    oneLine: "看到很多可能性。",
    simple: "还有没有别的可能？还能怎么玩？",
    keywords: ["灵感", "脑洞", "联想", "变化", "可能性"],
    daily: "Ne 关心的是：还有没有别的可能？还能怎么玩？",
    example: "看到一个点子，Ne 会立刻联想到很多新方向、新玩法和新组合。"
  },
  Ni: {
    name: "Ni 内向直觉",
    ability: "洞察力 / 预判力",
    oneLine: "看趋势、看本质、看未来。",
    simple: "这件事背后的真正问题是什么？未来会走向哪里？",
    keywords: ["洞察", "趋势", "意义", "本质", "未来"],
    daily: "Ni 关心的是：这件事背后的真正问题是什么？未来会走向哪里？",
    example: "别人还在看表面现象，Ni 已经在想背后的动机、规律和长期结果。"
  },
  Se: {
    name: "Se 外向感觉",
    ability: "行动力 / 现场反应力",
    oneLine: "进入当下，直接行动。",
    simple: "现在发生了什么？我能马上做什么？",
    keywords: ["体验", "行动", "现场", "反馈", "感官"],
    daily: "Se 关心的是：现在发生了什么？我能马上做什么？",
    example: "到了一个新环境，Se 会先感受现场、观察变化，然后快速反应。"
  },
  Si: {
    name: "Si 内向感觉",
    ability: "稳定力 / 经验力",
    oneLine: "依靠经验、细节和稳定感。",
    simple: "以前是怎么做的？什么方法更稳妥？",
    keywords: ["经验", "记忆", "细节", "习惯", "稳定"],
    daily: "Si 关心的是：以前是怎么做的？什么方法更稳妥？",
    example: "遇到问题时，Si 会先想过去有没有类似情况，有没有可靠经验。"
  }
};

// 16 种类型功能序列
const typeStacks = {
  INFJ: ["Ni", "Fe", "Ti", "Se"],
  INTJ: ["Ni", "Te", "Fi", "Se"],
  INFP: ["Fi", "Ne", "Si", "Te"],
  INTP: ["Ti", "Ne", "Si", "Fe"],
  ISFJ: ["Si", "Fe", "Ti", "Ne"],
  ISTJ: ["Si", "Te", "Fi", "Ne"],
  ISFP: ["Fi", "Se", "Ni", "Te"],
  ISTP: ["Ti", "Se", "Ni", "Fe"],
  ENFJ: ["Fe", "Ni", "Se", "Ti"],
  ENTJ: ["Te", "Ni", "Se", "Fi"],
  ENFP: ["Ne", "Fi", "Te", "Si"],
  ENTP: ["Ne", "Ti", "Fe", "Si"],
  ESFJ: ["Fe", "Si", "Ne", "Ti"],
  ESTJ: ["Te", "Si", "Ne", "Fi"],
  ESFP: ["Se", "Fi", "Te", "Ni"],
  ESTP: ["Se", "Ti", "Fe", "Ni"]
};

// 类型一句话总结
const typeSummaries = {
  INFJ: "你更像是用 Ni 看方向，用 Fe 处理关系的人。",
  INTJ: "你更像是用 Ni 看方向，用 Te 推进结果的人。",
  INFP: "你更像是用 Fi 判断内心认同，用 Ne 探索可能性的人。",
  INTP: "你更像是用 Ti 分析逻辑，用 Ne 打开可能性的人。",
  ISFJ: "你更像是用 Si 依靠经验，用 Fe 照顾关系的人。",
  ISTJ: "你更像是用 Si 依靠经验，用 Te 推进任务的人。",
  ISFP: "你更像是用 Fi 判断内心认同，用 Se 体验当下的人。",
  ISTP: "你更像是用 Ti 分析逻辑，用 Se 解决现实问题的人。",
  ENFJ: "你更像是用 Fe 感受关系，用 Ni 判断方向的人。",
  ENTJ: "你更像是用 Te 推进结果，用 Ni 判断方向的人。",
  ENFP: "你更像是用 Ne 探索可能性，用 Fi 判断内心认同的人。",
  ENTP: "你更像是用 Ne 打开可能性，用 Ti 分析逻辑的人。",
  ESFJ: "你更像是用 Fe 照顾关系，用 Si 维持稳定的人。",
  ESTJ: "你更像是用 Te 推进任务，用 Si 维持秩序的人。",
  ESFP: "你更像是用 Se 体验当下，用 Fi 判断喜好的人。",
  ESTP: "你更像是用 Se 解决现实问题，用 Ti 分析逻辑的人。"
};

// 类型说明：不堆能力词，尽量像朋友描述一个人
const typeDescriptions = {
  INFJ: "你像是一个习惯往深处看的人。不太满足于表面的热闹，更想知道一件事背后的原因、关系里的真实感受，以及未来会走向哪里。你容易想很多，也容易替别人考虑。提醒：别只在脑子里推演，多用行动验证想法。",
  INTJ: "你习惯先看方向，再思考怎么实现。你会自然地关注长期趋势、底层逻辑和效率路径，不太喜欢混乱、无意义社交和临时变化。提醒：别只停留在规划里，也要用现实反馈修正判断。",
  INFP: "你很重视内心真实感，不喜欢违背自己的价值观。你可能外表随和，但心里其实有自己的坚持。你容易被故事、理想和意义打动。提醒：别只停留在感受里，要慢慢把喜欢的东西做成结果。",
  INTP: "你喜欢把事情想明白，不太愿意接受没逻辑的说法。你会反复琢磨概念、原理和背后的结构，也喜欢独立思考。提醒：别一直停留在分析里，可以先做一个小版本，用现实结果验证想法。",
  ISFJ: "你重视稳定、熟悉感和身边人的感受。你通常比较可靠，也愿意默默照顾别人。你不一定爱表现，但会把很多细节放在心上。提醒：别总把自己放在后面，也要表达自己的需要。",
  ISTJ: "你重视规则、经验和责任感。你喜欢清楚的安排、稳定的方法和能落地的计划，不太喜欢反复变化和没有边界的事情。提醒：别太害怕变化，可以给新方法一点尝试空间。",
  ISFP: "你很重视真实感和个人喜好，不一定说很多，但心里知道自己喜欢什么、不喜欢什么。你也容易被当下的体验、审美和氛围影响。提醒：别只凭感觉行动，也要适当规划下一步。",
  ISTP: "你比较冷静、独立，喜欢弄清楚事情怎么运作，也更相信实际操作。你不太喜欢被过度干涉，遇到问题常常想自己解决。提醒：别总把情绪放一边，关系也需要表达和回应。",
  ENFJ: "你很容易把注意力放在人和关系上。你能感受到大家的状态，也愿意推动一群人往更好的方向走。你不是单纯外向，而是很在意关系里的意义和连接。提醒：别把所有人的情绪都背到自己身上。",
  ENTJ: "你目标感强，习惯看方向、定计划、推结果。你不喜欢低效和混乱，也容易自然地进入组织和推动事情的角色。提醒：别只关注完成任务，也要留意人的感受和过程中的细节。",
  ENFP: "你喜欢新鲜感、新想法和有生命力的事情。你很容易被一个灵感点燃，也很在意自己是不是真的喜欢。提醒：别只靠热情开始，后面也要练习持续推进和收尾。",
  ENTP: "你反应快，喜欢新点子、讨论和不同可能性。你很擅长发现一个问题的新角度，也容易在交流中越聊越兴奋。提醒：别只停留在想法和辩论里，也要把一部分想法真正做出来。",
  ESFJ: "你重视关系氛围和身边人的感受，也希望生活保持稳定、有秩序。你容易主动照顾别人，也希望大家相处得自然舒服。提醒：别太依赖外界评价，也要慢慢建立自己的判断。",
  ESTJ: "你重视效率、规则和实际结果。你通常责任感比较强，希望事情有安排、有标准、有进度，不喜欢拖拉和混乱。提醒：别只看标准和结果，也要给人和变化留一点空间。",
  ESFP: "你重视当下体验、真实感受和人与人的互动。你容易带动气氛，也喜欢直接感受生活里的快乐和变化。提醒：别只顾眼前开心，也要为长期目标留一点耐心。",
  ESTP: "你行动力强，反应快，擅长根据现场情况解决问题。你喜欢真实刺激和即时反馈，不太喜欢空想太久。提醒：别只看眼前机会，也要想想长期后果。"
};

// 第四功能小提醒
const growthTips = {
  Se: "少一点脑内推演，多一点真实体验。可以从运动、线下社交、旅行，或者马上做一件小事开始。",
  Si: "别只靠灵感和临场发挥。试着建立固定习惯、记录复盘，让生活更稳定。",
  Ne: "别只依赖熟悉经验。可以尝试新方法、新圈子，给自己一点探索空间。",
  Ni: "别只看眼前反馈。试着想想三个月后、一年后，这件事可能带来什么影响。",
  Te: "别只停留在感受和想法里。给自己设一个小目标、截止时间和可衡量结果。",
  Ti: "别只凭氛围或效率判断。试着问自己：这件事的逻辑是什么？我的理由是什么？",
  Fe: "别只顾自己想得通。试着表达情绪、听懂反馈，让关系里的你更容易被理解。",
  Fi: "别总按外界期待判断。多问自己：我真实想要什么？我能不能接受？"
};

// 基础题
const baseQuestions = [
  {
    text: "你更接近下面哪种状态？",
    options: [
      { label: "我常常会思考一件事背后的意义、趋势和未来走向。", scores: { Ni: 2 } },
      { label: "我更容易注意到眼前环境的变化、细节和真实体验。", scores: { Se: 2 } }
    ]
  },
  {
    text: "面对一个新想法时，你更像哪一种？",
    options: [
      { label: "我看到一个想法时，会联想到很多新的可能性。", scores: { Ne: 2 } },
      { label: "我更习惯参考过去经验，看看以前是怎么处理的。", scores: { Si: 2 } }
    ]
  },
  {
    text: "做判断时，你更在意什么？",
    options: [
      { label: "我做判断时，会先看这件事在逻辑上是否说得通。", scores: { Ti: 2 } },
      { label: "我做判断时，会先看这件事是否有效、能否推进结果。", scores: { Te: 2 } }
    ]
  },
  {
    text: "面对一件事，你更先关注什么？",
    options: [
      { label: "我更在意自己内心是否真正认同这件事。", scores: { Fi: 2 } },
      { label: "我更在意他人的感受、关系氛围和整体和谐。", scores: { Fe: 2 } }
    ]
  },
  {
    text: "你的思考方式更接近哪一种？",
    options: [
      { label: "我喜欢抓住一个核心方向，然后不断往深处想。", scores: { Ni: 2 } },
      { label: "我喜欢打开很多可能性，不急着确定唯一答案。", scores: { Ne: 2 } }
    ]
  },
  {
    text: "你更喜欢哪种处理方式？",
    options: [
      { label: "我更相信稳定的方法、熟悉的流程和过去验证过的经验。", scores: { Si: 2 } },
      { label: "我更喜欢根据现场情况直接反应，边做边调整。", scores: { Se: 2 } }
    ]
  },
  {
    text: "你更像哪种理性方式？",
    options: [
      { label: "我喜欢拆解概念、定义问题、追求逻辑准确。", scores: { Ti: 2 } },
      { label: "我喜欢制定计划、安排步骤、推动事情完成。", scores: { Te: 2 } }
    ]
  },
  {
    text: "你更像哪种情感方式？",
    options: [
      { label: "我不喜欢违背自己的真实感受和价值判断。", scores: { Fi: 2 } },
      { label: "我会自然地察觉他人的情绪，并调整自己的表达。", scores: { Fe: 2 } }
    ]
  },
  {
    text: "你更常出现哪种情况？",
    options: [
      { label: "我经常能从一些细节中推测出后续可能的发展。", scores: { Ni: 1, Ti: 1 } },
      { label: "我经常能从一个点子延伸出很多新玩法。", scores: { Ne: 1, Fi: 1 } }
    ]
  },
  {
    text: "压力比较大时，你更容易怎样？",
    options: [
      { label: "我在压力下容易反复回想过去的细节和经验。", scores: { Si: 1, Fi: 1 } },
      { label: "我在压力下容易想马上做点什么，用行动解决问题。", scores: { Se: 1, Te: 1 } }
    ]
  },
  {
    text: "面对一个决定，你更像哪一种？",
    options: [
      { label: "我更像是先理解本质，再决定要不要行动。", scores: { Ni: 1, Ti: 1 } },
      { label: "我更像是先行动起来，再根据反馈调整方向。", scores: { Se: 1, Te: 1 } }
    ]
  },
  {
    text: "在人际关系中，你更容易关注什么？",
    options: [
      { label: "我在人际中更容易关注对方有没有舒服、气氛是否自然。", scores: { Fe: 2 } },
      { label: "我在人际中更容易关注自己是否真诚、有没有违背内心。", scores: { Fi: 2 } }
    ]
  },
  {
    text: "你更喜欢哪种信息状态？",
    options: [
      { label: "我喜欢长期思考一个方向，直到看清它背后的规律。", scores: { Ni: 2 } },
      { label: "我喜欢同时接触很多新鲜信息，获得更多灵感。", scores: { Ne: 2 } }
    ]
  },
  {
    text: "做事时，你更倾向哪一种？",
    options: [
      { label: "我更愿意按照熟悉、安全、稳定的方式处理事情。", scores: { Si: 2 } },
      { label: "我更愿意直接尝试，通过现实反馈调整自己。", scores: { Se: 2 } }
    ]
  },
  {
    text: "面对观点和任务，你更在意什么？",
    options: [
      { label: "我更在意观点是否严谨、概念是否清楚。", scores: { Ti: 2 } },
      { label: "我更在意事情是否推进、目标是否完成。", scores: { Te: 2 } }
    ]
  },
  {
    text: "面对别人不理解时，你更像哪一种？",
    options: [
      { label: "我更容易坚持自己的价值判断，即使别人不理解。", scores: { Fi: 2 } },
      { label: "我更容易调整表达方式，让关系氛围更舒服。", scores: { Fe: 2 } }
    ]
  }
];

// 低可信度时的确认题
// 这 6 题尽量避免和前 16 题重复，重点区分最容易混淆的类型：
// INFJ/ENFJ、INFP/INFJ、INTJ/INFJ、ENFP/ENTP、ISFJ/INFJ、ISTP/INTP 等
const confirmQuestions = [
  {
    text: "当一段关系让你不舒服时，你更常见的反应是？",
    options: [
      { label: "我会先退回心里想很久，判断这段关系到底哪里不对、以后会不会继续恶化。", scores: { Ni: 3, Ti: 1 } },
      { label: "我会更想尽快沟通或缓和气氛，先让关系别继续僵下去。", scores: { Fe: 3, Se: 1 } }
    ]
  },
  {
    text: "面对一个你很在意的选择，你更容易卡在哪里？",
    options: [
      { label: "卡在“我到底想不想、认不认、能不能接受”，内心感受不对就很难继续。", scores: { Fi: 3, Ne: 1 } },
      { label: "卡在“这件事背后的走向是什么、长期会变成什么样”，不看清方向就不踏实。", scores: { Ni: 3, Fe: 1 } }
    ]
  },
  {
    text: "你更像哪种解决问题的人？",
    options: [
      { label: "我会先建立一个清晰判断：目标、优先级、步骤是什么，然后推动它落地。", scores: { Te: 3, Ni: 1 } },
      { label: "我会先把概念、原因、逻辑链条拆清楚，确定这件事为什么成立。", scores: { Ti: 3, Ne: 1 } }
    ]
  },
  {
    text: "计划突然变化时，你更容易出现哪种不适？",
    options: [
      { label: "我会不舒服，因为原本稳定的安排、熟悉的节奏和预期被打乱了。", scores: { Si: 3, Te: 1 } },
      { label: "我会不舒服，因为我原先对事情走向的判断被打断，需要重新判断方向。", scores: { Ni: 3, Ti: 1 } }
    ]
  },
  {
    text: "进入一个新场景时，你更容易被什么带动？",
    options: [
      { label: "现场的人、气氛、互动和反馈会很快影响我，我会跟着场面调整。", scores: { Fe: 2, Se: 2 } },
      { label: "我会先观察和判断这个场景背后的规则、关系结构和可能走向。", scores: { Ni: 2, Ti: 2 } }
    ]
  },
  {
    text: "当你有一个新想法时，后续更像哪一种？",
    options: [
      { label: "我会继续发散出很多新方向，越想越多，容易兴奋但也容易分散。", scores: { Ne: 3, Fi: 1 } },
      { label: "我会想它能不能做出来、怎样推进、要不要马上试一个结果。", scores: { Te: 2, Se: 2 } }
    ]
  }
];

// 页面元素
const pages = {
  home: document.getElementById("homePage"),
  test: document.getElementById("testPage"),
  confirm: document.getElementById("confirmPage"),
  result: document.getElementById("resultPage")
};

const startBtn = document.getElementById("startBtn");
const viewLastBtn = document.getElementById("viewLastBtn");
const lastResultHint = document.getElementById("lastResultHint");
const restartBtnTop = document.getElementById("restartBtnTop");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const progressBar = document.getElementById("progressBar");
const optionsWrap = document.getElementById("optionsWrap");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const continueConfirmBtn = document.getElementById("continueConfirmBtn");
const showDirectBtn = document.getElementById("showDirectBtn");
const resultContent = document.getElementById("resultContent");

// 当前状态
let currentQuestions = [...baseQuestions];
let answers = [];
let currentIndex = 0;
let hasAskedConfirm = false;
let pendingResult = null;

// 用 localStorage 保存用户上次测试结果。只保存在用户自己的浏览器里。
const STORAGE_KEY = "jung_bawei_last_result_v1";

// 切换页面
function showPage(name) {
  Object.values(pages).forEach(page => page.classList.remove("active"));
  pages[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 开始测试
function startTest() {
  currentQuestions = [...baseQuestions];
  answers = new Array(currentQuestions.length).fill(null);
  currentIndex = 0;
  hasAskedConfirm = false;
  pendingResult = null;
  showPage("test");
  renderQuestion();
}

// 重新测试
function restartTest() {
  startTest();
}

// 渲染当前题目
function renderQuestion() {
  const question = currentQuestions[currentIndex];
  const total = currentQuestions.length;

  questionCount.textContent = `第 ${currentIndex + 1} / ${total} 题`;
  questionText.textContent = question.text;
  progressBar.style.width = `${((currentIndex + 1) / total) * 100}%`;

  optionsWrap.innerHTML = "";
  question.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    if (answers[currentIndex] === index) btn.classList.add("selected");
    btn.innerHTML = `<span class="label">${index === 0 ? "A" : "B"}</span>${option.label}`;
    btn.addEventListener("click", () => {
      answers[currentIndex] = index;
      renderQuestion();
    });
    optionsWrap.appendChild(btn);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === total - 1 ? "查看结果" : "下一题";
  nextBtn.disabled = answers[currentIndex] === null;
}

// 进入下一题或计算结果
function goNext() {
  if (answers[currentIndex] === null) return;

  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
    return;
  }

  const result = calculateResult();

  // 基础 16 题结束且可信度较低时，询问是否追加确认题
  if (!hasAskedConfirm && result.confidence === "较低") {
    pendingResult = result;
    showPage("confirm");
    return;
  }

  renderResult(result);
}

// 上一题
function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// 追加确认题
function addConfirmQuestions() {
  hasAskedConfirm = true;
  currentQuestions = [...baseQuestions, ...confirmQuestions];
  answers = [...answers, ...new Array(confirmQuestions.length).fill(null)];
  currentIndex = baseQuestions.length;
  showPage("test");
  renderQuestion();
}

// 直接查看低可信度结果
function showDirectResult() {
  hasAskedConfirm = true;
  renderResult(pendingResult || calculateResult());
}

// 统计八维分数
function calculateFunctionScores() {
  const scores = { Ni: 0, Ne: 0, Si: 0, Se: 0, Ti: 0, Te: 0, Fi: 0, Fe: 0 };

  currentQuestions.forEach((question, qIndex) => {
    const answerIndex = answers[qIndex];
    if (answerIndex === null) return;

    const selected = question.options[answerIndex];
    Object.entries(selected.scores).forEach(([fn, value]) => {
      scores[fn] += value;
    });
  });

  return scores;
}

// 根据八维分数计算 16 类型分数
function calculateTypeScores(functionScores) {
  const typeScores = {};

  Object.entries(typeStacks).forEach(([type, stack]) => {
    const [dominant, auxiliary, tertiary, inferior] = stack;
    typeScores[type] =
      functionScores[dominant] * 4 +
      functionScores[auxiliary] * 3 +
      functionScores[tertiary] * 2 +
      functionScores[inferior] * 1;
  });

  return typeScores;
}

// 完整结果计算
function calculateResult() {
  const functionScores = calculateFunctionScores();
  const typeScores = calculateTypeScores(functionScores);

  const sortedTypes = Object.entries(typeScores)
    .sort((a, b) => b[1] - a[1])
    .map(([type, score]) => ({ type, score }));

  const top = sortedTypes[0];
  const second = sortedTypes[1];
  const gap = top.score - second.score;

  let confidence = "较低";
  if (gap >= 8) confidence = "较高";
  else if (gap >= 4) confidence = "中等";

  const resultPrefix =
    confidence === "较高" ? "你更接近" :
    confidence === "中等" ? "你比较接近" :
    "你可能接近";

  return {
    functionScores,
    typeScores,
    sortedTypes,
    topType: top.type,
    confidence,
    gap,
    resultPrefix
  };
}


// 保存最近一次测试结果到本地浏览器
function saveLastResult(result) {
  const payload = {
    savedAt: new Date().toISOString(),
    result
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

// 读取最近一次测试结果
function loadLastResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

// 清除最近一次测试结果
function clearLastResult() {
  localStorage.removeItem(STORAGE_KEY);
  initHomeLastResult();
}

// 渲染结果页
function renderResult(result, options = {}) {
  if (!options.fromStorage) {
    saveLastResult(result);
  }
  showPage("result");
  const type = result.topType;
  const stack = typeStacks[type];
  const maxFunctionScore = Math.max(...Object.values(result.functionScores), 1);

  resultContent.innerHTML = `
    <div class="card result-hero">
      <div class="eyebrow">你的结果</div>
      <div class="type-big">${type}</div>
      <div class="pill ${result.confidence === "较高" ? "good" : result.confidence === "中等" ? "mid" : "warn"}">
        可信度：${result.confidence}
      </div>
      <h2>${result.resultPrefix}：${type}</h2>
      <p class="result-subtitle">${typeSummaries[type]}</p>
      ${options.fromStorage ? `<div class="close-alert">这是你上次保存的测试结果。你可以继续参考，也可以重新测试。</div>` : ""}
      ${
        result.confidence === "较低"
          ? `<div class="close-alert">你的结果比较接近，说明几个功能分数差距不大。建议重点看前三可能类型，而不是只盯着第一名。</div>`
          : ""
      }
    </div>

    <div class="card">
      <h3 class="module-title">功能序列</h3>
      <div class="function-grid">
        ${renderStackCard("主导功能", stack[0])}
        ${renderStackCard("辅助功能", stack[1])}
        ${renderStackCard("第三功能", stack[2])}
        ${renderStackCard("第四功能", stack[3])}
      </div>
    </div>

    <div class="card">
      <h3 class="module-title">四个位置是什么意思</h3>
      <div class="meaning-list">
        <div class="meaning-item"><strong>主导功能：</strong>你最顺手、最自动使用的核心能力。</div>
        <div class="meaning-item"><strong>辅助功能：</strong>帮助你和外界互动、平衡自己的第二能力。</div>
        <div class="meaning-item"><strong>第三功能：</strong>你会感兴趣，也能发展，但有时不太稳定的能力。</div>
        <div class="meaning-item"><strong>第四功能：</strong>你容易忽略的短板能力，也是成长方向。</div>
      </div>
    </div>

    <div class="card">
      <h3 class="module-title">类型说明</h3>
      <p class="type-desc">${typeDescriptions[type]}</p>
    </div>

    <div class="card">
      <h3 class="module-title">给你的一个小提醒</h3>
      <p class="type-desc">${growthTips[stack[3]]}</p>
    </div>

    <div class="card">
      <h3 class="module-title">前三可能类型</h3>
      <div class="rank-list">
        ${result.sortedTypes.slice(0, 3).map((item, index) => `
          <div class="rank-item">
            <span>${index + 1}. ${item.type}</span>
            <span>${item.score} 分</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card">
      <h3 class="module-title">八维得分</h3>
      <div class="score-bars">
        ${Object.entries(result.functionScores)
          .sort((a, b) => b[1] - a[1])
          .map(([fn, score]) => `
            <div class="score-row">
              <div class="score-name">${fn}</div>
              <div class="bar-bg">
                <div class="bar-fill" style="width: ${(score / maxFunctionScore) * 100}%"></div>
              </div>
              <div class="score-num">${score} 分</div>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="card">
      <h3 class="module-title">八个功能怎么简单理解？</h3>
      <div class="eight-grid">
        ${["Te", "Ti", "Fe", "Fi", "Ne", "Ni", "Se", "Si"].map(renderEightCard).join("")}
      </div>
    </div>

    <div class="card small-note">
      <h3 class="module-title">说明</h3>
      <p class="muted">本测试是入门级自我观察工具，不代表专业心理测评。荣格八维适合帮助你观察自己的认知倾向，但人的状态会随环境、年龄、压力和成长阶段变化。结果适合参考，不适合给自己贴死标签。</p>
    </div>

    <div class="nav-row">
      <button class="secondary-btn" onclick="clearLastResult(); startTest();">清除记录并重新测试</button>
      <button class="primary-btn" onclick="restartTest()">重新测试</button>
    </div>
  `;
}

// 功能序列卡片
function renderStackCard(position, fn) {
  const info = functionInfo[fn];
  return `
    <div class="function-card">
      <h4>${position}：${info.name}</h4>
      <span class="tag">${info.ability}</span>
      <p class="simple">${info.oneLine}</p>
      <p class="muted">${info.simple}</p>
    </div>
  `;
}

// 八维说明小卡片
function renderEightCard(fn) {
  const info = functionInfo[fn];
  return `
    <div class="eight-card">
      <h4>${info.name}</h4>
      <span class="tag">${info.ability}</span>
      <p><strong>${info.oneLine}</strong></p>
      <div class="keywords">
        ${info.keywords.map(k => `<span class="keyword">${k}</span>`).join("")}
      </div>
      <p>${info.daily}</p>
      <p class="muted">例子：${info.example}</p>
    </div>
  `;
}


// 首页显示“查看上次结果”按钮
function initHomeLastResult() {
  const saved = loadLastResult();
  if (!viewLastBtn || !lastResultHint) return;

  if (!saved || !saved.result) {
    viewLastBtn.classList.add("hidden");
    lastResultHint.classList.add("hidden");
    return;
  }

  const date = new Date(saved.savedAt);
  const dateText = Number.isNaN(date.getTime())
    ? "之前"
    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  viewLastBtn.classList.remove("hidden");
  lastResultHint.classList.remove("hidden");
  lastResultHint.textContent = `已保存上次结果：${saved.result.topType}，保存于 ${dateText}`;
}

function viewLastResult() {
  const saved = loadLastResult();
  if (!saved || !saved.result) {
    startTest();
    return;
  }
  renderResult(saved.result, { fromStorage: true });
}

// 绑定事件
startBtn.addEventListener("click", startTest);
viewLastBtn.addEventListener("click", viewLastResult);
restartBtnTop.addEventListener("click", restartTest);
prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);
continueConfirmBtn.addEventListener("click", addConfirmQuestions);
showDirectBtn.addEventListener("click", showDirectResult);

initHomeLastResult();


// =========================
// 主题切换：浅色 / 偏黑色
// =========================
const THEME_KEY = "jung_bawei_theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀️ 浅色" : "🌙 深色";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
}

initTheme();
