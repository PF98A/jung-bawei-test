// 第一轮优化：在不改原有题目和核心计分数据的基础上，增强结果页说明。
let lastRenderedResult = null;

const confidenceText = {
  high: "高",
  medium: "中",
  low: "低"
};

const typeBriefs = {
  INFJ: "偏向用洞察看方向，再用关系感推动改变。",
  INTJ: "偏向先判断长期方向，再把想法落成计划。",
  INFP: "偏向守住内心价值，同时探索更多可能。",
  INTP: "偏向拆解逻辑，再打开新的解释和方案。",
  ISFJ: "偏向依靠经验和细节，稳定地照顾现实与关系。",
  ISTJ: "偏向按可靠经验做事，重视秩序、责任和结果。",
  ISFP: "偏向跟随真实感受，并通过当下体验表达自己。",
  ISTP: "偏向冷静分析问题，再用实际行动验证。",
  ENFJ: "偏向关注人的状态，并带着长期方向推动关系。",
  ENTJ: "偏向目标和效率，同时用长期判断校准路线。",
  ENFP: "偏向追随灵感和可能性，也重视内心认同。",
  ENTP: "偏向不断提出新角度，再用逻辑筛选想法。",
  ESFJ: "偏向维护关系氛围，并用熟悉经验保持稳定。",
  ESTJ: "偏向组织任务、推进结果，并依靠可靠流程。",
  ESFP: "偏向投入当下体验，也重视真实喜好和感受。",
  ESTP: "偏向现场反应和解决问题，再用逻辑快速判断。"
};

const functionPlain = {
  Ni: "看趋势、抓本质、预判长期方向",
  Ne: "发现可能性、联想新点子、打开选择",
  Si: "依靠经验、记住细节、维持稳定节奏",
  Se: "进入当下、快速反应、用现实反馈调整",
  Ti: "拆逻辑、找原理、追求内部自洽",
  Te: "定目标、排步骤、推动事情落地",
  Fi: "确认内心认同、价值感和个人边界",
  Fe: "感受关系氛围、协调情绪和群体状态"
};

const roleIntro = {
  dominant: "你最自然、最容易先动用的心理入口。",
  auxiliary: "帮你平衡主导功能，也帮助你和外部世界互动。",
  tertiary: "你会感兴趣、偶尔很想使用，但还不总是稳定的能力。",
  inferior: "你容易忽略或紧张的短板，也是很重要的成长方向。"
};

function normalizeConfidence(confidence) {
  if (confidence === "高" || confidence === "较高") return "high";
  if (confidence === "中" || confidence === "中等") return "medium";
  return "low";
}

