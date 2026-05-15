// 第二轮/第三轮优化：题目生活化 + 动态确认题。
// 这个文件在 script.js 和 enhancements.js 之后加载，用最小改动覆盖题库与确认题逻辑。

// 1) 覆盖基础 16 题：保留二选一和原有计分结构，只让题目更生活化。
baseQuestions.splice(0, baseQuestions.length,
  {
    text: "到了一个不熟悉的聚会或活动现场时，你更容易……",
    options: [
      { label: "先安静观察，心里慢慢判断这里的人际气氛和接下来可能会怎样。", scores: { Ni: 2 } },
      { label: "先注意现场的人、声音、位置和互动，顺着当下情况进入状态。", scores: { Se: 2 } }
    ]
  },
  {
    text: "学一个新工具或新方法时，你更容易……",
    options: [
      { label: "很快想到它还能用在哪些别的地方，忍不住想试不同玩法。", scores: { Ne: 2 } },
      { label: "先找熟悉的例子或教程，对照以前经验一步步弄明白。", scores: { Si: 2 } }
    ]
  },
  {
    text: "大家讨论一个方案时，你更容易先在意……",
    options: [
      { label: "这个说法前后是不是说得通，有没有哪里逻辑接不上。", scores: { Ti: 2 } },
      { label: "这个方案接下来能不能执行，谁做、什么时候做、怎么推进。", scores: { Te: 2 } }
    ]
  },
  {
    text: "别人希望你配合一件事，但你心里有点别扭时，你更容易……",
    options: [
      { label: "先确认自己到底能不能接受，不想勉强违背内心。", scores: { Fi: 2 } },
      { label: "先看看大家的感受和气氛，尽量别让关系变得尴尬。", scores: { Fe: 2 } }
    ]
  },
  {
    text: "朋友跟你说“我也不知道自己为什么这么烦”时，你更容易……",
    options: [
      { label: "想帮 TA 把事情收成一个重点：真正卡住的可能是哪一点。", scores: { Ni: 2 } },
      { label: "想到好几种可能：也许是人、环境、压力、选择都有关系。", scores: { Ne: 2 } }
    ]
  },
  {
    text: "原本计划好的安排突然变了，你更容易……",
    options: [
      { label: "先不太舒服，想重新确认时间、顺序和接下来怎么稳定下来。", scores: { Si: 2 } },
      { label: "先看现在现场还能怎么做，边应对边调整。", scores: { Se: 2 } }
    ]
  },
  {
    text: "和别人一起做一件事，讨论半天还没开始时，你更容易……",
    options: [
      { label: "卡在“我们说的到底是不是一回事，规则和定义还没讲清楚”。", scores: { Ti: 2 } },
      { label: "卡在“现在谁做什么、什么时候做、下一步怎么推进还没定”。", scores: { Te: 2 } }
    ]
  },
  {
    text: "聊天时发现对方情绪不太对，你更容易……",
    options: [
      { label: "先分辨自己真实感受是什么，想清楚要不要继续这个话题。", scores: { Fi: 2 } },
      { label: "先调整语气或话题，让对方和现场气氛舒服一点。", scores: { Fe: 2 } }
    ]
  },
  {
    text: "别人兴奋地提出一个新点子时，你更容易……",
    options: [
      { label: "先在心里卡一下：这里的前提对吗？中间有没有说不通的地方？", scores: { Ti: 2 } },
      { label: "被这个点子带着继续联想：那还可以怎么变、怎么组合、怎么玩？", scores: { Ne: 2 } }
    ]
  },
  {
    text: "任务突然变得很乱、时间也很紧时，你更容易……",
    options: [
      { label: "想先回到熟悉流程里，把细节、顺序和已知经验重新确认一遍。", scores: { Si: 2 } },
      { label: "先动手处理眼前最明显的问题，边做边根据现场情况调整。", scores: { Se: 1, Te: 1 } }
    ]
  },
  {
    text: "面对一个新的机会或项目时，你更容易……",
    options: [
      { label: "先在脑子里想它后面会怎么发展，确定方向不别扭才会投入。", scores: { Ni: 1, Ti: 1 } },
      { label: "先做一个小尝试，看实际反馈如何，再决定要不要继续。", scores: { Se: 1, Te: 1 } }
    ]
  },
  {
    text: "和一群人相处时，你更容易先注意到……",
    options: [
      { label: "谁有点不自在、气氛哪里不太顺、要不要缓和一下。", scores: { Fe: 2 } },
      { label: "自己在这群人里是否真诚自然，有没有勉强自己配合。", scores: { Fi: 2 } }
    ]
  },
  {
    text: "学一个新东西时，你更容易……",
    options: [
      { label: "围着一个核心问题反复想，直到心里慢慢形成一个清楚方向。", scores: { Ni: 2 } },
      { label: "一边学一边跳到相关内容，靠不同信息之间的碰撞理解它。", scores: { Ne: 2 } }
    ]
  },
  {
    text: "去一个没去过的地方办事时，你更容易……",
    options: [
      { label: "提前查路线、流程和注意事项，希望心里有个稳定预期。", scores: { Si: 2 } },
      { label: "到了现场再看情况，根据指示、环境和现场反馈调整。", scores: { Se: 2 } }
    ]
  },
  {
    text: "大家对一件事争论很久时，你更容易想先解决……",
    options: [
      { label: "观点里的概念和理由到底清不清楚，不然越聊越乱。", scores: { Ti: 2 } },
      { label: "这件事到底下一步怎么定，不然一直讨论也没有进展。", scores: { Te: 2 } }
    ]
  },
  {
    text: "和别人意见不一致时，你更容易……",
    options: [
      { label: "先确认自己真正认同什么，不太想为了好相处就改口。", scores: { Fi: 2 } },
      { label: "先调整表达方式，尽量让对方听得进去，也避免关系变僵。", scores: { Fe: 2 } }
    ]
  }
);

