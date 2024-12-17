let playerState = {
    health: 50,
    hunger: 50,
    wealth: 50,
    relationship: {
        perennial: 0,
        military: 0,
        raiders: 0,
    },
    inventory: [],
    skills: [],
};

let currentEventID = null;
let nextEventID = "start_1";
let eventHistory = [];
let eventCount = 0;

let dice = [null, null, null, null, null];
let locked = [false, false, false, false, false]; // 고정 상태 관리
let rollsRemaining = 0;

let choice;
let choiceIndex;
let obtainSkillList = [];

let typingTimeout;
let skipTyping = false;

function startGame() {
    restartGame();
}

function loadEvent(index) {
    const event = events[index];
    currentEventID = event.id;
    eventHistory.push(currentEventID);

    const gameText = event.description.replaceAll(/(! |\. |\? )/g, (match) => `${match[0]}<br>`);
    setGameText(gameText);

    hideDiceUI();
    showChoiceUI();

    obtainSkillList = [];

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    event.choices.forEach((choiceObj, index) => {
        const button = createChoiceButton(choiceObj, index);
        choicesDiv.appendChild(button);
    });

    updateButtonsState();
}

function setGameText(text) {
    const gameTextElement = document.getElementById("gameText");
    let index = 0;
    const cleanText = text.replace(/<br>/g, "\n");
    let finalText = "";

    gameTextElement.innerHTML = "";
    skipTyping = false;

    function typeCharacter() {
        if (skipTyping) {
            gameTextElement.innerText = cleanText;
            clearTimeout(typingTimeout);
            typingTimeout = null;
            return;
        }

        if (index >= cleanText.length) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
            return;
        }

        finalText += cleanText[index] === "\n" ? "<br>" : cleanText[index];
        gameTextElement.innerHTML = finalText;
        index++;
        typingTimeout = setTimeout(typeCharacter, 35);
    }

    typeCharacter();
}

function skipGameTextAnimation() {
    skipTyping = true;
}

function createChoiceButton(choiceObj, index) {
    const button = document.createElement("button");

    let buttonHTML = choiceObj.text;

    switch (choiceObj.type) {
        case "normal":
        case "skill":
        case "wealth":
            buttonHTML += ` (난이도: ${choiceObj.difficulty})`;
            break;
        case "item":
        case "obtain-skill":
            break;
    }

    switch (choiceObj.type) {
        case "normal":
            break;
        case "skill":
            const skillKey = choiceObj.required.key;
            const skill = skills.find((skill) => skill.id === skillKey);
            if (skill) {
                const skillName = skill.name;
                const hasSkill = playerState.skills.includes(skillKey);

                if (hasSkill) {
                    buttonHTML = `<span class="green">${skillName} </span>${buttonHTML}`;
                } else {
                    buttonHTML = `<span class="red">${skillName} </span>${buttonHTML}`;
                }
            }
            break;
        case "wealth":
            const amount = choiceObj.required.amount;
            const hasEnoughMoney = playerState.wealth >= amount;

            if (hasEnoughMoney) {
                buttonHTML = `<span class="green">재화 ${amount} </span>${buttonHTML}`;
            } else {
                buttonHTML = `<span class="red">재화 ${amount} </span>${buttonHTML}`;
                button.disabled = true;
            }
            break;
        case "item":
            {
                const itemKey = choiceObj.required.key;
                const item = items.find((item) => item.id === itemKey);
                if (item) {
                    const itemName = item.name;
                    const hasItem = playerState.inventory.includes(itemKey);

                    if (hasItem) {
                        buttonHTML = `<span class="green">${itemName} </span>${buttonHTML}`;
                    } else {
                        buttonHTML = `<span class="red">${itemName} </span>${buttonHTML}`;
                        button.disabled = true;
                    }
                }
            }
            break;
        case "obtain-skill":
            {
                const skillID = choiceObj.success.changes.skill.add;
                const isRandom = skillID === "__random__";
                if (isRandom) {
                    const randomSkill = skills[Math.floor(skills.length * Math.random())];
                    const randomSkillID = randomSkill.id;
                    buttonHTML = randomSkill.name;
                    obtainSkillList.push(randomSkillID);
                } else {
                    const skill = skills.find((skill) => skill.id === skillID);
                    buttonHTML = skill.name;
                    obtainSkillList.push(skillID);
                }
            }
            break;
    }

    button.innerHTML = buttonHTML;

    button.onclick = () => {
        choice = choiceObj;
        choiceIndex = index;

        skipGameTextAnimation();
        initDice();
        showDiceUI();
        hideChoiceUI();

        if (choice.type === "item" || choice.type === "obtain-skill") {
            finalizeResult();
        }
    };
    return button;
}

function showDiceUI() {
    document.getElementById("diceUI").style.display = "flex";
}

function hideDiceUI() {
    document.getElementById("diceUI").style.display = "none";
}

function showChoiceUI() {
    document.getElementById("choicesContainer").style.display = "flex";
}

function hideChoiceUI() {
    document.getElementById("choicesContainer").style.display = "none";
}