function calculateResult() {
  const functionScores = calculateFunctionScores();
  const typeScores = calculateTypeScores(functionScores);

  const sortedTypes = Object.entries(typeScores)
    .sort((a, b) => b[1] - a[1])
    .map(([type, score]) => ({ type, score }));

  const top = sortedTypes[0];
  const second = sortedTypes[1];
  const gap = top.score - second.score;

  let confidence = "低";
  if (gap >= 8) confidence = "高";
  else if (gap >= 4) confidence = "中";

  const resultPrefix =
    confidence === "高" ? "你更接近" :
    confidence === "中" ? "你比较接近" :
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

function getConfidenceMessage(result) {
  const topThree = result.sortedTypes.slice(0, 3);
  const second = topThree[1];
  const third = topThree[2];
  const level = normalizeConfidence(result.confidence);

  if (level === "high") {
    return `第一名和第二名相差 ${result.gap} 分，当前答案比较集中，可以优先参考 ${result.topType}，但仍建议结合功能解释看。`;
  }

  if (level === "medium") {
    return `第一名和第二名相差 ${result.gap} 分，结果有一定参考价值，但不要只看四个字母。`;
  }

  return `第一名和第二名只相差 ${result.gap} 分，你也可能接近 ${second.type} / ${third.type}，不建议只看单一类型。`;
}

function buildTypeExplanation(type) {
  const [dominant, auxiliary, tertiary, inferior] = typeStacks[type];

  return [
    {
      title: "核心驱动力",
      text: `你更像是先用 ${dominant} 来理解世界：${functionPlain[dominant]}。辅助的 ${auxiliary} 会帮你把这种倾向表达出来。`
    },
    {
      title: "主要优势",
      text: `优势通常来自前两功能的配合：${dominant} 负责你最顺手的判断方式，${auxiliary} 让你不只停在脑内，也能和现实、关系或任务发生连接。`
    },
    {
      title: "容易卡住的地方",
      text: `当你过度依赖 ${dominant} / ${auxiliary}，可能会忽略 ${tertiary} 和 ${inferior}。这时容易只用熟悉方式解释问题，比较难换一个角度。`
    },
    {
      title: "压力状态下的表现",
      text: `压力大时，第四功能 ${inferior} 容易以不稳定的方式冒出来：你可能突然过度补偿，或者对这类事情特别敏感。`
    },
    {
      title: "关系中的表现",
      text: `在关系里，你常会带着 ${dominant} 的视角理解对方，再通过 ${auxiliary} 处理互动。别人未必总能立刻看懂你的出发点，表达过程很重要。`
    },
    {
      title: "成长建议",
      text: `第三功能 ${tertiary} 适合当作练习区：慢慢使用，不急着证明自己。第四功能 ${inferior} 适合当作提醒灯：它不是要你变成另一个人，而是提醒你补上容易忽略的现实面。${growthTips[inferior]}`
    }
  ];
}

function renderSimilarTypes(sortedTypes) {
  return sortedTypes.slice(0, 3).map((item, index) => `
    <div class="similar-type-card">
      <div class="similar-type-head">
        <span class="similar-rank">${index + 1}</span>
        <strong>${item.type}</strong>
        <span>${item.score} 分</span>
      </div>
      <p>${typeBriefs[item.type]}</p>
    </div>
  `).join("");
}

function renderExplanationModules(type) {
  return buildTypeExplanation(type).map(item => `
    <div class="explain-item">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>
  `).join("");
}

function renderStackCard(position, fn) {
  const info = functionInfo[fn];
  const roleKey = position.includes("主导") ? "dominant" : position.includes("辅助") ? "auxiliary" : position.includes("第三") ? "tertiary" : "inferior";
  return `
    <div class="function-card">
      <h4>${position}：${info.name}</h4>
      <span class="tag">${info.ability}</span>
      <p class="simple">${info.oneLine}</p>
      <p class="muted">${roleIntro[roleKey]}</p>
      <p class="muted">${info.simple}</p>
    </div>
  `;
}

function buildShareText(result) {
  const type = result.topType;
  const stack = typeStacks[type];
  const confidenceLabel = confidenceText[normalizeConfidence(result.confidence)];
  const pageUrl = window.location.href.split("#")[0];

  return [
    `我的荣格八维测试结果：${type}`,
    `可信度：${confidenceLabel}`,
    `主导功能：${stack[0]}（${functionPlain[stack[0]]}）`,
    `辅助功能：${stack[1]}（${functionPlain[stack[1]]}）`,
    `一句话总结：${typeSummaries[type]}`,
    `测试链接：${pageUrl}`
  ].join("\n");
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}

function setCopyFeedback(message, isError = false) {
  const feedback = document.getElementById("copyResultFeedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle("error", isError);
}

async function copyCurrentResult() {
  if (!lastRenderedResult) {
    setCopyFeedback("还没有可复制的结果，请先完成测试。", true);
    return;
  }

  const text = buildShareText(lastRenderedResult);

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else if (!copyTextFallback(text)) {
      throw new Error("copy failed");
    }
    setCopyFeedback("已复制结果文案，可以粘贴分享。");
  } catch (error) {
    setCopyFeedback("复制失败，请手动选择页面文字复制。", true);
  }
}

function goNext() {
  if (answers[currentIndex] === null) return;

  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
    return;
  }

  const result = calculateResult();

  if (!hasAskedConfirm && normalizeConfidence(result.confidence) === "low") {
    pendingResult = result;
    showPage("confirm");
    return;
  }

  renderResult(result);
}

function renderResult(result, options = {}) {
  if (!options.fromStorage) {
    saveLastResult(result);
  }

  lastRenderedResult = result;
  showPage("result");

  const type = result.topType;
  const stack = typeStacks[type];
  const confidenceLevel = normalizeConfidence(result.confidence);
  const maxFunctionScore = Math.max(...Object.values(result.functionScores), 1);
  const confidenceLabel = confidenceText[confidenceLevel];

  resultContent.innerHTML = `
    <div class="card result-hero">
      <div class="eyebrow">你的结果</div>
      <div class="type-big">${type}</div>
      <div class="pill ${confidenceLevel === "high" ? "good" : confidenceLevel === "medium" ? "mid" : "warn"}">
        可信度：${confidenceLabel}
      </div>
      <h2>${result.resultPrefix}：${type}</h2>
      <p class="result-subtitle">${typeSummaries[type]}</p>
      <div class="confidence-box">
        <strong>为什么是 ${confidenceLabel} 可信度？</strong>
        <p>${getConfidenceMessage(result)}</p>
      </div>
      ${options.fromStorage ? `<div class="close-alert">这是你上次保存的测试结果。你可以继续参考，也可以重新测试。</div>` : ""}
    </div>

    <div class="card">
      <h3 class="module-title">相似类型</h3>
      <p class="muted result-note">下面是当前得分最接近的前三个类型。分数接近时，请优先比较它们的功能序列，而不是只认第一名。</p>
      <div class="similar-types">
        ${renderSimilarTypes(result.sortedTypes)}
      </div>
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
      <h3 class="module-title">结果解读</h3>
      <div class="explain-grid">
        ${renderExplanationModules(type)}
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
      <p class="muted">本测试不是官方 MBTI，也不是心理诊断。它只是入门级自我观察工具，结果会受当下状态、理解偏差、题目数量影响。建议重点看功能倾向和相似类型，不要把类型当成固定标签。</p>
    </div>

    <div class="card small-note">
      <h3 class="module-title">复制结果文案</h3>
      <p class="muted">可以复制一段简短结果，发给朋友或留作记录。</p>
      <button class="primary-btn restart-bottom" type="button" onclick="copyCurrentResult()">复制我的结果</button>
      <p id="copyResultFeedback" class="copy-feedback"></p>
    </div>

    <div class="nav-row">
      <button class="secondary-btn" onclick="clearLastResult(); startTest();">清除记录并重新测试</button>
      <button class="primary-btn" onclick="restartTest()">重新测试</button>
    </div>
  `;
}