const dynamicConfirmGroups = {
  "INFJ|INFP": [
    { text: "朋友反复向你倾诉一段关系问题时，你更容易……", options: [
      { label: "一边听一边判断这段关系的走向，以及怎样说能让局面缓和。", scores: { Ni: 1, Fe: 2 } },
      { label: "一边听一边确认 TA 真正在意什么，也想到好几种可能原因。", scores: { Fi: 2, Ne: 1 } }
    ]},
    { text: "你自己遇到一个很在意的选择时，你更容易卡在……", options: [
      { label: "这件事长期会把我带向哪里，我需要先看清方向。", scores: { Ni: 2 } },
      { label: "这件事我心里到底认不认，我不想勉强自己接受。", scores: { Fi: 2 } }
    ]}
  ],
  "INFJ|INTJ": [
    { text: "你看出一件事可能会出问题时，更容易先做什么？", options: [
      { label: "整理目标、步骤和优先级，想办法把问题推进解决。", scores: { Te: 3 } },
      { label: "先考虑相关人的感受和反应，避免关系或气氛先崩掉。", scores: { Fe: 3 } }
    ]},
    { text: "小组方向不清楚时，你更受不了的是……", options: [
      { label: "没有人定目标和分工，事情一直没有进展。", scores: { Te: 2 } },
      { label: "大家情绪和立场没对齐，越做越别扭。", scores: { Fe: 2 } }
    ]}
  ],
  "INTP|ISTP": [
    { text: "遇到一个新问题时，你更容易……", options: [
      { label: "想出几种解释和可能路径，在脑子里继续推演。", scores: { Ne: 3 } },
      { label: "直接拆开现实情况，动手试一下哪里能解决。", scores: { Se: 3 } }
    ]},
    { text: "别人问你“这个东西怎么弄”时，你更容易……", options: [
      { label: "先解释它背后的原理，以及可能还有哪些用法。", scores: { Ne: 2, Ti: 1 } },
      { label: "先看具体东西在哪、怎么操作、哪里坏了或卡住了。", scores: { Se: 2, Ti: 1 } }
    ]}
  ],
  "ISFJ|ISTJ": [
    { text: "熟悉的安排被打乱时，你更容易先在意……", options: [
      { label: "大家会不会不舒服，谁需要被照顾或安抚。", scores: { Fe: 3 } },
      { label: "流程和责任怎么重新排，事情还能不能按时完成。", scores: { Te: 3 } }
    ]},
    { text: "别人没按约定做事时，你更容易……", options: [
      { label: "先担心关系变尴尬，想用比较柔和的方式提醒。", scores: { Fe: 2 } },
      { label: "先觉得规则和责任被打乱，需要把标准说清楚。", scores: { Te: 2 } }
    ]}
  ],
  "ENFP|ENTP": [
    { text: "听到一个很新鲜的观点时，你更容易先问自己……", options: [
      { label: "我心里认不认同它，它和我的真实感受合不合。", scores: { Fi: 3 } },
      { label: "它的逻辑站不站得住，前提和推理有没有问题。", scores: { Ti: 3 } }
    ]},
    { text: "和朋友聊到一个有争议的话题时，你更容易……", options: [
      { label: "在意这个观点是否尊重人的真实感受和价值。", scores: { Fi: 2 } },
      { label: "在意这个观点有没有自相矛盾、定义是否清楚。", scores: { Ti: 2 } }
    ]}
  ],
  "ESFP|ESTP": [
    { text: "现场突然出现一个新机会时，你更容易……", options: [
      { label: "先感受自己喜不喜欢、想不想参与，感觉对了就上。", scores: { Fi: 3 } },
      { label: "先判断这件事怎么操作、有没有漏洞、能不能成。", scores: { Ti: 3 } }
    ]},
    { text: "和别人一起临场处理问题时，你更容易……", options: [
      { label: "跟着当下感受和个人判断走，不想做违心的选择。", scores: { Fi: 2, Se: 1 } },
      { label: "快速看清问题结构，找最直接有效的处理办法。", scores: { Ti: 2, Se: 1 } }
    ]}
  ]
};

