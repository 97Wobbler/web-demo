const events = [
    {
        id: "perennial_test",
        description:
            "영속회의 신도들이 당신을 발견하고, 신의 시험을 거치라고 강요한다. 그들의 눈빛에는 확신이 서려 있고, 당신은 불쾌한 연극의 조연이 된 기분이다.",
        repeatable: true,
        probability: 15,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.perennial > 30",
                modifier: 0.8,
            },
            {
                condition: "playerState.health < 20",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "카리스마로 시험을 돌파한다.",
                type: "skill",
                difficulty: 20,
                required: {
                    type: "skill",
                    key: "charisma",
                },
                success: {
                    description:
                        "당신은 신도들에게 황홀한 환심을 사며 시험을 통과했다. 그들은 '신의 선택을 받은 자'라며 환호했지만, 당신은 속으로 '다음엔 돈이라도 받자'고 다짐했다.",
                    changes: {
                        relationship: {
                            perennial: 10,
                        },
                        hunger: -5,
                    },
                },
                failure: {
                    description: "당신은 말을 더듬고, 몸짓은 어색했다. 신도들은 실망한 얼굴로 '신도 포기'라는 새 유행어를 만들어버렸다.",
                    changes: {
                        relationship: {
                            perennial: -5,
                        },
                        health: -10,
                    },
                },
            },
            {
                text: "시험을 거부한다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description:
                        "당신은 단호하게 거절했고, 신도들은 고개를 갸웃거리다 어쩔 수 없다는 듯 물러났다. 하지만 그들이 떠나며 '너도 후회할 거야'라는 말이 귓가에 맴돈다.",
                    changes: {},
                },
                failure: {
                    description:
                        "신도들은 당신을 이단자로 몰아세웠고, 당신의 몸을 짓밟으며 신의 심판을 운운했다. 신이 정말 있다면 이런 광경은 절대 보고 싶지 않을 것이다.",
                    changes: {
                        relationship: {
                            perennial: -7,
                        },
                        health: -15,
                    },
                },
            },
            {
                text: "신도들에게서 도망친다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "당신은 숨이 차도록 도망쳤고, 결국 그들을 따돌렸다. 한편으로는 '왜 이런 상황에서 달리기 선수를 못 했지?'라는 생각이 스쳤다.",
                    changes: {
                        hunger: -5,
                    },
                },
                failure: {
                    description:
                        "당신은 뛰다 넘어졌고, 신도들이 이를 기회로 삼아 당신을 모욕하며 떠났다. '신의 시험은 무릎 보호대를 요구하지 않는다'고 하던데, 그 말은 맞는 것 같다.",
                    changes: {
                        health: -10,
                    },
                },
            },
        ],
    },
    {
        id: "perennial_encounter",
        description: "영속회의 신도들이 길목을 막고 당신에게 신의 뜻을 따를 것을 설득하고 있다. 이들의 요구를 어떻게 처리할까?",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.perennial > 20",
                modifier: 0.9,
            },
            {
                condition: "playerState.hunger < 10",
                modifier: 1.3,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "그들의 말을 듣고 신앙을 따르는 척한다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "당신의 연기에 신도들은 기뻐하며 신의 가호가 있기를 기원한다며 떠났다. 그들이 준 건 전혀 신성해 보이지 않는 마른 과일이었다.",
                    changes: {
                        relationship: {
                            perennial: 10,
                        },
                        hunger: 5,
                    },
                },
                failure: {
                    description: "당신의 어설픈 연기에 신도들은 비웃음을 터뜨렸다. '신의 뜻을 속일 순 없지!' 당신은 굴욕감과 함께 신도들의 비호를 잃었다.",
                    changes: {
                        relationship: {
                            perennial: -5,
                        },
                        health: -5,
                    },
                },
            },
            {
                text: "무시하고 지나간다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "당신은 아무 말도 하지 않고 조용히 지나쳤다. 다행히 물리적 충돌은 없었다.",
                    changes: {},
                },
                failure: {
                    description: "신도들이 당신의 태도에 화를 내며 멀리서 돌을 던졌다. 그렇게 아프지는 않았지만 기분이 썩 좋지는 않다.",
                    changes: {
                        relationship: {
                            perennial: -3,
                        },
                        health: -3,
                    },
                },
            },
            {
                text: "그들에게 맞서 설득한다.",
                type: "skill",
                difficulty: 20,
                required: "charisma",
                success: {
                    description: "당신의 논리적이고 카리스마 있는 태도에 신도들은 한동안 침묵했다. 그들은 얼굴을 붉혔으나 결국 아무 말 없이 길을 비켜주었다.",
                    changes: {
                        relationship: {
                            perennial: 5,
                        },
                    },
                },
                failure: {
                    description: "당신의 설득은 그들에게 무의미했다. 그들은 당신을 가증스러운 이단자로 간주하며 떠났다.",
                    changes: {
                        relationship: {
                            perennial: -7,
                        },
                        health: -5,
                    },
                },
            },
        ],
    },
    {
        id: "perennial_prop",
        description: "영속회의가 남긴 선전물을 발견했다. 신성한 문구와 기묘한 상징이 새겨진 전단지이다. 이 기묘한 선전물은 무언가 불안한 기운을 풍긴다.",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.perennial > 10",
                modifier: 0.9,
            },
            {
                condition: "playerState.health < 30",
                modifier: 1.1,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "전단지를 자세히 살펴본다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "전단지에 새겨진 문구가 당신의 마음속 깊은 곳을 찌른다. 어쩌면 이들이 단순한 광신도가 아닐지도 모른다.",
                    changes: {
                        relationship: {
                            perennial: 5,
                        },
                        hunger: -1,
                    },
                },
                failure: {
                    description: "의미를 찾으려다 머리만 복잡해졌다. 불쾌한 기분이 들며 기운이 빠진다.",
                    changes: {
                        hunger: -3,
                        health: -2,
                    },
                },
            },
            {
                text: "전단지를 태워버린다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "전단지가 타들어가며 희미한 냄새를 풍긴다. 그들의 신도들이 이를 알아챌 가능성은 희박하지만, 당신은 한결 홀가분하다.",
                    changes: {
                        relationship: {
                            perennial: -3,
                        },
                    },
                },
                failure: {
                    description: "불을 붙이려던 순간, 전단지에서 갑작스럽게 일렁이는 빛이 당신을 덮친다. 불쾌한 기운만 남았다.",
                    changes: {
                        relationship: {
                            perennial: -5,
                        },
                        health: -5,
                    },
                },
            },
            {
                text: "전단지를 무시하고 지나친다.",
                type: "normal",
                difficulty: 5,
                required: null,
                success: {
                    description: "당신은 그저 지나친다. 그러나 그 기묘한 상징이 머릿속에 남아 맴돈다.",
                    changes: {
                        health: -1,
                    },
                },
                failure: {
                    description: "길을 지나치려 했지만 발이 엉켜 넘어졌다. 단순한 실수였을까?",
                    changes: {
                        health: -3,
                    },
                },
            },
        ],
    },
    {
        id: "perennial_worship",
        description:
            "영속회의 신도들이 초현상을 신성한 대상으로 숭배하고 있다. 그들은 당신에게 무릎을 꿇고 경의를 표하라고 요구한다. 초현상은 주변 공기를 기묘하게 뒤틀며 당신을 압박하는 듯하다.",
        repeatable: true,
        probability: 12,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.perennial > 40",
                modifier: 0.8,
            },
            {
                condition: "playerState.inventory.includes('lab_key')",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "무릎을 꿇고 숭배하는 척한다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description:
                        "신도들은 당신의 경의에 크게 기뻐하며 축복의 기도를 올린다. 축복인지 저주인지 모를 기묘한 느낌이 당신을 스쳐갔지만, 관계는 개선되었다.",
                    changes: {
                        relationship: {
                            perennial: 7,
                        },
                    },
                },
                failure: {
                    description: "당신의 연기는 어설프고 눈에 띄었다. 신도들은 당신에게 불길한 속삭임을 남기며 자리를 떠났다. 기묘한 불안감이 마음을 짓누른다.",
                    changes: {
                        relationship: {
                            perennial: -2,
                        },
                        health: -3,
                    },
                },
            },
            {
                text: "거절하고 자리를 피한다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "당신은 조용히 뒤로 물러나면서 신도들의 시선을 피했다. 그들은 초현상을 바라보며 당신을 더 이상 신경 쓰지 않았다.",
                    changes: {},
                },
                failure: {
                    description: "신도들은 당신의 거절에 분노하며 날카로운 시선을 보냈다. 다행히 물리적 충돌은 없었지만, 어딘가 당신을 지켜보는 느낌이 든다.",
                    changes: {
                        relationship: {
                            perennial: -3,
                        },
                    },
                },
            },
            {
                text: "기현상에 대해 물어본다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description:
                        "신도들은 당신의 질문을 경청하며 신비로운 이야기를 들려주었다. 당신은 기현상에 대한 단서를 얻었지만, 그들의 경계도 한층 느슨해졌다.",
                    changes: {
                        relationship: {
                            perennial: 5,
                        },
                        skills: {
                            add: "insight",
                        },
                    },
                },
                failure: {
                    description: "신도들은 당신의 질문을 의심스럽게 여겼다. 그들의 대답은 흐릿했고, 오히려 당신을 경계하는 듯했다.",
                    changes: {
                        relationship: {
                            perennial: -4,
                        },
                    },
                },
            },
        ],
    },
    {
        id: "perennial_ritual",
        description:
            "영속회의 신도들이 기묘한 의식을 진행하고 있다. 당신은 참여하거나 그들의 '희생양'이 될 것을 강요받는다. 이들은 신의 이름으로 당신을 시험할 준비가 되어 있는 듯 보인다.",
        repeatable: true,
        probability: 15,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.perennial > 50",
                modifier: 0.7,
            },
            {
                condition: "playerState.health < 25",
                modifier: 1.5,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "의식에 참여해 본다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description:
                        "당신은 신도들과 함께 의식에 참여하며 기묘한 춤을 추었다. 이상하게도 다리가 풀릴 정도로 힘들었지만, 그들은 당신을 우호적으로 바라본다. '신의 시험에 통과했다'며 한껏 떠드는 신도들을 보며 헛웃음을 짓는다.",
                    changes: {
                        relationship: {
                            perennial: 10,
                        },
                        hunger: -5,
                    },
                },
                failure: {
                    description:
                        "당신은 의식의 강도에 견디지 못하고 중심을 잃고 쓰러졌다. 신도들은 실망스럽다는 듯 고개를 젓고 당신을 내버려둔 채 떠난다. 몸은 천근만근 무겁고 속도 상한 느낌이다.",
                    changes: {
                        health: -15,
                        relationship: {
                            perennial: -5,
                        },
                        hunger: -3,
                    },
                },
            },
            {
                text: "거부하고 물러선다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "당신은 신도들의 의심스러운 눈초리를 받으며 조용히 물러났다. 한동안 신도들의 흥얼거림이 귓가에 맴돌아 불편했다.",
                    changes: {},
                },
                failure: {
                    description:
                        "신도들은 당신을 '이단자'라 부르며 조롱을 퍼부었다. 몇 명은 돌을 던지기까지 했지만 다행히 큰 피해는 없었다. 이들의 기세를 보며 황급히 자리를 떴다.",
                    changes: {
                        relationship: {
                            perennial: -7,
                        },
                        health: -5,
                    },
                },
            },
            {
                text: "의식을 방해한다.",
                type: "skill",
                difficulty: 25,
                required: "charisma",
                success: {
                    description:
                        "당신은 신도들을 설득해 의식을 중단시켰다. 그야말로 신들린 언변이었다. 우두머리는 당신을 경계하며 조용히 물러났고, 주변 분위기는 묘하게 평온해졌다.",
                    changes: {
                        relationship: {
                            perennial: -10,
                        },
                        hunger: -2,
                    },
                },
                failure: {
                    description: "당신의 시도는 그들의 분노를 샀다. 신도들은 신성 모독이라며 당신에게 달려들었고, 결국 당신은 다친 채로 도망쳐야 했다.",
                    changes: {
                        relationship: {
                            perennial: -15,
                        },
                        health: -10,
                    },
                },
            },
        ],
    },
    {
        id: "raiders_threat",
        description:
            "약탈자들이 당신 앞을 가로막고 자원을 강탈하려 한다. 그들은 불쾌한 웃음을 지으며, 당신의 선택을 조롱하는 듯 보인다. 도망치거나 자원을 내놓지 않으면, 당신을 공격할 태세다.",
        repeatable: true,
        probability: 15,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.raiders > 20",
                modifier: 0.8,
            },
            {
                condition: "playerState.wealth > 30",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "자원을 조금 내주어 상황을 무마한다.",
                type: "wealth",
                difficulty: 10,
                required: {
                    type: "wealth",
                    amount: 10,
                },
                success: {
                    description: "약탈자들은 자원을 받고 만족하며 떠난다. 떠나는 중에 '다음에도 기대하겠다'는 말이 들려왔다. 찝찝하지만 안전하다.",
                    changes: {
                        relationship: {
                            raiders: 8,
                        },
                        wealth: -10,
                    },
                },
                failure: {
                    description: "당신이 내놓은 자원이 부족하다며, 약탈자들은 더 많은 것을 요구했다. 협상은 실패로 끝났고, 추가 자원을 빼앗겼다.",
                    changes: {
                        wealth: -20,
                        relationship: {
                            raiders: -5,
                        },
                    },
                },
            },
            {
                text: "달아난다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "당신은 약탈자들을 따돌리며, 겨우 숨을 돌릴 수 있었다. 폐허 속에서 도망친 기억이 긴 여운으로 남는다.",
                    changes: {},
                },
                failure: {
                    description: "당신은 약탈자들에게 쫓기다 넘어졌다. 체력이 소모되었고, 도망치는 동안 배가 더 고파졌다.",
                    changes: {
                        health: -10,
                        hunger: -5,
                    },
                },
            },
            {
                text: "위협하며 대치한다.",
                type: "skill",
                difficulty: 25,
                required: {
                    type: "skill",
                    key: "intimidation",
                },
                success: {
                    description: "당신의 위협에 약탈자들은 물러섰다. 이들의 리더는 당신을 한동안 지켜보더니, '다음엔 다를 거야'라고 중얼거리며 떠났다.",
                    changes: {
                        relationship: {
                            raiders: -10,
                        },
                    },
                },
                failure: {
                    description: "당신의 위협은 오히려 약탈자들을 웃게 했다. 그들은 비웃으며 당신에게 덤벼들었고, 결국 상처를 입었다.",
                    changes: {
                        health: -15,
                        relationship: {
                            raiders: -5,
                        },
                    },
                },
            },
            {
                text: "기습적으로 공격한다.",
                type: "item",
                required: {
                    type: "item",
                    key: "knife",
                },
                success: {
                    description: "당신은 무기를 꺼냈다. 약탈자들은 당황하며 달아났다. 당신은 무언가를 배운 기분이다.",
                    changes: {
                        relationship: {
                            raiders: -15,
                        },
                        skill: {
                            add: "combat_training",
                        },
                    },
                },
                failure: {
                    description: "기습 공격이 실패로 끝났다. 약탈자들은 당신의 무기를 빼앗고 강력한 타격을 가했다.",
                    changes: {
                        health: -20,
                        relationship: {
                            raiders: -10,
                        },
                        item: {
                            remove: "knife",
                        },
                    },
                },
            },
        ],
    },
    {
        id: "raiders_fight",
        description: "약탈자들이 무기를 들고 습격한다. 전투를 피할 수 없을 것 같다. 그들의 우두머리는 비웃으며 당신의 선택을 기다린다.",
        repeatable: true,
        probability: 12,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.raiders > 30",
                modifier: 0.7,
            },
            {
                condition: "playerState.health < 20",
                modifier: 1.5,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "싸운다.",
                type: "normal",
                difficulty: 25,
                required: null,
                success: {
                    description:
                        "당신은 고군분투 끝에 약탈자들을 물리쳤다. 그들의 무시무시한 우두머리는 상처를 입고 달아났고, 당신은 약간의 전리품을 챙겼다. 숨이 턱 끝까지 차오른다.",
                    changes: {
                        relationship: {
                            raiders: -10,
                        },
                        health: -10,
                        wealth: 10,
                    },
                },
                failure: {
                    description:
                        "약탈자들의 무리 속에서 고립된 당신은 심각한 부상을 입고, 그들이 가져간 재화를 지켜볼 수밖에 없었다. 살아있다는 사실에 안도할 뿐이다.",
                    changes: {
                        health: -20,
                        wealth: -15,
                    },
                },
            },
            {
                text: "도망친다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "당신은 필사적으로 달려 약탈자들의 시야에서 벗어났다. 다만, 주변의 위험한 지형을 빠르게 지나가며 무언가 놓친 기분이 든다.",
                    changes: {
                        health: -5,
                    },
                },
                failure: {
                    description: "당신은 달아나는 도중 발을 헛디뎌 심한 부상을 입고 말았다. 약탈자들은 비웃으며 더 이상 쫓지 않았다.",
                    changes: {
                        health: -15,
                    },
                },
            },
            {
                text: "협상한다.",
                type: "wealth",
                difficulty: 15,
                required: {
                    type: "wealth",
                    amount: 10,
                },
                success: {
                    description:
                        "당신은 그들의 우두머리에게 금화를 내밀며 설득했다. 그는 탐욕스러운 웃음을 짓더니, 무리를 이끌고 물러갔다. 약탈자들과의 관계가 조금은 개선된 것 같다.",
                    changes: {
                        relationship: {
                            raiders: 5,
                        },
                        wealth: -10,
                    },
                },
                failure: {
                    description: "그들은 재화를 빼앗고도 당신을 비웃으며 무기를 들이밀었다. 협상은 실패했고, 체력까지 소모되었다.",
                    changes: {
                        health: -10,
                        wealth: -10,
                    },
                },
            },
        ],
    },
    {
        id: "raiders_deal",
        description:
            "약탈자들이 자원 거래를 제안한다. 당신이 원하는 걸 줄 수도 있지만, 그 대가는 만만치 않다. 약탈자의 우두머리는 가벼운 미소로 당신을 관찰하며 손익 계산을 하고 있는 듯하다.",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.wealth > 20",
                modifier: 0.9,
            },
            {
                condition: "playerState.relationship.raiders > 10",
                modifier: 0.8,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "거래를 수락한다.",
                type: "wealth",
                difficulty: 15,
                required: {
                    type: "wealth",
                    amount: 15,
                },
                success: {
                    description: "약탈자들은 거래를 통해 당신에게 식량과 무언가 '추가적인 것'을 건네주었다. 그들의 의도가 단순하지 않을 수도 있다.",
                    changes: {
                        wealth: -15,
                        hunger: 15,
                        relationship: {
                            raiders: 5,
                        },
                        item: {
                            add: "suspicious_box",
                        },
                    },
                },
                failure: {
                    description: "거래는 사기였다. 약탈자들은 미소를 지으며 당신의 돈을 가져갔다. 서럽다. 배가 고프다.",
                    changes: {
                        wealth: -15,
                        hunger: -5,
                        relationship: {
                            raiders: -5,
                        },
                    },
                },
            },
            {
                text: "거래를 거절하고 돌아선다.",
                type: "normal",
                difficulty: 5,
                required: null,
                success: {
                    description: "당신은 약탈자들과 엮이지 않기로 했다. 그들은 약간 실망한 표정을 지었지만, 특별히 방해하지 않았다.",
                    changes: {},
                },
                failure: {
                    description: "거래를 거절하자, 약탈자들이 비웃으며 당신의 약한 태도를 조롱했다. 그들의 반응이 더 이상 없어 다행이지만, 기분이 좋지는 않다.",
                    changes: {
                        relationship: {
                            raiders: -3,
                        },
                    },
                },
            },
            {
                text: "거래 대신 협박을 시도한다.",
                type: "skill",
                difficulty: 20,
                required: {
                    type: "skill",
                    key: "intimidation",
                },
                success: {
                    description: "당신은 약탈자들을 강력하게 압박했다. 그들은 당신의 위협에 굴복하며 약간의 식량을 제공했다.",
                    changes: {
                        hunger: 10,
                        relationship: {
                            raiders: -10,
                        },
                    },
                },
                failure: {
                    description: "협박은 실패로 끝났다. 약탈자들은 폭소를 터트리며 당신을 구타했다. 아팠다.",
                    changes: {
                        health: -10,
                        relationship: {
                            raiders: -10,
                        },
                    },
                },
            },
        ],
    },
    {
        id: "raiders_hideout",
        description:
            "우연히 약탈자들의 은신처를 발견했다. 어설픈 움직임은 치명적인 결과를 초래할 수 있다. 조심스럽게 접근할까, 무시할까? 아니면 아예 내가 약탈을 해볼까?",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.raiders > 30",
                modifier: 0.7,
            },
            {
                condition: "playerState.hunger < 20",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "조심스럽게 물품을 훔친다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "당신은 약탈자들의 눈을 피해 식량 몇 개를 챙겼다. 하하, 이제 누가 약탈자지?",
                    changes: {
                        hunger: 10,
                        relationship: {
                            raiders: -10,
                        },
                    },
                },
                failure: {
                    description: "들켰다. 당신은 도망치려 했지만, 심한 부상을 입고 물품을 빼앗겼다. 은신처에서 빠져나온 것이 다행일 뿐이다.",
                    changes: {
                        health: -15,
                        relationship: {
                            raiders: -15,
                        },
                    },
                },
            },
            {
                text: "위험을 무릅쓰고 내부를 더 조사한다.",
                type: "skill",
                difficulty: 25,
                required: {
                    type: "skill",
                    key: "stealth",
                },
                success: {
                    description: "은신처 깊숙한 곳에서 약탈자들이 숨겨둔 귀중한 물건을 발견했다. 당신은 빠르게 물건을 챙기고 은신처를 벗어났다.",
                    changes: {
                        wealth: 20,
                        relationship: {
                            raiders: -15,
                        },
                    },
                    item: {
                        add: "hidden_map",
                    },
                },
                failure: {
                    description: "당신은 소리 없이 움직였지만, 약탈자들 중 일부가 이상한 낌새를 눈치챘다. 결국 붙잡혀 심한 부상을 입었다.",
                    changes: {
                        health: -20,
                        relationship: {
                            raiders: -20,
                        },
                    },
                },
            },
            {
                text: "위험하므로 그냥 지나친다.",
                type: "normal",
                difficulty: 5,
                required: null,
                success: {
                    description: "당신은 현명하게 약탈자들과의 충돌을 피하고 다른 길을 찾았다.",
                    changes: {},
                },
                failure: {
                    description: "긴장감 속에서 무사히 지나쳤다. 어쩌면 다음번에는 더 많은 것을 발견할 기회가 있을지 모른다.",
                    changes: {},
                },
            },
        ],
    },
    {
        id: "raiders_trap",
        description:
            "당신은 약탈자들이 놓은 함정에 걸렸다. 녹슨 철사와 기이하게 뒤틀린 나뭇가지가 엉켜있는 이 함정은 평범한 덫 같지만, 어딘가 이상하다. 철사의 끝에는 알 수 없는 발광 물질이 묻어 있다. 당신은 어떻게 벗어날지 고민한다.",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.inventory.includes('lab_key')",
                modifier: 1.1,
            },
            {
                condition: "playerState.health < 15",
                modifier: 1.5,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "함정을 조심스럽게 해체한다.",
                type: "skill",
                difficulty: 23,
                required: {
                    type: "skill",
                    key: "dexterity",
                },
                success: {
                    description: "당신은 함정을 섬세하게 풀어내며 발광 물질을 채취했다. 함정에서 벗어난 후, 이것이 기현상과 연관된 물질임을 직감했다.",
                    changes: {
                        health: -2,
                    },
                    item: {
                        add: "luminescent_residue",
                    },
                },
                failure: {
                    description: "조심스럽게 작업했지만, 철사가 갑자기 팽팽해지며 손을 다쳤다. 함정에서 벗어나긴 했지만, 뭔가를 놓친 기분이다.",
                    changes: {
                        health: -7,
                    },
                },
            },
            {
                text: "함정을 힘으로 찢어버린다.",
                type: "normal",
                difficulty: 18,
                required: null,
                success: {
                    description: "당신은 고통을 참으며 함정을 파괴했다. 다리에 상처가 생겼지만 다행히 움질일 수는 있다.",
                    changes: {
                        health: -5,
                    },
                },
                failure: {
                    description: "탈출을 시도하다 덫이 더욱 조여졌다. 반나절 동안 애쓴 끝에 결국 탈출했지만, 상처가 깊다.",
                    changes: {
                        hunger: -10,
                        health: -15,
                    },
                    nextEventID: "raiders_encounter",
                },
            },
        ],
    },
    {
        id: "military_checkpoint",
        description:
            "저 멀리 군사 세력의 검문소가 보인다. 병사들은 신분 확인을 요구할 것이다. 한 병사는 무전기에서 들려오는 목소리를 듣고 당신을 잠시 응시한다. 기시감이 스쳐 지나간다.",
        repeatable: true,
        probability: 15,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.military > 20",
                modifier: 0.8,
            },
            {
                condition: "playerState.hunger < 10",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "다가가서 군사 세력에게 협조한다.",
                type: "normal",
                difficulty: 12,
                required: null,
                success: {
                    description: "검문이 순조롭게 끝났다. 병사들은 잠시 말을 나누더니, 당신을 통과시킨다.",
                    changes: {
                        relationship: {
                            military: 10,
                        },
                    },
                },
                failure: {
                    description: "병사들은 당신을 의심하며 철저히 수색했다. 결국 약간의 재화를 빼앗기고 나서 지나갈 수 있었다.",
                    changes: {
                        wealth: -10,
                        relationship: {
                            military: -5,
                        },
                    },
                },
            },
            {
                text: "검문소를 피해 우회한다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "당신은 힘겹게 우회했다. 배고픔이 점점 몰려온다. 병사들이 쫓아오진 않았다.",
                    changes: {
                        hunger: -5,
                    },
                },
                failure: {
                    description: "병사들이 쫓아오는 것 같은 느낌에 급하게 이동했다. 급하게 이동하느라 넘어져 다쳤다. 다행히 더 이상 따라오지는 않는 것 같다.",
                    changes: {
                        health: -5,
                        relationship: {
                            military: -3,
                        },
                    },
                },
            },
            {
                text: "병사를 매수한다.",
                type: "wealth",
                difficulty: 22,
                required: {
                    type: "wealth",
                    amount: 15,
                },
                success: {
                    description: "돈의 힘은 강력했다. 병사들은 고개를 끄덕이며 당신을 통과시켰다. 한 병사가 작게 중얼거린다. '다음엔 더 챙겨 오라고.'",
                    changes: {
                        wealth: -15,
                        relationship: {
                            military: 5,
                        },
                    },
                },
                failure: {
                    description: "병사들은 비웃으며 돈을 낚아채 갔다. 검문을 피할 수는 없었다. 괜히 돈만 뺐겼다.",
                    changes: {
                        wealth: -15,
                        relationship: {
                            military: -10,
                        },
                        health: -5,
                    },
                },
            },
            {
                text: "빠르게 돌파한다.",
                type: "skill",
                difficulty: 25,
                required: {
                    type: "skill",
                    key: "speed",
                },
                success: {
                    description: "당신은 병사들을 제압하고 검문소를 벗어났다. 이 소동으로 군사 세력의 관심을 끌어 버린 것 같다.",
                    changes: {
                        relationship: {
                            military: -20,
                        },
                    },
                },
                failure: {
                    description: "병사들에게 제압당했다. 몇 번의 발길질을 당하고 나서 구역밖으로 쫓겨났다.",
                    changes: {
                        relationship: {
                            military: -15,
                        },
                        health: -15,
                    },
                },
            },
        ],
    },
    {
        id: "military_aid",
        description: "길가에서 군사 세력이 멈춰 섰다. 물자 지원을 핑계로 자원을 뜯어낼 것 같다. 거절하면 어떤 일이 벌어질지 확신할 수 없다.",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.wealth > 20",
                modifier: 0.9,
            },
            {
                condition: "playerState.relationship.military > 10",
                modifier: 0.8,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "자원을 내어준다.",
                type: "wealth",
                difficulty: 10,
                required: {
                    type: "wealth",
                    amount: 10,
                },
                success: {
                    description: "군사 세력은 의료품과 식량을 건네줬다. 당신을 믿을 만한 사람으로 본 것 같다.",
                    changes: {
                        wealth: -10,
                        health: 15,
                        hunger: 10,
                        relationship: {
                            military: 10,
                        },
                    },
                },
                failure: {
                    description: "군사들은 재화만 받고 뒤돌아 섰다. '다음엔 더 준비해두라'는 말만 남겼다. 제기랄.",
                    changes: {
                        wealth: -10,
                        relationship: {
                            military: -5,
                        },
                    },
                },
            },
            {
                text: "거부한다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "의외로 군사 세력은 추가 자원을 요구하지 않고 떠났다. 당신은 기분이 찝찝하지만, 어쨌든 무사히 지나쳤다.",
                    changes: {
                        relationship: {
                            military: -2,
                        },
                    },
                },
                failure: {
                    description: "군사들은 거부에 화가 난 듯 당신의 소지품 일부를 강탈했다. 더 이상 일이 커지지 않기를 바라며 그들을 떠나보냈다.",
                    changes: {
                        wealth: -15,
                        relationship: {
                            military: -10,
                        },
                    },
                },
            },
            {
                text: "샛길로 슬쩍 도망간다.",
                type: "skill",
                difficulty: 22,
                required: {
                    type: "skill",
                    key: "stealth",
                },
                success: {
                    description: "당신은 군사 세력을 피하며 다른 길로 돌아갔다. 그들에게 들키지 않아 다행이다.",
                    changes: {},
                },
                failure: {
                    description: "당신의 움직임을 눈치챈 군사 세력에게 붙잡혔다. 결국 자원을 빼앗기고 말았다.",
                    changes: {
                        wealth: -10,
                        relationship: {
                            military: -7,
                        },
                    },
                },
            },
        ],
    },
    {
        id: "military_prop",
        description: "길가에 버려진 군사 세력의 전단지를 발견했다. 표지에는 '생존자는 이곳으로!'라는 문구가 큼지막하게 적혀 있다. 과연 도움이 될까?",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.relationship.military > 20",
                modifier: 0.8,
            },
            {
                condition: "playerState.health < 30",
                modifier: 1.1,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "전단지를 읽는다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "전단지에는 탈출구로 연결되는 군사 대피소의 좌표가 포함되어 있다. 이 정보는 유용해 보인다.",
                    changes: {
                        relationship: {
                            military: 5,
                        },
                        item: {
                            add: "military_coordinates",
                        },
                    },
                },
                failure: {
                    description: "전단지 내용은 대부분 찢기거나 희미해져 있었다. 몇몇 좌표는 적혀 있지만 확신하기 어렵다.",
                    changes: {},
                },
            },
            {
                text: "무시한다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "당신은 전단지를 쳐다보지도 않고 지나쳤다. 하지만 뭔가 놓친 기분이 든다.",
                    changes: {},
                },
                failure: {
                    description: "당신은 별생각 없이 지나쳤지만, 바람에 날린 전단지가 얼굴에 부딪혔다. 이상한 징조일까?",
                    changes: {
                        health: -1,
                    },
                },
            },
            {
                text: "태운다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "전단지는 손쉽게 불에 타버렸다. 어둠 속에서 작은 불빛이 당신의 존재를 알렸을지도 모른다.",
                    changes: {
                        relationship: {
                            military: -5,
                        },
                    },
                },
                failure: {
                    description: "불을 붙였으나 전단지가 젖어 있어 타지 않았다. 괜히 연기만 나서 당신을 불안하게 만들었다.",
                    changes: {
                        hunger: -2,
                    },
                },
            },
        ],
    },
    {
        id: "military_experiment",
        description: "버려진 군사 실험실을 발견했다. 짙은 연무가 가득 차 있어 들어가는 것은 위험해 보인다.",
        repeatable: true,
        probability: 7,
        probabilityModifiers: [
            {
                condition: "playerState.inventory.includes('lab_key')",
                modifier: 2.0,
            },
            {
                condition: "playerState.health < 25",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "실험실에 들어가 물자를 찾아본다.",
                type: "item",
                difficulty: 20,
                required: {
                    type: "item",
                    key: "lab_key",
                },
                success: {
                    description: "실험실 안에서 고급 의료 키트를 발견했다. 그러나 독성 물질에 잠시 노출되어 허기를 느꼈다.",
                    changes: {
                        health: 10,
                        hunger: -5,
                    },
                },
                failure: {
                    description: "유독 가스에 심하게 노출되어 체력이 크게 감소했다. 물자는 찾지 못했다.",
                    changes: {
                        health: -15,
                    },
                },
            },
            {
                text: "위험해 보인다. 밖으로 나간다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "신중한 선택이었다. 안전하게 빠져나왔다. 하지만 더 많은 자원을 탐색할 기회를 놓쳤다.",
                    changes: {},
                },
                failure: {
                    description: "아무런 사건 없이 떠났지만, 발을 헛디뎌 허기를 소모했다.",
                    changes: {
                        hunger: -3,
                    },
                },
            },
            {
                text: "주변을 수색해본다.",
                type: "normal",
                difficulty: 23,
                required: null,
                success: {
                    description: "운 좋게 근처에서 방독면을 발견했다. 이제 실험실을 안전하게 탐색할 수 있을 것 같다.",
                    changes: {
                        item: {
                            add: "gas_mask",
                        },
                    },
                    nextEventID: null, // To be updated
                },
                failure: {
                    description: "주변을 탐색했지만 도움될 만한 것을 찾지 못했다. 다른 곳으로 이동했다.",
                    changes: {},
                },
            },
        ],
    },
    {
        id: "exploration",
        description: "폐허가 된 건물을 탐색한다. 유용한 물품이 있을 수도, 함정이 있을 수도 있다.",
        repeatable: true,
        probability: 15,
        probabilityModifiers: [
            {
                condition: "playerState.hunger < 20",
                modifier: 1.1,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "건물 내부를 수색한다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description:
                        "쓰레기 더미 속에서 식량을 발견했다. 맛은 없어 보이지만, 허기진 배를 달래기엔 충분했다. 아, 현대 요리의 정수란 바로 이 감칠맛일까?",
                    changes: {
                        hunger: 10,
                    },
                },
                failure: {
                    description: "쓰레기 더미를 뒤지다 날카로운 금속 조각에 손을 다쳤다. 벽에 쓰인 낙서가 눈에 들어온다. '고통은 곧 살아있음의 증거라.'",
                    changes: {
                        health: -5,
                    },
                },
            },
            {
                text: "대충 살펴보고 나간다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "건물을 대충 훑어봤지만, 별다른 소득 없이 떠났다.",
                    changes: {},
                },
                failure: {
                    description: "허둥대다 복잡한 폐허의 구조에 발이 걸려 넘어졌다. 먼지가 자욱한 곳에서 괜히 체력만 낭비했다.",
                    changes: {
                        health: -3,
                    },
                },
            },
            {
                text: "건물 주변을 수색한다.",
                type: "normal",
                difficulty: 24,
                required: null,
                success: {
                    description: "지하실 입구를 발견했다. 문을 뜯고 들어가니 금고가 있다. 재화와 함께 누군가의 일기장이 들어 있었다.",
                    changes: {
                        wealth: 15,
                    },
                    item: {
                        add: "old_diary",
                    },
                },
                failure: {
                    description: "지하실 입구를 발견했다. 문을 뜯고 들어가던 중 계단이 무너져 내렸다. 간신히 탈출했지만, 당신의 몸은 이미 만신창이다.",
                    changes: {
                        health: -10,
                    },
                },
            },
        ],
    },
    {
        id: "resource_gain",
        description: "황량한 거리 한복판에 버려진 상자를 발견했다. 여기까지 살아남은 당신의 경험상, 이런 곳에서의 발견은 선물이 아닐 가능성이 크다. 살펴볼까?",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.hunger < 30",
                modifier: 1.1,
            },
            {
                condition: "playerState.wealth < 30",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "상자를 열어본다.",
                type: "normal",
                difficulty: 17,
                required: null,
                success: {
                    description:
                        "상자를 열자, 안에는 예상치 못한 식량과 약간의 재화가 있었다. 그러나 상자 한쪽에는 이상한 마크가 새겨져 있었다. 이곳에 누군가가 있었다는 뜻일까?",
                    changes: {
                        hunger: 7,
                        wealth: 10,
                    },
                },
                failure: {
                    description: "상자 안에는 아무것도 없었다. 실망스러운 발견을 뒤로 하고 돌아서는 순간, 날카로운 상자 모서리에 손을 다쳤다. 재수가 없으려니.",
                    changes: {
                        health: -3,
                    },
                },
            },
            {
                text: "의심스러우니 그냥 지나친다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "당신은 신중한 판단을 내렸고, 예상대로 아무 일도 없었다. 그러나 발걸음을 옮길 때도 여전히 상자가 신경 쓰였다.",
                    changes: {},
                },
                failure: {
                    description: "그냥 지나쳤지만, 갑작스러운 발목 통증에 잠시 멈춰야 했다. 황량한 환경은 당신에게도 점점 부담이 되고 있다.",
                    changes: {
                        health: -1,
                    },
                },
            },
        ],
    },
    {
        id: "status_effect",
        description: "독성 안개가 느릿느릿 몰려온다. 목구멍이 따가워지고 시야가 흐려진다. 이 상태로 오래 버티는 것은 위험해 보인다.",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.health < 20",
                modifier: 1.2,
            },
            {
                condition: "playerState.inventory.includes('gas_mask')",
                modifier: 0.9,
            },
        ],
        requiredEvents: [],

        choices: [
            {
                text: "입과 코를 막고 최대한 빨리 빠져나간다.",
                type: "normal",
                difficulty: 23,
                required: null,
                success: {
                    description: "안개를 피해 큰 피해 없이 지나갔다. 목이 칼칼하긴 하지만 살아있는 게 중요하다.",
                    changes: {
                        health: -1,
                    },
                },
                failure: {
                    description: "안개를 피하려다 길을 잃었다. 결국 노출되어 체력이 감소했다.",
                    changes: {
                        health: -13,
                    },
                },
            },
            {
                text: "가스 마스크를 착용한다.",
                type: "item",
                difficulty: 20,
                required: {
                    type: "item",
                    key: "gas_mask",
                },
                success: {
                    description: "가스 마스크 덕분에 안개를 무사히 통과했다.",
                    changes: {},
                },
                failure: {
                    description: "가스 마스크의 필터가 오래되어 효과가 충분하지 않았다. 체력이 감소했지만, 최악은 피했다.",
                    changes: {
                        health: -5,
                    },
                },
            },
        ],
    },
    {
        id: "recovery",
        description:
            "폐허 속에서 비교적 안전해 보이는 구석을 발견했다. 휴식을 취해 체력을 회복할 수 있을까? 그러나, 기현상의 영향으로 완전한 안전을 보장할 수는 없다.",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.health < 30",
                modifier: 1.3,
            },
            {
                condition: "playerState.hunger < 20",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],
        nextEventID: null,
        choices: [
            {
                text: "휴식을 취한다.",
                type: "normal",
                difficulty: 17,
                required: null,
                success: {
                    description: "잠시 동안이나마 기현상이 멀리 떨어진 것 같았다. 당신은 조용히 체력을 회복했다.",
                    changes: {
                        health: 10,
                        hunger: -3,
                    },
                },
                failure: {
                    description:
                        "휴식을 취하던 도중, 환각에 휩싸였다. 불편한 꿈 속에서 괴물이 당신을 따라다녔고, 잠에서 깨자마자 고통스러운 피로감이 밀려왔다.",
                    changes: {
                        health: -5,
                        hunger: -5,
                    },
                },
            },
            {
                text: "휴식을 포기하고 이동한다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "더 나은 곳을 찾아 이동을 지속했다. 안전하지 않은 공간에서 시간을 낭비하지 않았다.",
                    changes: {
                        hunger: -1,
                    },
                },
                failure: {
                    description: "이동 중 기진맥진해졌다. 체력이 조금 감소했다.",
                    changes: {
                        health: -3,
                        hunger: -2,
                    },
                },
            },
            {
                text: "공간을 조사하여 위험을 제거하고 휴식한다.",
                type: "skill",
                difficulty: 23,
                required: {
                    type: "skill",
                    key: "observation",
                },
                success: {
                    description: "철저히 공간을 조사한 결과, 위험 요소가 없는 것을 확인했다. 안전하게 휴식을 취하며 체력을 회복했다.",
                    changes: {
                        health: 15,
                        hunger: -4,
                    },
                },
                failure: {
                    description: "조사를 마쳤다고 생각하고 쉬기 시작했지만, 기현상의 영향인지 갑자기 정신이 혼란스러워졌다. 오히려 불안감이 증폭되었다.",
                    changes: {
                        health: -5,
                        hunger: -3,
                    },
                },
            },
        ],
    },
    {
        id: "weather_anomaly",
        description:
            "하늘이 불길하게 물들고 강렬한 폭풍우가 몰아친다. 전자기적 방해로 번개가 기이한 패턴을 그리며 하늘을 가른다. 당신은 이 현상이 단순한 폭풍이 아님을 직감한다.",
        repeatable: true,
        probability: 12,
        probabilityModifiers: [
            {
                condition: "playerState.hunger < 20",
                modifier: 1.1,
            },
            {
                condition: "playerState.health < 20",
                modifier: 1.2,
            },
        ],
        requiredEvents: [],
        nextEventID: null,
        choices: [
            {
                text: "안전한 은신처를 찾는다.",
                type: "normal",
                difficulty: 18,
                required: null,
                success: {
                    description:
                        "당신은 은신처를 발견해 폭풍우의 충격을 피할 수 있었다. 하지만 전자기적 간섭으로 머리가 어지럽다. 기현상이 당신에게 무엇인가를 암시하는 듯하다.",
                    changes: {
                        health: -2,
                    },
                },
                failure: {
                    description: "은신처를 찾으려 애썼지만, 강한 번개에 노출되어 더 큰 위험에 처했다. 역시 이 폭풍은 단순한 자연재해가 아니다.",
                    changes: {
                        health: -10,
                    },
                },
            },
            {
                text: "폭풍우 속을 강행 돌파한다.",
                type: "normal",
                difficulty: 23,
                required: null,
                success: {
                    description: "기적적으로 돌파했다. 하지만 폭풍우 속에서 기괴한 환각을 경험했다. 스트레스 때문일까?",
                    changes: {
                        health: -5,
                    },
                },
                failure: {
                    description: "폭풍우의 맹렬한 기세에 휘말렸다. 당신은 방향 감각을 잃었고, 몸 곳곳에 부상을 입었다.",
                    changes: {
                        health: -15,
                    },
                },
            },
        ],
    },
    {
        id: "physical_distortion",
        description:
            "공간이 찢겨져 뒤틀린 듯한 느낌이 든다. 발밑은 끝없이 가라앉는 것 같고, 벽은 끈적하게 얽힌 채로 일그러져 있다. 기현상이 당신을 시험하는 듯하다.",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.health < 20",
                modifier: 1.5,
            },
            {
                condition: "playerState.wealth > 20",
                modifier: 0.8,
            },
        ],
        requiredEvents: [],
        nextEventID: null,
        choices: [
            {
                text: "왜곡 구역을 조심스럽게 통과한다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "당신은 신중히 발걸음을 옮겨, 왜곡의 중심에서 벗어날 수 있었다. 하지만 몸이 여전히 떨리고 있다.",
                    changes: {
                        health: -2,
                    },
                },
                failure: {
                    description: "공간의 압력이 당신을 짓눌렀다. 체력이 크게 소모되었고, 당신은 더 이상 이곳에 머물고 싶지 않다.",
                    changes: {
                        health: -10,
                    },
                },
            },
            {
                text: "우회로를 찾는다.",
                type: "normal",
                difficulty: 12,
                required: null,
                success: {
                    description: "시간은 조금 더 걸렸지만, 안전한 길을 찾아 기현상을 피해갈 수 있었다.",
                    changes: {
                        hunger: -3,
                    },
                },
                failure: {
                    description: "길을 찾는 데 시간이 너무 오래 걸렸다. 허기가 크게 늘어나 버렸다.",
                    changes: {
                        hunger: -7,
                    },
                },
            },
            {
                text: "돌진한다.",
                type: "skill",
                difficulty: 25,
                required: {
                    type: "skill",
                    key: "bravery",
                },
                success: {
                    description: "당신은 왜곡 속으로 과감히 뛰어들었다. 다친 곳이 없다.",
                    changes: {},
                },
                failure: {
                    description: "과감한 행동이 독이 되었다. 압력이 당신을 무너뜨렸고, 몸 상태가 심각하게 악화되었다.",
                    changes: {
                        health: -15,
                    },
                },
            },
        ],
    },
    {
        id: "unknown_entity",
        description: "시야에 포착되는 것은 없지만 기묘한 기분이 든다. 마치 무언가 당신을 지켜보고 있는 듯한 느낌이다.",
        repeatable: true,
        probability: 8,
        probabilityModifiers: [
            {
                condition: "playerState.health < 20",
                modifier: 1.2,
            },
            {
                condition: "playerState.hunger < 20",
                modifier: 1.1,
            },
        ],
        choices: [
            {
                text: "조용히 주변을 경계하며 이동한다.",
                type: "normal",
                difficulty: 20,
                required: null,
                success: {
                    description: "긴장의 끈을 놓지 않으며 천천히 나아갔다. 존재는 더 이상 느껴지지 않는다. 하지만 이 감각은 오래도록 남아 있을 것 같다.",
                    changes: {},
                },
                failure: {
                    description: "긴장한 나머지 발을 헛디뎌 체력을 소모했다. 존재가 멀어진 것 같긴 하지만, 아직도 등 뒤가 싸늘하다.",
                    changes: {
                        health: -5,
                    },
                },
            },
            {
                text: "뛴다.",
                type: "normal",
                difficulty: 12,
                required: null,
                success: {
                    description: "한숨 돌릴 새도 없이 달아났다. 이상한 존재는 쫓아오지 않았다. 아직 안전하다.",
                    changes: {},
                },
                failure: {
                    description: "서둘러 달리다 절벽에서 굴러 큰 부상을 입었다. 존재의 기척은 사라졌지만, 당신의 불안은 그렇지 않다.",
                    changes: {
                        health: -15,
                    },
                },
            },
        ],
    },
    {
        id: "area_movement",
        description: "새로운 지역으로 이동 중이다. 길이 보이지 않아 어디로 향하는지 알 수 없다. 곳곳에 파괴된 구조물과 불안정한 지형이 위험을 암시한다.",
        repeatable: true,
        probability: 10,
        probabilityModifiers: [
            {
                condition: "playerState.hunger < 20",
                modifier: 1.2,
            },
            {
                condition: "playerState.health < 20",
                modifier: 1.1,
            },
        ],
        choices: [
            {
                text: "조심스럽게 살펴보며 이동한다.",
                type: "normal",
                difficulty: 12,
                required: null,
                success: {
                    description: "주위를 세심히 관찰하며 이동했다. 위험을 피하며 새로운 지역에 도착했다.",
                    changes: {},
                },
                failure: {
                    description: "돌무더기를 피하려다 허기를 소모했다. 안전하지만 지쳐버렸다.",
                    changes: {
                        hunger: -3,
                    },
                },
            },
            {
                text: "속도를 높여 빠르게 이동한다.",
                type: "normal",
                difficulty: 15,
                required: null,
                success: {
                    description: "빠르게 이동하며 위험을 피했다. 새로운 지역에 도착했다.",
                    changes: {},
                },
                failure: {
                    description: "서두르다 발을 헛디뎌 다쳤다. 목적지에 도달했지만, 대가가 컸다.",
                    changes: {
                        health: -5,
                    },
                },
            },
            {
                text: "근처에서 쉬며 상황을 관찰한다.",
                type: "normal",
                difficulty: 10,
                required: null,
                success: {
                    description: "잠시 대기하며 길을 확인했다. 조금의 허기를 소모했지만, 안전하게 이동했다.",
                    changes: {
                        hunger: -2,
                    },
                },
                failure: {
                    description: "대기 중에도 불안감이 커져 허기가 더 심해졌다.",
                    changes: {
                        hunger: -4,
                    },
                },
            },
        ],
    },
];
