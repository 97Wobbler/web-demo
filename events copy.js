[
    {
        id: "mysterious_scream",
        description: "어둠이 깔린 폐허 거리에서 날카로운 비명이 울려 퍼진다. 인근의 버려진 건물인 것 같다. 주변은 지나치게 고요하다.",
        probability: 20,
        probabilityModifiers: [
            { condition: "playerState.health < 50", modifier: 1.3 },
            { condition: "playerState.relationship.military > 30", modifier: 2.0 },
        ],
        repeatable: false,
        choices: [
            {
                text: "소리를 따라 건물 안으로 들어간다.",
                type: "normal",
                difficulty: 17,
                success: {
                    description: "2층에서 덜덜 떨고 있는 생존자를 발견했다. 이 불쌍한 녀석은 고맙다며 식량을 나눠줬다.",
                    changes: {
                        hunger: 5,
                        relationship: { military: 5 },
                    },
                    nextEventID: "survivor_conversation_1",
                },
                failure: {
                    description: "건물 안은 어둡고 위험했다. 발을 헛디뎌 계단을 굴렀다. 비명은 사라지고, 결국 얻은 것은 고통뿐이다.",
                    changes: {
                        health: -10,
                        hunger: -5,
                    },
                },
            },
            {
                text: "소리를 무시하고 다른 길을 찾는다.",
                type: "normal",
                difficulty: 10,
                success: {
                    description: "소리를 무시하고 조용히 다른 길로 빠진다. 별 일 없이 한숨 돌릴 수 있어 다행이긴 하다.",
                    changes: {},
                },
                failure: {
                    description: "소리를 무시하고 가던 중 뒤통수를 맞는다. 뒤에서 몰래 접근한 약탈자들이다.",
                    changes: {
                        health: -20,
                        relationship: { raiders: -10 },
                    },
                    nextEventID: "raider_ambush",
                },
            },
            {
                text: "근처에서 주위를 염탐한다.",
                type: "skill",
                difficulty: 21,
                required: { type: "skill", key: "observation" },
                success: {
                    description: "조심스럽게 주변을 살폈다. 1층에 누군가 있다. 지금 당장 덤벼들 힘은 없어 보인다.",
                    changes: {},
                    nextEventID: "survivor_safe_entry",
                },
                failure: {
                    description:
                        "몰래 엿보다 창문 너머에서 무언가 튀어나왔다. 놀란 나머지 허기가 급격히 몰려온다. 쥐였을까? 쥐가 저렇게 컸나? 괜히 시간만 낭비했다.",
                    changes: {
                        hunger: -7,
                    },
                },
            },
        ],
    },
    {
        id: "survivor_conversation_1",
        description: "생존자는 낙오된 군인이었다. 그가 떠나기 전, 주변에는 약탈자들이 어슬렁거린다고 했다. 그 말이 사실이라면 귀찮은 일이 될 수 있다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "생존자와 근처 검문소까지 동행한다.",
                type: "normal",
                difficulty: 10,
                success: {
                    description: "함께 근처 검문소로 갔다. 그들은 약간의 물자를 건네며 신세를 갚는다.",
                    changes: {
                        wealth: 10,
                        relationship: { military: 10 },
                    },
                },
                failure: {
                    description: "함께 근처 검문소로 갔다. 별다른 보상은 없었다. 은혜도 모르는 놈들!",
                    changes: { relationship: { military: 10 } },
                },
            },
            {
                text: "군대와 엮일 수 없다. 배웅하지 않는다.",
                type: "normal",
                difficulty: 20,
                success: {
                    description: "낙오된 병사를 혼자 보냈다. 나는 여기서 조금 더 쉬다가 가기로 했다.",
                    changes: { health: 5 },
                },
                failure: {
                    description: "낙오된 병사를 혼자 보내고, 혼자 쉬기로 했다. 한참 자고 있다가 눈을 뜨니 약탈자들이 당신을 둘러싸고 있다.",
                    changes: {},
                    nextEventID: "raider_ambush",
                },
            },
        ],
    },
    {
        id: "raider_scouting",
        description: "약탈자들이 모여 지도를 보고 있다. 뭘 꾸미는지 모르지만, 영 달갑지 않아 보인다.",
        probability: 20,
        probabilityModifiers: [{ condition: "playerState.relationship.raiders < -10", modifier: 1.5 }],
        repeatable: false,
        choices: [
            {
                text: "좀 더 가까이 다가가 대화를 엿듣는다.",
                type: "skill",
                difficulty: 18,
                required: { type: "skill", key: "stealth" },
                success: {
                    description: "약탈자들이 어딘가를 약탈할 계획을 세우는 것을 알아낸다. 쓸 만한 정보일지도 모른다.",
                    changes: {},
                    nextEventID: "hidden_cache_location",
                },
                failure: {
                    description: "엿보다 들켜버렸다. 허둥지둥 도망치느라 허기가 심해진다. 쓸데없는 짓이었다.",
                    changes: {
                        hunger: -7,
                        relationship: { raiders: -5 },
                    },
                },
            },
            {
                text: "멀리서 그들의 동선만 기록하고 물러난다.",
                type: "normal",
                difficulty: 12,
                success: {
                    description: "그들의 움직임을 적당히 파악했다. 나중에 써먹을 기회가 있을지 누가 알겠나.",
                    changes: {},
                },
                failure: {
                    description: "멀리서 훔쳐보는데도 눈치챈 건가? 약탈자들이 이 쪽을 힐끗 보더니 다가온다. 도망갔다.",
                    changes: {},
                },
            },
        ],
    },
    {
        id: "hidden_cache_location",
        description: "약탈자들의 계획을 좇아 도착한 곳은 낡은 창고다. 여기에 뭔가 숨겨져 있을지 모르겠다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "창고를 탐색한다.",
                type: "normal",
                difficulty: 18,
                success: {
                    description: "창고 안에서 유용한 보급품을 찾았다. 이걸로 목숨을 조금 더 부지할 수 있으려나.",
                    changes: { wealth: 10 },
                },
                failure: {
                    description: "창고 안을 뒤져봤지만 허탕이다. 이 창고가 아니었나? 시간만 허비했다.",
                    changes: {
                        hunger: -5,
                    },
                },
            },
            {
                text: "창고 주변을 먼저 조사한다.",
                type: "skill",
                difficulty: 22,
                required: { type: "skill", key: "perception" },
                success: {
                    description: "멀리서 약탈자들이 오는 것을 봤다. 아무래도 도망가야 할 것 같다.",
                    changes: {},
                },
                failure: {
                    description: "약탈자들과 마주쳤다. 조금만 더 빨리 올 걸!",
                    changes: {},
                    nextEventID: "raider_retaliation",
                },
            },
        ],
    },
    {
        id: "raider_retaliation",
        description: "약탈자들은 물러날 기세가 아니다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "싸움을 준비한다.",
                type: "skill",
                difficulty: 22,
                required: { type: "skill", key: "combat" },
                success: {
                    description: "약탈자들을 제압하고 그들의 물자를 털어낸다. 호락호락하지 않다는 걸 보여줬다. 하하, 이제 누가 약탈자지?",
                    changes: {
                        wealth: 5,
                        hunger: 5,
                        relationship: { raiders: -10 },
                    },
                },
                failure: {
                    description: "수적 열세로 당해낼 수 없다. 가까스로 도망치지만 크게 다쳤다.",
                    changes: {
                        health: -15,
                    },
                },
            },
            {
                text: "자연스럽게 지나친다.",
                type: "skill",
                difficulty: 22,
                required: {
                    type: "skill",
                    key: "persuasion",
                },
                success: {
                    description: "약탈자들이 나를 수상하게 여기지만, 물리적 충돌은 피했다. 만세!",
                    changes: {
                        relationship: { raiders: -5 },
                    },
                },
                failure: {
                    description: "지나가던 시민인 척 연기했지만, 약탈자들은 나를 붙잡아 공격했다. 너덜너덜해져서 도망쳤다.",
                    changes: {
                        health: -15,
                        relationship: { raiders: -10 },
                    },
                },
            },
        ],
    },
    {
        id: "survivor_safe_entry",
        description: "1층에 있던 사람은 겁먹은 생존자였다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "물자를 좀 주고 도와준다.",
                type: "wealth",
                difficulty: 13,
                required: { type: "wealth", amount: 5 },
                success: {
                    description: "생존자는 고맙다며 근처 폐허에 군사 세력이 숨긴 보급품 이야기를 꺼낸다. 딱히 믿을지는 모르겠다만 시도해볼 만하다.",
                    changes: { wealth: -5 },
                    nextEventID: "military_supply_rumor",
                },
                failure: {
                    description: "생존자는 겁에 질려 말을 제대로 못한다. 시덥잖구만! 생존자를 두고 떠났다.",
                    changes: { wealth: -5 },
                },
            },
            {
                text: "생존자를 내버려두고 떠난다.",
                type: "normal",
                difficulty: 10,
                success: {
                    description: "생존자를 남기고 조용히 건물을 빠져나온다. 이게 더 속 편할지도.",
                    changes: {},
                },
                failure: {
                    description: "떠나려다 허름한 잔해에 걸려 넘어지고 부상을 입었다. 벌 받는 건가?",
                    changes: { health: -5 },
                },
            },
        ],
    },
    {
        id: "military_supply_rumor",
        description: "생존자의 말대로라면 이 근처 어딘가에 군사 보급품이 숨겨져 있다는데, 헛걸음일 수도 있다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "보급품을 찾는다.",
                type: "skill",
                difficulty: 18,
                required: { type: "skill", key: "observation" },
                success: {
                    description: "보급품 상자를 찾아냈다. 이게 당장 큰 도움이 될지 모르나, 나쁠 건 없다.",
                    changes: { wealth: 5, hunger: 5 },
                },
                failure: {
                    description: "빈손이다. 누군가 이미 쓸 만한 것들을 가져간 모양이다. 허탕 쳤군. 배가 고파졌다.",
                    changes: { hunger: -2 },
                },
            },
            {
                text: "위험해 보인다. 그냥 간다.",
                type: "normal",
                difficulty: 12,
                success: {
                    description: "현명한 선택이었다. 멀리서 무장한 군인들이 순찰을 돌고 있었다.",
                    changes: {},
                },
                failure: {
                    description: "배가 조금 고프다.",
                    changes: { hunger: -2 },
                },
            },
        ],
    },
    {
        id: "raider_ambush",
        description: "약탈자들이 매복해 당신을 기다리고 있었다. 호락호락한 상황은 아닌 듯하다.",
        probability: 0,
        repeatable: false,
        choices: [
            {
                text: "싸운다.",
                type: "skill",
                difficulty: 25,
                required: { type: "skill", key: "combat" },
                success: {
                    description: "약탈자들을 쓰러뜨리고 전리품을 챙긴다. 덕분에 약탈자들의 기분은 더 나빠지겠지만 신경 쓸 여유는 없다.",
                    changes: {
                        wealth: 10,
                        hunger: 5,
                        relationship: { raiders: -10 },
                    },
                },
                failure: {
                    description: "넘어서는 안 될 벽에 부딪힌 기분이다. 패배하고 도망쳤다.",
                    changes: { health: -20 },
                },
            },
            {
                text: "도망친다.",
                type: "normal",
                difficulty: 15,
                success: {
                    description: "간신히 약탈자들을 따돌린다. 허기를 좀 더 깎아 먹었지만 목숨은 붙어 있다.",
                    changes: { hunger: -5 },
                },
                failure: {
                    description: "도망치다 붙잡히고 말았다. 약탈자들에게 물자를 빼앗겼다.",
                    changes: {
                        wealth: -20,
                        relationship: { raiders: -5 },
                    },
                },
            },
        ],
    },
];