function loadRandomEvent() {
    updateDynamicProbability();

    const validEvents = events.filter((event) => {
        const hasOccurred = eventHistory.includes(event.id);
        const requirementsMet = event.requiredEvents ? event.requiredEvents.every((req) => eventHistory.includes(req)) : true;
        return (!event.prevEvent || event.prevEvent === currentEventID) && (event.repeatable || !hasOccurred) && requirementsMet;
    });

    const totalProbability = validEvents.reduce((sum, event) => sum + (event.dynamicProbability || 0), 0);
    if (totalProbability <= 0) {
        console.error("No valid event found. Check event configuration.");
        return;
    }

    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (let event of validEvents) {
        cumulativeProbability += event.dynamicProbability || 0;
        if (randomValue <= cumulativeProbability) {
            loadEvent(events.indexOf(event));
            return;
        }
    }

    console.error("No valid event found after probability check.");
}

function updateDynamicProbability() {
    for (const event of events) {
        event.dynamicProbability = event.probability;

        if (eventHistory[eventHistory.length - 1] === event.id) {
            event.probability = 0.1;
            continue;
        }

        if (event.probabilityModifiers) {
            for (const modifier of event.probabilityModifiers) {
                if (evaluateCondition(modifier.condition)) {
                    event.dynamicProbability *= modifier.modifier;
                }
            }
        }
    }
}

function evaluateCondition(condition) {
    try {
        return Function(`"use strict"; return (${condition})`).call({ playerState });
    } catch (e) {
        console.error(`Failed to evaluate condition: ${condition}`, e);
        return false;
    }
}

function rollDice() {
    if (rollsRemaining > 0) {
        rollsRemaining--;
        dice = dice.map((value, index) => {
            return locked[index] ? (value === null ? Math.floor(Math.random() * 6) + 1 : value) : Math.floor(Math.random() * 6) + 1;
        });
        updateDiceUI();
        updateButtonsState();
    }
}

function finalizeResult() {
    hideDiceUI();
    showChoiceUI();

    let success = false;

    if (choice.type === "item") {
        const itemKey = choice.required.key;
        const hasItem = playerState.inventory.includes(itemKey);
        success = hasItem;
    } else if (choice.type === "obtain-skill") {
        success = true;
    } else {
        const sum = dice.reduce((a, b) => (b === null ? a : a + b), 0);
        success = sum >= choice.difficulty;
    }

    const result = success ? choice.success : choice.failure;
    const gameText = result.description ? result.description.replaceAll(/(! |\. |\? )/g, (match) => `${match[0]}<br>`) : "";
    setGameText(gameText);

    const isGameOver = updateState(result.changes);
    if (isGameOver) return;

    nextEventID = result.nextEventID || null;

    if (choice.type === "obtain-skill") {
        loadNextEvent();
        return;
    }

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    const button = document.createElement("button");
    button.innerText = "다음";

    button.onclick = () => {
        if (typingTimeout) {
            skipGameTextAnimation();
        } else {
            loadNextEvent();
        }
    };

    choicesDiv.appendChild(button);
}

function loadNextEvent() {
    eventCount++;
    document.getElementById("turnCount").innerText = eventCount;

    if (nextEventID) {
        const nextEvent = events.find((event) => event.id === nextEventID);
        const nextEventIndex = events.indexOf(nextEvent);

        if (nextEvent) {
            loadEvent(nextEventIndex);
            nextEventID = null;
            return;
        }
    }

    loadRandomEvent();
}

function updateState(changes) {
    if (!changes) return;

    if (changes.health !== undefined) {
        playerState.health += changes.health;
        if (playerState.health > 50) playerState.health = 50;
        if (playerState.health < 0) playerState.health = 0;
    }

    if (changes.wealth !== undefined) {
        playerState.wealth += changes.wealth;
        if (playerState.wealth > 50) playerState.wealth = 50;
        if (playerState.wealth < 0) playerState.wealth = 0;
    }

    if (changes.hunger !== undefined) {
        playerState.hunger += changes.hunger;
        if (playerState.hunger > 50) playerState.hunger = 50;
        if (playerState.hunger < 0) playerState.hunger = 0;
    }

    if (changes.relationship) {
        for (const key in changes.relationship) {
            if (playerState.relationship[key] !== undefined) {
                playerState.relationship[key] += changes.relationship[key];
            }
        }
    }

    if (changes.skill) {
        if (changes.skill.add) {
            if (changes.skill.add === "__random__") {
                const selectedSkillID = obtainSkillList[choiceIndex];
                const alreadyHasSkill = playerState.skills.includes(selectedSkillID);
                if (!alreadyHasSkill) playerState.skills.push(selectedSkillID);
            } else {
                const alreadyHasSkill = playerState.skills.includes(changes.skill.add);
                if (!alreadyHasSkill) playerState.skills.push(changes.skill.add);
            }
        }
        if (changes.skill.remove) {
            const skillIndex = playerState.skills.indexOf(changes.skill.remove);
            if (skillIndex !== -1) playerState.skills.splice(skillIndex, 1);
        }
    }

    if (changes.item) {
        if (changes.item.add) {
            const alreadyHasItem = playerState.inventory.includes(changes.item.add);
            if (!alreadyHasItem) playerState.inventory.push(changes.item.add);
        }
        if (changes.item.remove) {
            const itemIndex = playerState.inventory.indexOf(changes.item.remove);
            if (itemIndex !== -1) playerState.inventory.splice(itemIndex, 1);
        }
    }

    updateStatus(changes);
    return checkGameOver();
}