const fallbackDynamicConfirmQuestions = [
  { text: "到了一个陌生场合时，你更容易……", options: [
    { label: "先观察一会儿，心里判断这个场合大概会怎么发展。", scores: { Ni: 2 } },
    { label: "先注意现场的人和环境，顺着当下情况调整自己。", scores: { Se: 2 } }
  ]},
  { text: "学一个新东西时，你更容易……", options: [
    { label: "先看它还能联想到哪些相关内容和新玩法。", scores: { Ne: 2 } },
    { label: "先找熟悉例子和固定步骤，把基础弄稳。", scores: { Si: 2 } }
  ]},
  { text: "一起做事但讨论很久还没结果时，你更容易卡在……", options: [
    { label: "大家说的概念和理由还没讲清楚。", scores: { Ti: 2 } },
    { label: "下一步怎么做、谁来做还没定下来。", scores: { Te: 2 } }
  ]},
  { text: "和别人意见不一致时，你更容易先处理……", options: [
    { label: "自己心里到底认不认同，不想勉强改口。", scores: { Fi: 2 } },
    { label: "表达方式和现场气氛，避免关系变僵。", scores: { Fe: 2 } }
  ]}
];

function dynamicPairKey(typeA, typeB) {
  return [typeA, typeB].sort().join("|");
}

function selectDynamicConfirmQuestions(result) {
  const topTypes = (result?.sortedTypes || []).slice(0, 3).map(item => item.type);
  const selected = [];
  const usedGroups = new Set();

  for (let i = 0; i < topTypes.length; i++) {
    for (let j = i + 1; j < topTypes.length; j++) {
      const key = dynamicPairKey(topTypes[i], topTypes[j]);
      const group = dynamicConfirmGroups[key];
      if (!group || usedGroups.has(key)) continue;
      usedGroups.add(key);
      selected.push(...group);
      if (selected.length >= 6) return selected.slice(0, 6);
    }
  }

  return selected.length > 0 ? selected.slice(0, 6) : fallbackDynamicConfirmQuestions;
}

function addDynamicConfirmQuestions(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  hasAskedConfirm = true;
  const selectedConfirmQuestions = selectDynamicConfirmQuestions(pendingResult || calculateResult());
  currentQuestions = [...baseQuestions, ...selectedConfirmQuestions];
  answers = [...answers.slice(0, baseQuestions.length), ...new Array(selectedConfirmQuestions.length).fill(null)];
  currentIndex = baseQuestions.length;
  showPage("test");
  renderQuestion();
}

continueConfirmBtn.addEventListener("click", addDynamicConfirmQuestions, true);