function updateStatus(changes) {
    if (!changes) return;

    for (const key of ["health", "hunger", "wealth"]) {
        if (changes[key]) {
            const textElement = document.getElementById(key);
            textElement.classList.remove(["highlight-green", "hightlight-red"]);
            void textElement.offsetWidth; // Reinforce reflow

            const animationClassName = changes[key] > 0 ? "highlight-green" : changes[key] < 0 ? "highlight-red" : null;
            if (animationClassName) textElement.classList.add(animationClassName);
            textElement.innerText = playerState[key];
        }
    }
}

function checkGameOver() {
    if (playerState.health <= 0) {
        const gameText = "체력이 0이 되어 게임이 종료되었습니다.";
        setGameText(gameText);

        const restartButton = document.createElement("button");
        restartButton.innerText = "다시 시작";
        restartButton.onclick = restartGame;

        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = "";
        choicesDiv.appendChild(restartButton);

        return true;
    }
    return false;
}

function restartGame() {
    playerState = {
        health: 50,
        hunger: 50,
        wealth: 50,
        relationship: {
            perennial: 0,
            military: 0,
            raiders: 0,
        },
        inventory: ["map"],
        skills: [],
    };

    currentEventID = null;
    nextEventID = "start_1";
    eventHistory = [];
    eventCount = 0;
    updateStatus();
    loadNextEvent();
}

function initDice() {
    dice = [null, null, null, null, null];
    locked = [false, false, false, false, false];

    switch (choice.type) {
        case "normal":
            rollsRemaining = 1;
            break;
        case "skill":
            const skillKey = choice.required.key;
            const hasSkill = playerState.skills.includes(skillKey);
            rollsRemaining = hasSkill ? 3 : 1;
            break;
        case "wealth":
            const amount = choice.required.amount;
            const hasEnoughMoney = playerState.wealth >= amount;
            rollsRemaining = hasEnoughMoney ? 3 : 0;
            break;
        case "item":
            break;
    }
    updateDiceUI();
    updateButtonsState();
}

function diceSymbol(value) {
    switch (value) {
        case 1:
            return "⚀";
        case 2:
            return "⚁";
        case 3:
            return "⚂";
        case 4:
            return "⚃";
        case 5:
            return "⚄";
        case 6:
            return "⚅";
        default:
            return "";
    }
}

function updateDiceUI() {
    const finalizeResultButton = document.getElementById("finalizeResult");
    finalizeResultButton.disabled = dice.some((value) => value === null);

    const choiceText = document.getElementById("choice-text");
    choiceText.innerText = `선택: ${choice.text}`;

    const difficultyText = document.getElementById("choice-difficulty");
    difficultyText.innerText = `난이도: ${choice.difficulty}`;

    const diceSumText = document.getElementById("dice-sum");
    diceSumText.innerText = `합계: ${dice.reduce((a, b) => (b === null ? a : a + b), 0)}`;

    const rollChanceText = document.getElementById("dice-roll-chance");
    rollChanceText.innerText = `남은 굴리기 횟수: ${rollsRemaining}`;

    const diceContainer = document.getElementById("diceContainer");
    diceContainer.innerHTML = "";
    dice.forEach((value, index) => {
        const diceDiv = document.createElement("div");
        diceDiv.className = "dice";
        diceDiv.innerText = value === null ? "" : diceSymbol(value);

        if (locked[index]) {
            diceDiv.classList.add("locked");
        }

        diceDiv.onclick = () => toggleLock(index);

        if (rollsRemaining === 3) {
            diceDiv.style.cursor = "not-allowed";
        }
        diceContainer.appendChild(diceDiv);
    });
}

function toggleLock(index) {
    // yacht dice 룰 관련 scoreConfirmed 등 제거
    // 단순히 굴릴 수 있는 상황에서 lock/unlock 가능
    if (rollsRemaining < 3 && rollsRemaining > 0) {
        const diceDiv = document.querySelectorAll(".dice")[index];
        const lockedCount = locked.filter((v) => v).length;
        if (locked[index]) {
            locked[index] = false;
            diceDiv.classList.remove("locked");
        } else {
            if (lockedCount < 4) {
                locked[index] = true;
                diceDiv.classList.add("locked");
            }
        }
        updateButtonsState();
    }
}

function updateButtonsState() {
    const rollButton = document.getElementById("rollButton");
    if (!rollButton) return;

    const diceDivs = document.querySelectorAll(".dice");
    const allLocked = Array.from(diceDivs).every((d, i) => locked[i]);

    rollButton.disabled = rollsRemaining > 0 && !allLocked ? false : true;
}
