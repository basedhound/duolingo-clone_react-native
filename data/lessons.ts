import type { Lesson } from '@/types/learning';

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SPANISH
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'es-lesson-1',
    unitId: 'es-unit-1',
    title: 'Greetings & Farewells',
    description: 'Learn the most essential Spanish greetings for any time of day',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Say hello and goodbye in Spanish',
      'Use the right greeting for the time of day',
      'Pronounce key greetings correctly',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential greetings',
        items: [
          {
            word: 'Hola',
            translation: 'Hello',
            pronunciation: '/ˈo.la/',
            example: 'Hola, ¿cómo estás?',
            exampleTranslation: 'Hello, how are you?',
          },
          {
            word: 'Buenos días',
            translation: 'Good morning',
            pronunciation: '/ˈbwe.nos ˈdi.as/',
            example: 'Buenos días, señor García.',
            exampleTranslation: 'Good morning, Mr. García.',
          },
          {
            word: 'Buenas tardes',
            translation: 'Good afternoon',
            pronunciation: '/ˈbwe.nas ˈtar.des/',
            example: 'Buenas tardes a todos.',
            exampleTranslation: 'Good afternoon, everyone.',
          },
          {
            word: 'Buenas noches',
            translation: 'Good evening / Good night',
            pronunciation: '/ˈbwe.nas ˈno.tʃes/',
            example: 'Buenas noches, hasta mañana.',
            exampleTranslation: 'Good night, see you tomorrow.',
          },
          {
            word: 'Adiós',
            translation: 'Goodbye',
            pronunciation: '/a.ˈðjos/',
            example: 'Adiós, cuídate mucho.',
            exampleTranslation: 'Goodbye, take care.',
          },
          {
            word: 'Hasta luego',
            translation: 'See you later',
            pronunciation: '/ˈas.ta ˈlwe.ɣo/',
            example: 'Hasta luego, amigo.',
            exampleTranslation: 'See you later, friend.',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Good morning!',
        targetPhrase: 'Buenos días',
        acceptedAnswers: ['Buenos días', '¡Buenos días!', 'buenos días'],
        hint: 'Think about the time of day',
      },
    ],
  },

  {
    id: 'es-lesson-2',
    unitId: 'es-unit-1',
    title: 'Common Phrases',
    description: 'The phrases every Spanish beginner needs to know',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Introduce yourself by name',
      'Ask someone how they are',
      'Say please and thank you',
      'Ask for help or directions',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these everyday phrases',
        phrases: [
          {
            phrase: '¿Cómo te llamas?',
            translation: 'What is your name?',
            pronunciation: '/ˈko.mo te ˈʝa.mas/',
            context: 'Use this to ask someone\'s name in an informal setting',
          },
          {
            phrase: 'Me llamo...',
            translation: 'My name is...',
            pronunciation: '/me ˈʝa.mo/',
            context: 'Follow this with your name to introduce yourself',
          },
          {
            phrase: '¿Cómo estás?',
            translation: 'How are you?',
            pronunciation: '/ˈko.mo esˈtas/',
            context: 'Casual way to ask how someone is doing',
          },
          {
            phrase: 'Estoy bien, gracias.',
            translation: 'I am fine, thank you.',
            pronunciation: '/esˈtoj ˈbjen ˈɡɾa.sjas/',
            context: 'A polite response when someone asks how you are',
          },
          {
            phrase: 'Por favor',
            translation: 'Please',
            pronunciation: '/poɾ fa.ˈβoɾ/',
            context: 'Add this to any request to be polite',
          },
          {
            phrase: 'Gracias',
            translation: 'Thank you',
            pronunciation: '/ˈɡɾa.sjas/',
            context: 'Express gratitude in any situation',
          },
          {
            phrase: 'De nada',
            translation: 'You\'re welcome',
            pronunciation: '/de ˈna.ða/',
            context: 'Reply when someone thanks you',
          },
          {
            phrase: '¿Hablas inglés?',
            translation: 'Do you speak English?',
            pronunciation: '/ˈa.βlas iŋˈɡles/',
            context: 'Ask if someone speaks English when you need help',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'What is your name?',
        targetPhrase: '¿Cómo te llamas?',
        acceptedAnswers: ['¿Cómo te llamas?', 'Como te llamas', '¿Como te llamas?'],
        hint: 'This is a question — include the question marks if you can!',
      },
    ],
  },

  {
    id: 'es-lesson-3',
    unitId: 'es-unit-1',
    title: 'Practice with Your AI Teacher',
    description: 'Have a real conversation with your personal Spanish teacher',
    type: 'ai_teacher',
    xpReward: 20,
    durationMinutes: 10,
    goals: [
      'Practice greetings in a live conversation',
      'Introduce yourself in Spanish',
      'Build confidence speaking aloud',
    ],
    activities: [],
    aiTeacher: {
      systemPrompt: `You are Sofia, a warm and encouraging Spanish teacher from Madrid. You have been teaching beginners for over ten years and you love seeing students make their first steps in Spanish. Your teaching style is patient, fun, and practical. You celebrate small wins, gently correct mistakes, and always keep energy high. You speak at a slow, clear pace and repeat key phrases when needed. You explain tricky concepts in English but always bring students back to speaking Spanish.`,
      lessonContext: `This is the student's very first Spanish lesson. They have just studied basic greetings and common phrases. Your job is to help them practice those phrases in a natural, encouraging conversation. Start by greeting them in Spanish, then guide them through a short self-introduction exercise. Correct pronunciation gently and keep the session to around 10 minutes.`,
      topicsToCover: [
        'Greet the student and explain what you will practice today',
        'Model a greeting and ask the student to repeat',
        'Walk through a self-introduction: name, where they are from',
        'Practice asking and answering ¿Cómo estás?',
        'Review please and thank you in context',
        'Close with encouragement and a preview of the next lesson',
      ],
      exampleExchanges: [
        {
          teacher: '¡Hola! Buenos días. I\'m Sofia, your Spanish teacher. How are you feeling today?',
          student: 'I\'m good, but a little nervous.',
        },
        {
          teacher: 'That\'s totally normal! Let\'s start with something easy. Repeat after me: Hola.',
          student: 'Hola.',
        },
        {
          teacher: 'Perfecto! Now let\'s try introducing yourself. Say: Me llamo... and add your name.',
          student: 'Me llamo Alex.',
        },
        {
          teacher: '¡Excelente! Alex, that was perfect. Now I will ask you — ¿Cómo estás?',
          student: 'Estoy bien, gracias.',
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'fr-lesson-1',
    unitId: 'fr-unit-1',
    title: 'Greetings & Farewells',
    description: 'Learn the most essential French greetings for any time of day',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Say hello and goodbye in French',
      'Use the right greeting for the time of day',
      'Pronounce key greetings correctly',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential greetings',
        items: [
          {
            word: 'Bonjour',
            translation: 'Hello / Good day',
            pronunciation: '/bɔ̃.ʒuʁ/',
            example: 'Bonjour, comment ça va?',
            exampleTranslation: 'Hello, how are you?',
          },
          {
            word: 'Bonsoir',
            translation: 'Good evening',
            pronunciation: '/bɔ̃.swaʁ/',
            example: 'Bonsoir, madame.',
            exampleTranslation: 'Good evening, ma\'am.',
          },
          {
            word: 'Salut',
            translation: 'Hi / Bye (informal)',
            pronunciation: '/sa.ly/',
            example: 'Salut, ça va?',
            exampleTranslation: 'Hey, how\'s it going?',
          },
          {
            word: 'Au revoir',
            translation: 'Goodbye',
            pronunciation: '/o ʁə.vwaʁ/',
            example: 'Au revoir, à bientôt.',
            exampleTranslation: 'Goodbye, see you soon.',
          },
          {
            word: 'À bientôt',
            translation: 'See you soon',
            pronunciation: '/a bjɛ̃.to/',
            example: 'Au revoir! À bientôt.',
            exampleTranslation: 'Goodbye! See you soon.',
          },
          {
            word: 'Bonne nuit',
            translation: 'Good night',
            pronunciation: '/bɔn nɥi/',
            example: 'Bonne nuit, dors bien.',
            exampleTranslation: 'Good night, sleep well.',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Good evening!',
        targetPhrase: 'Bonsoir',
        acceptedAnswers: ['Bonsoir', 'bonsoir', 'Bonsoir!'],
        hint: 'This greeting is used after the sun goes down',
      },
    ],
  },

  {
    id: 'fr-lesson-2',
    unitId: 'fr-unit-1',
    title: 'Common Phrases',
    description: 'The phrases every French beginner needs to know',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Introduce yourself in French',
      'Ask and answer how you are',
      'Use please, thank you, and excuse me',
      'Ask if someone speaks English',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these everyday phrases',
        phrases: [
          {
            phrase: 'Comment vous appelez-vous?',
            translation: 'What is your name? (formal)',
            pronunciation: '/kɔ.mɑ̃ vu za.plə.vu/',
            context: 'Use this in formal or professional situations',
          },
          {
            phrase: 'Je m\'appelle...',
            translation: 'My name is...',
            pronunciation: '/ʒə ma.pɛl/',
            context: 'Follow with your name when introducing yourself',
          },
          {
            phrase: 'Comment allez-vous?',
            translation: 'How are you? (formal)',
            pronunciation: '/kɔ.mɑ̃ a.le.vu/',
            context: 'Polite way to ask how someone is doing',
          },
          {
            phrase: 'Très bien, merci.',
            translation: 'Very well, thank you.',
            pronunciation: '/tʁɛ bjɛ̃ mɛʁ.si/',
            context: 'A polite response when asked how you are',
          },
          {
            phrase: 'S\'il vous plaît',
            translation: 'Please (formal)',
            pronunciation: '/sil vu plɛ/',
            context: 'Add to any request in a formal context',
          },
          {
            phrase: 'Merci beaucoup',
            translation: 'Thank you very much',
            pronunciation: '/mɛʁ.si bo.ku/',
            context: 'Express deeper gratitude',
          },
          {
            phrase: 'Excusez-moi',
            translation: 'Excuse me',
            pronunciation: '/ɛk.sky.ze mwa/',
            context: 'Use to get attention or apologize politely',
          },
          {
            phrase: 'Parlez-vous anglais?',
            translation: 'Do you speak English?',
            pronunciation: '/paʁ.le vu ɑ̃.ɡlɛ/',
            context: 'Ask if someone speaks English when you need help',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My name is...',
        targetPhrase: 'Je m\'appelle...',
        acceptedAnswers: ['Je m\'appelle', 'Je m\'appelle...', 'je m\'appelle'],
        hint: 'Literally: "I call myself"',
      },
    ],
  },

  {
    id: 'fr-lesson-3',
    unitId: 'fr-unit-1',
    title: 'Practice with Your AI Teacher',
    description: 'Have a real conversation with your personal French teacher',
    type: 'ai_teacher',
    xpReward: 20,
    durationMinutes: 10,
    goals: [
      'Practice greetings in a live conversation',
      'Introduce yourself in French',
      'Build confidence speaking aloud',
    ],
    activities: [],
    aiTeacher: {
      systemPrompt: `You are Camille, a charming and patient French teacher from Paris. You have a passion for sharing the beauty of the French language with beginners. Your teaching style blends encouragement with gentle correction. You speak clearly and at a deliberate pace, repeat key phrases naturally, and explain grammar points in plain English before returning to French. You make every student feel capable and motivated.`,
      lessonContext: `This is the student's first French lesson. They have studied basic greetings and common phrases. Guide them through a natural conversation practising those phrases. Begin with a warm greeting, lead a short introduction exercise, and practise asking and answering how they are. Keep the session around 10 minutes and end with encouragement.`,
      topicsToCover: [
        'Open with a French greeting and introduce yourself',
        'Model the greeting and ask the student to repeat',
        'Guide a self-introduction: name and where they are from',
        'Practice Comment allez-vous? and a polite response',
        'Use s\'il vous plaît and merci naturally in context',
        'Close with positive feedback and a preview of next steps',
      ],
      exampleExchanges: [
        {
          teacher: 'Bonjour! Je m\'appelle Camille, votre professeure de français. How are you today?',
          student: 'I\'m excited but nervous.',
        },
        {
          teacher: 'Don\'t worry, we will take it step by step. Repeat after me: Bonjour.',
          student: 'Bonjour.',
        },
        {
          teacher: 'Parfait! Now let\'s try introducing yourself. Say: Je m\'appelle... then your name.',
          student: 'Je m\'appelle Alex.',
        },
        {
          teacher: 'Excellent! Now I will ask you — Comment allez-vous?',
          student: 'Très bien, merci.',
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // JAPANESE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ja-lesson-1',
    unitId: 'ja-unit-1',
    title: 'Greetings & Farewells',
    description: 'Learn essential Japanese greetings for every time of day',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Say hello and goodbye in Japanese',
      'Use the appropriate greeting for morning, afternoon, and evening',
      'Understand when to bow and when greetings are used',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential greetings',
        items: [
          {
            word: 'こんにちは',
            translation: 'Hello / Good afternoon',
            pronunciation: 'Konnichiwa /kon.ni.chi.wa/',
            example: 'こんにちは、お元気ですか？',
            exampleTranslation: 'Hello, how are you?',
          },
          {
            word: 'おはようございます',
            translation: 'Good morning (formal)',
            pronunciation: 'Ohayou gozaimasu /o.ha.yo go.za.i.ma.su/',
            example: 'おはようございます、先生。',
            exampleTranslation: 'Good morning, teacher.',
          },
          {
            word: 'おはよう',
            translation: 'Good morning (casual)',
            pronunciation: 'Ohayou /o.ha.yo/',
            example: 'おはよう！今日もよろしく。',
            exampleTranslation: 'Good morning! Nice to see you today.',
          },
          {
            word: 'こんばんは',
            translation: 'Good evening',
            pronunciation: 'Konbanwa /kon.ban.wa/',
            example: 'こんばんは、お疲れ様です。',
            exampleTranslation: 'Good evening, you must be tired.',
          },
          {
            word: 'さようなら',
            translation: 'Goodbye (formal)',
            pronunciation: 'Sayounara /sa.yo.na.ra/',
            example: 'さようなら、またね。',
            exampleTranslation: 'Goodbye, see you again.',
          },
          {
            word: 'またね',
            translation: 'See you / Bye (casual)',
            pronunciation: 'Mata ne /ma.ta.ne/',
            example: 'じゃあ、またね！',
            exampleTranslation: 'Okay, see you!',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Good morning (formal)',
        targetPhrase: 'おはようございます',
        acceptedAnswers: ['おはようございます', 'Ohayou gozaimasu', 'ohayou gozaimasu'],
        hint: 'Use the longer, more formal version',
      },
    ],
  },

  {
    id: 'ja-lesson-2',
    unitId: 'ja-unit-1',
    title: 'Common Phrases',
    description: 'Polite expressions every Japanese learner needs first',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Introduce yourself in Japanese',
      'Ask and answer how you are',
      'Use please and thank you politely',
      'Ask for help in Japanese',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these everyday phrases',
        phrases: [
          {
            phrase: 'お名前は？',
            translation: 'What is your name?',
            pronunciation: 'Onamae wa? /o.na.ma.e wa/',
            context: 'A polite way to ask someone\'s name',
          },
          {
            phrase: '私の名前は…です。',
            translation: 'My name is...',
            pronunciation: 'Watashi no namae wa...desu. /wa.ta.shi no na.ma.e wa...de.su/',
            context: 'The standard way to state your name formally',
          },
          {
            phrase: 'お元気ですか？',
            translation: 'How are you?',
            pronunciation: 'Ogenki desu ka? /o.gen.ki de.su ka/',
            context: 'A polite and common way to ask how someone is',
          },
          {
            phrase: '元気です、ありがとう。',
            translation: 'I\'m fine, thank you.',
            pronunciation: 'Genki desu, arigatou. /gen.ki de.su a.ri.ga.to/',
            context: 'A natural response when asked how you are',
          },
          {
            phrase: 'ありがとうございます',
            translation: 'Thank you very much',
            pronunciation: 'Arigatou gozaimasu /a.ri.ga.to go.za.i.ma.su/',
            context: 'Formal thank you — use this in most situations',
          },
          {
            phrase: 'すみません',
            translation: 'Excuse me / I\'m sorry',
            pronunciation: 'Sumimasen /su.mi.ma.sen/',
            context: 'Use to get attention, apologize, or squeeze past someone',
          },
          {
            phrase: 'わかりません',
            translation: 'I don\'t understand',
            pronunciation: 'Wakarimasen /wa.ka.ri.ma.sen/',
            context: 'Say this when you need someone to repeat or simplify',
          },
          {
            phrase: '英語を話せますか？',
            translation: 'Do you speak English?',
            pronunciation: 'Eigo wo hanasemasu ka? /e.i.go wo ha.na.se.ma.su ka/',
            context: 'Ask if someone speaks English when you need help',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Thank you very much',
        targetPhrase: 'ありがとうございます',
        acceptedAnswers: ['ありがとうございます', 'Arigatou gozaimasu', 'arigatou gozaimasu', 'ありがとう'],
        hint: 'Use the formal version with ございます',
      },
    ],
  },

  {
    id: 'ja-lesson-3',
    unitId: 'ja-unit-1',
    title: 'Practice with Your AI Teacher',
    description: 'Have a real conversation with your personal Japanese teacher',
    type: 'ai_teacher',
    xpReward: 20,
    durationMinutes: 10,
    goals: [
      'Practice Japanese greetings in a real conversation',
      'Introduce yourself in Japanese',
      'Get comfortable with the sounds of Japanese',
    ],
    activities: [],
    aiTeacher: {
      systemPrompt: `You are Yuki, a kind and enthusiastic Japanese teacher from Tokyo. You have years of experience teaching beginners and you understand how daunting Japanese can feel at first. Your teaching style is calm, supportive, and structured. You break things into small steps, praise effort generously, explain cultural context briefly, and repeat key phrases naturally in conversation. You use English to explain concepts but always return to Japanese practice.`,
      lessonContext: `This is the student's first Japanese lesson. They have studied basic greetings and polite expressions. Help them practice those phrases in a friendly, natural conversation. Open with a Japanese greeting, lead a self-introduction exercise, practice the polite forms of thank you and excuse me, and close with encouragement and a cultural tip about bowing.`,
      topicsToCover: [
        'Open with a Japanese greeting and introduce yourself as their teacher',
        'Explain briefly that Japanese has formal and casual levels',
        'Model a greeting and ask the student to repeat',
        'Practice self-introduction: name and where they are from',
        'Practice Ogenki desu ka and a polite response',
        'Introduce sumimasen and arigatou gozaimasu in context',
        'Share a quick cultural note about greetings and bowing',
        'Close with encouragement and a preview of hiragana basics',
      ],
      exampleExchanges: [
        {
          teacher: 'こんにちは！I\'m Yuki, your Japanese teacher. How are you feeling today?',
          student: 'A little nervous. Japanese looks so different.',
        },
        {
          teacher: 'That\'s very normal. Let\'s start with the basics. Repeat after me: こんにちは.',
          student: 'Konnichiwa.',
        },
        {
          teacher: 'Great! Now let\'s try introducing yourself. Say: 私の名前は... then your name... です.',
          student: '私の名前は Alex です。',
        },
        {
          teacher: 'Wonderful! Now I\'ll ask you — お元気ですか？',
          student: '元気です、ありがとう。',
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GERMAN
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'de-lesson-1',
    unitId: 'de-unit-1',
    title: 'Greetings & Farewells',
    description: 'Learn the most essential German greetings for any time of day',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Say hello and goodbye in German',
      'Use the right greeting for the time of day',
      'Understand formal vs. casual greetings',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential greetings',
        items: [
          {
            word: 'Hallo',
            translation: 'Hello',
            pronunciation: '/ˈha.lo/',
            example: 'Hallo, wie geht es dir?',
            exampleTranslation: 'Hello, how are you?',
          },
          {
            word: 'Guten Morgen',
            translation: 'Good morning',
            pronunciation: '/ˈɡuː.tən ˈmɔʁ.ɡən/',
            example: 'Guten Morgen, schlafen Sie gut?',
            exampleTranslation: 'Good morning, did you sleep well?',
          },
          {
            word: 'Guten Tag',
            translation: 'Good day / Hello (formal)',
            pronunciation: '/ˈɡuː.tən taːk/',
            example: 'Guten Tag, wie kann ich helfen?',
            exampleTranslation: 'Good day, how can I help?',
          },
          {
            word: 'Guten Abend',
            translation: 'Good evening',
            pronunciation: '/ˈɡuː.tən ˈaː.bənt/',
            example: 'Guten Abend, schön Sie zu sehen.',
            exampleTranslation: 'Good evening, nice to see you.',
          },
          {
            word: 'Auf Wiedersehen',
            translation: 'Goodbye (formal)',
            pronunciation: '/aʊf ˈviː.dɐ.zeː.ən/',
            example: 'Auf Wiedersehen, bis nächste Woche.',
            exampleTranslation: 'Goodbye, until next week.',
          },
          {
            word: 'Tschüss',
            translation: 'Bye (informal)',
            pronunciation: '/tʃʏs/',
            example: 'Okay, tschüss! Bis morgen.',
            exampleTranslation: 'Okay, bye! See you tomorrow.',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Good morning!',
        targetPhrase: 'Guten Morgen',
        acceptedAnswers: ['Guten Morgen', 'guten morgen', 'Guten Morgen!'],
        hint: 'Two words — think about when the sun rises',
      },
    ],
  },

  {
    id: 'de-lesson-2',
    unitId: 'de-unit-1',
    title: 'Common Phrases',
    description: 'The phrases every German beginner needs to know',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Introduce yourself in German',
      'Ask and answer how you are',
      'Use please and thank you',
      'Ask if someone speaks English',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these everyday phrases',
        phrases: [
          {
            phrase: 'Wie heißen Sie?',
            translation: 'What is your name? (formal)',
            pronunciation: '/viː ˈhaɪ.sən ziː/',
            context: 'Use this in formal or professional situations',
          },
          {
            phrase: 'Ich heiße...',
            translation: 'My name is...',
            pronunciation: '/ɪç ˈhaɪ.sə/',
            context: 'Follow with your name to introduce yourself',
          },
          {
            phrase: 'Wie geht es Ihnen?',
            translation: 'How are you? (formal)',
            pronunciation: '/viː ɡeːt ɛs ˈiː.nən/',
            context: 'Polite formal way to ask how someone is doing',
          },
          {
            phrase: 'Mir geht es gut, danke.',
            translation: 'I\'m doing well, thank you.',
            pronunciation: '/miːɐ̯ ɡeːt ɛs ɡuːt ˈdaŋ.kə/',
            context: 'A polite and common response when asked how you are',
          },
          {
            phrase: 'Bitte',
            translation: 'Please / You\'re welcome',
            pronunciation: '/ˈbɪ.tə/',
            context: 'Use as "please" in a request, or "you\'re welcome" as a reply',
          },
          {
            phrase: 'Danke schön',
            translation: 'Thank you very much',
            pronunciation: '/ˈdaŋ.kə ʃøːn/',
            context: 'Express sincere gratitude in any situation',
          },
          {
            phrase: 'Entschuldigung',
            translation: 'Excuse me / Sorry',
            pronunciation: '/ɛntˈʃʊl.dɪ.ɡʊŋ/',
            context: 'Use to get attention, apologize, or get past someone',
          },
          {
            phrase: 'Sprechen Sie Englisch?',
            translation: 'Do you speak English?',
            pronunciation: '/ˈʃpʁɛ.çən ziː ˈɛŋ.lɪʃ/',
            context: 'Ask if someone speaks English when you need help',
          },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My name is...',
        targetPhrase: 'Ich heiße...',
        acceptedAnswers: ['Ich heiße', 'Ich heiße...', 'ich heiße'],
        hint: 'Literally: "I am called..."',
      },
    ],
  },

  {
    id: 'de-lesson-3',
    unitId: 'de-unit-1',
    title: 'Practice with Your AI Teacher',
    description: 'Have a real conversation with your personal German teacher',
    type: 'ai_teacher',
    xpReward: 20,
    durationMinutes: 10,
    goals: [
      'Practice German greetings in a live conversation',
      'Introduce yourself in German',
      'Build confidence with German pronunciation',
    ],
    activities: [],
    aiTeacher: {
      systemPrompt: `You are Lukas, a friendly and precise German teacher from Berlin. You have a talent for making German feel accessible to beginners who often find it intimidating. Your teaching style is structured yet relaxed — you give clear explanations, model phrases naturally, and celebrate every bit of progress. You gently correct pronunciation, especially the sounds that English speakers find tricky like ü, ö, and the ch sound. You explain grammar rules simply and always bring students back to speaking.`,
      lessonContext: `This is the student's first German lesson. They have studied basic greetings and common phrases. Guide them through a natural conversation practicing those phrases. Start with a warm greeting, lead a short introduction, practice Wie geht es Ihnen and a polite response, and close with a tip about German pronunciation. Keep the session around 10 minutes.`,
      topicsToCover: [
        'Open with a German greeting and introduce yourself as the teacher',
        'Explain that German has formal (Sie) and informal (du) forms',
        'Model a greeting and ask the student to repeat',
        'Guide a self-introduction: Ich heiße... and where they are from',
        'Practice Wie geht es Ihnen? and Mir geht es gut, danke.',
        'Use Bitte and Danke schön naturally in the conversation',
        'Give a quick tip on German pronunciation (ch sound or umlaut)',
        'Close with encouragement and a preview of the next lesson',
      ],
      exampleExchanges: [
        {
          teacher: 'Hallo! Ich bin Lukas, dein Deutschlehrer. How are you today?',
          student: 'I\'m a bit nervous about the pronunciation.',
        },
        {
          teacher: 'Totally understandable! German pronunciation is different but very learnable. Let\'s start simply. Repeat after me: Hallo.',
          student: 'Hallo.',
        },
        {
          teacher: 'Sehr gut! Now let\'s try a full introduction. Say: Ich heiße... and then your name.',
          student: 'Ich heiße Alex.',
        },
        {
          teacher: 'Ausgezeichnet! Perfect. Now I\'ll ask you — Wie geht es Ihnen?',
          student: 'Mir geht es gut, danke.',
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPANISH — Lessons 4–6
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'es-lesson-4',
    unitId: 'es-unit-1',
    title: 'Travel & Directions',
    description: 'Navigate airports, stations, and streets in Spanish',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 6,
    goals: [
      'Ask for and understand directions',
      'Name key travel locations',
      'Use left, right, and straight ahead',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential travel words',
        items: [
          { word: 'el aeropuerto', translation: 'airport', pronunciation: '/el ae.ro.ˈpweɾ.to/', example: '¿Dónde está el aeropuerto?', exampleTranslation: 'Where is the airport?' },
          { word: 'la estación', translation: 'station', pronunciation: '/la es.ta.ˈsjon/', example: 'La estación está cerca.', exampleTranslation: 'The station is nearby.' },
          { word: 'el hotel', translation: 'hotel', pronunciation: '/el o.ˈtel/', example: 'Busco un hotel barato.', exampleTranslation: 'I am looking for a cheap hotel.' },
          { word: 'a la derecha', translation: 'to the right', pronunciation: '/a la de.ˈɾe.tʃa/', example: 'Gira a la derecha.', exampleTranslation: 'Turn right.' },
          { word: 'a la izquierda', translation: 'to the left', pronunciation: '/a la iz.ˈkjeɾ.da/', example: 'El banco está a la izquierda.', exampleTranslation: 'The bank is on the left.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Where is the station?',
        targetPhrase: '¿Dónde está la estación?',
        acceptedAnswers: ['¿Dónde está la estación?', 'Dónde está la estación', '¿Donde esta la estacion?'],
        hint: 'Start with the question word for "where"',
      },
    ],
  },

  {
    id: 'es-lesson-5',
    unitId: 'es-unit-1',
    title: 'Shopping & Markets',
    description: 'Buy things and haggle at Spanish markets',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Ask the price of something',
      'Say you want to buy an item',
      'Understand basic numbers for prices',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these shopping phrases',
        phrases: [
          { phrase: '¿Cuánto cuesta esto?', translation: 'How much does this cost?', pronunciation: '/ˈkwan.to ˈkwes.ta ˈes.to/', context: 'Point at an item and use this phrase' },
          { phrase: 'Quisiera comprar...', translation: 'I would like to buy...', pronunciation: '/ki.ˈsje.ɾa kom.ˈpɾaɾ/', context: 'Polite way to say you want to purchase something' },
          { phrase: 'Es muy caro.', translation: 'It is very expensive.', pronunciation: '/es muj ˈka.ɾo/', context: 'Use when you think the price is too high' },
          { phrase: '¿Tiene usted...?', translation: 'Do you have...?', pronunciation: '/ˈtje.ne us.ˈted/', context: 'Ask a shop assistant if they stock an item' },
          { phrase: 'Me lo llevo.', translation: "I'll take it.", pronunciation: '/me lo ˈʝe.βo/', context: 'Say this when you decide to buy the item' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'How much does this cost?',
        targetPhrase: '¿Cuánto cuesta esto?',
        acceptedAnswers: ['¿Cuánto cuesta esto?', 'Cuánto cuesta esto', '¿Cuanto cuesta esto?'],
        hint: 'Start with the question word for "how much"',
      },
    ],
  },

  {
    id: 'es-lesson-6',
    unitId: 'es-unit-1',
    title: 'Family & Friends',
    description: 'Talk about the people closest to you in Spanish',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Name family members in Spanish',
      'Describe your family',
      'Talk about friends',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these family words',
        items: [
          { word: 'la madre', translation: 'mother', pronunciation: '/la ˈma.ðɾe/', example: 'Mi madre es muy amable.', exampleTranslation: 'My mother is very kind.' },
          { word: 'el padre', translation: 'father', pronunciation: '/el ˈpa.ðɾe/', example: 'Mi padre trabaja mucho.', exampleTranslation: 'My father works a lot.' },
          { word: 'la hermana', translation: 'sister', pronunciation: '/la eɾ.ˈma.na/', example: 'Tengo una hermana mayor.', exampleTranslation: 'I have an older sister.' },
          { word: 'el hermano', translation: 'brother', pronunciation: '/el eɾ.ˈma.no/', example: 'Mi hermano vive en Madrid.', exampleTranslation: 'My brother lives in Madrid.' },
          { word: 'el amigo', translation: 'friend', pronunciation: '/el a.ˈmi.ɣo/', example: 'Ella es mi mejor amiga.', exampleTranslation: 'She is my best friend.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My mother is very kind.',
        targetPhrase: 'Mi madre es muy amable.',
        acceptedAnswers: ['Mi madre es muy amable.', 'Mi madre es muy amable', 'mi madre es muy amable'],
        hint: 'Think about the possessive "my" in Spanish',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH — Lessons 4–6
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'fr-lesson-4',
    unitId: 'fr-unit-1',
    title: 'Travel & Directions',
    description: 'Navigate airports, stations, and streets in French',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 6,
    goals: [
      'Ask for and understand directions',
      'Name key travel locations',
      'Use left, right, and straight ahead',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential travel words',
        items: [
          { word: "l'aéroport", translation: 'airport', pronunciation: '/le.ʁo.pɔʁ/', example: "Où est l'aéroport?", exampleTranslation: 'Where is the airport?' },
          { word: 'la gare', translation: 'train station', pronunciation: '/la ɡaʁ/', example: 'La gare est par là.', exampleTranslation: 'The station is over there.' },
          { word: "l'hôtel", translation: 'hotel', pronunciation: '/lo.tɛl/', example: "Je cherche un hôtel.", exampleTranslation: 'I am looking for a hotel.' },
          { word: 'à droite', translation: 'to the right', pronunciation: '/a dʁwat/', example: 'Tournez à droite.', exampleTranslation: 'Turn right.' },
          { word: 'à gauche', translation: 'to the left', pronunciation: '/a ɡoʃ/', example: 'La banque est à gauche.', exampleTranslation: 'The bank is on the left.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Where is the station?',
        targetPhrase: 'Où est la gare?',
        acceptedAnswers: ['Où est la gare?', 'Ou est la gare', 'où est la gare?'],
        hint: 'Start with the question word for "where"',
      },
    ],
  },

  {
    id: 'fr-lesson-5',
    unitId: 'fr-unit-1',
    title: 'Shopping & Markets',
    description: 'Buy things and browse French markets with confidence',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Ask the price of something',
      'Express a wish to buy something',
      'React to prices',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these shopping phrases',
        phrases: [
          { phrase: 'Combien ça coûte?', translation: 'How much does this cost?', pronunciation: '/kɔ̃.bjɛ̃ sa kut/', context: 'Ask the price of any item' },
          { phrase: 'Je voudrais acheter...', translation: 'I would like to buy...', pronunciation: '/ʒə vu.dʁɛ aʃ.te/', context: 'Polite way to express what you want to purchase' },
          { phrase: "C'est trop cher.", translation: 'It is too expensive.', pronunciation: '/sɛ tʁo ʃɛʁ/', context: 'Use when the price is higher than expected' },
          { phrase: 'Avez-vous...?', translation: 'Do you have...?', pronunciation: '/a.ve vu/', context: 'Ask a shopkeeper if they carry a product' },
          { phrase: "Je le prends.", translation: "I'll take it.", pronunciation: '/ʒə lə pʁɑ̃/', context: 'Confirm your purchase' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'How much does this cost?',
        targetPhrase: 'Combien ça coûte?',
        acceptedAnswers: ['Combien ça coûte?', 'Combien ca coute', 'combien ça coûte?'],
        hint: 'The first word means "how much"',
      },
    ],
  },

  {
    id: 'fr-lesson-6',
    unitId: 'fr-unit-1',
    title: 'Family & Friends',
    description: 'Talk about the people closest to you in French',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Name family members in French',
      'Describe your family',
      'Talk about friends',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these family words',
        items: [
          { word: 'la mère', translation: 'mother', pronunciation: '/la mɛʁ/', example: 'Ma mère est très gentille.', exampleTranslation: 'My mother is very kind.' },
          { word: 'le père', translation: 'father', pronunciation: '/lə pɛʁ/', example: 'Mon père travaille beaucoup.', exampleTranslation: 'My father works a lot.' },
          { word: 'la sœur', translation: 'sister', pronunciation: '/la sœʁ/', example: "J'ai une grande sœur.", exampleTranslation: 'I have an older sister.' },
          { word: 'le frère', translation: 'brother', pronunciation: '/lə fʁɛʁ/', example: 'Mon frère habite à Paris.', exampleTranslation: 'My brother lives in Paris.' },
          { word: "l'ami(e)", translation: 'friend', pronunciation: '/la.mi/', example: "C'est ma meilleure amie.", exampleTranslation: 'She is my best friend.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My mother is very kind.',
        targetPhrase: 'Ma mère est très gentille.',
        acceptedAnswers: ['Ma mère est très gentille.', 'Ma mere est tres gentille', 'ma mère est très gentille.'],
        hint: 'Think about how "my" changes for feminine nouns in French',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // JAPANESE — Lessons 4–6
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ja-lesson-4',
    unitId: 'ja-unit-1',
    title: 'Travel & Directions',
    description: 'Find your way around Japanese cities and stations',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 6,
    goals: [
      'Ask for and follow directions in Japanese',
      'Name key transport locations',
      'Understand left, right, and straight',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential travel words',
        items: [
          { word: '空港', translation: 'airport', pronunciation: 'Kūkō /kuː.koː/', example: '空港はどこですか？', exampleTranslation: 'Where is the airport?' },
          { word: '駅', translation: 'train station', pronunciation: 'Eki /e.ki/', example: '駅はここから近いです。', exampleTranslation: 'The station is close from here.' },
          { word: 'ホテル', translation: 'hotel', pronunciation: 'Hoteru /ho.te.ru/', example: 'ホテルを探しています。', exampleTranslation: 'I am looking for a hotel.' },
          { word: '右', translation: 'right', pronunciation: 'Migi /mi.gi/', example: '右に曲がってください。', exampleTranslation: 'Please turn right.' },
          { word: '左', translation: 'left', pronunciation: 'Hidari /hi.da.ri/', example: '左側にあります。', exampleTranslation: 'It is on the left side.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Where is the station?',
        targetPhrase: '駅はどこですか？',
        acceptedAnswers: ['駅はどこですか？', '駅はどこですか', 'Eki wa doko desu ka'],
        hint: 'Start with the place, then "wa doko desu ka"',
      },
    ],
  },

  {
    id: 'ja-lesson-5',
    unitId: 'ja-unit-1',
    title: 'Shopping & Markets',
    description: 'Shop confidently in Japanese stores and markets',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Ask the price of something',
      'Express a wish to buy an item',
      'React to prices politely',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these shopping phrases',
        phrases: [
          { phrase: 'いくらですか？', translation: 'How much is it?', pronunciation: 'Ikura desu ka? /i.ku.ra de.su ka/', context: 'Ask the price of any item in a shop' },
          { phrase: 'これをください。', translation: 'I will take this, please.', pronunciation: 'Kore wo kudasai. /ko.re wo ku.da.sa.i/', context: 'Politely say you want to buy the item you are holding' },
          { phrase: '高いですね。', translation: 'That is expensive, isn\'t it.', pronunciation: 'Takai desu ne. /ta.ka.i de.su ne/', context: 'A soft way to react to a high price' },
          { phrase: 'ありますか？', translation: 'Do you have...?', pronunciation: 'Arimasu ka? /a.ri.ma.su ka/', context: 'Ask a shop assistant if they have a product' },
          { phrase: '袋をもらえますか？', translation: 'Can I have a bag?', pronunciation: 'Fukuro wo moraemasu ka?', context: 'Ask for a shopping bag at checkout' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'How much is it?',
        targetPhrase: 'いくらですか？',
        acceptedAnswers: ['いくらですか？', 'いくらですか', 'Ikura desu ka', 'ikura desu ka?'],
        hint: 'The first word means "how much"',
      },
    ],
  },

  {
    id: 'ja-lesson-6',
    unitId: 'ja-unit-1',
    title: 'Family & Friends',
    description: 'Talk about family and relationships in Japanese',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Name family members in Japanese',
      'Describe your own family',
      'Refer to other people\'s families politely',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these family words',
        items: [
          { word: '母', translation: 'mother (my own)', pronunciation: 'Haha /ha.ha/', example: '母はやさしいです。', exampleTranslation: 'My mother is kind.' },
          { word: '父', translation: 'father (my own)', pronunciation: 'Chichi /tɕi.tɕi/', example: '父は会社員です。', exampleTranslation: 'My father is a company employee.' },
          { word: '姉', translation: 'older sister', pronunciation: 'Ane /a.ne/', example: '姉は東京に住んでいます。', exampleTranslation: 'My older sister lives in Tokyo.' },
          { word: '兄', translation: 'older brother', pronunciation: 'Ani /a.ni/', example: '兄はとても背が高いです。', exampleTranslation: 'My older brother is very tall.' },
          { word: '友達', translation: 'friend', pronunciation: 'Tomodachi /to.mo.da.chi/', example: '友達と映画を見ました。', exampleTranslation: 'I watched a movie with my friend.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My mother is kind.',
        targetPhrase: '母はやさしいです。',
        acceptedAnswers: ['母はやさしいです。', '母はやさしいです', 'Haha wa yasashii desu'],
        hint: 'Use the word for "my mother" in the humble form',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GERMAN — Lessons 4–6
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'de-lesson-4',
    unitId: 'de-unit-1',
    title: 'Travel & Directions',
    description: 'Navigate airports, stations, and streets in German',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 6,
    goals: [
      'Ask for and understand directions',
      'Name key travel locations',
      'Use left, right, and straight ahead',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these essential travel words',
        items: [
          { word: 'der Flughafen', translation: 'airport', pronunciation: '/deːɐ̯ ˈfluːk.haː.fən/', example: 'Wo ist der Flughafen?', exampleTranslation: 'Where is the airport?' },
          { word: 'der Bahnhof', translation: 'train station', pronunciation: '/deːɐ̯ ˈbaːn.hoːf/', example: 'Der Bahnhof ist in der Nähe.', exampleTranslation: 'The train station is nearby.' },
          { word: 'das Hotel', translation: 'hotel', pronunciation: '/das ho.ˈtɛl/', example: 'Ich suche ein Hotel.', exampleTranslation: 'I am looking for a hotel.' },
          { word: 'rechts', translation: 'to the right', pronunciation: '/ʁɛçts/', example: 'Biegen Sie rechts ab.', exampleTranslation: 'Turn right.' },
          { word: 'links', translation: 'to the left', pronunciation: '/lɪŋks/', example: 'Die Bank ist links.', exampleTranslation: 'The bank is on the left.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'Where is the train station?',
        targetPhrase: 'Wo ist der Bahnhof?',
        acceptedAnswers: ['Wo ist der Bahnhof?', 'Wo ist der Bahnhof', 'wo ist der bahnhof?'],
        hint: 'Start with the question word for "where"',
      },
    ],
  },

  {
    id: 'de-lesson-5',
    unitId: 'de-unit-1',
    title: 'Shopping & Markets',
    description: 'Buy things and browse German markets with confidence',
    type: 'conversation',
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      'Ask the price of something',
      'Express a wish to buy something',
      'React to prices in German',
    ],
    activities: [
      {
        type: 'phrase_match',
        instruction: 'Study these shopping phrases',
        phrases: [
          { phrase: 'Was kostet das?', translation: 'How much does this cost?', pronunciation: '/vas ˈkɔs.tət das/', context: 'Ask the price of any item' },
          { phrase: 'Ich möchte... kaufen.', translation: 'I would like to buy...', pronunciation: '/ɪç ˈmœç.tə ˈkau.fən/', context: 'Polite way to express what you want to buy' },
          { phrase: 'Das ist zu teuer.', translation: 'That is too expensive.', pronunciation: '/das ɪst tsuː ˈtɔɪ.ɐ/', context: 'Use when the price is too high' },
          { phrase: 'Haben Sie...?', translation: 'Do you have...?', pronunciation: '/ˈhaː.bən ziː/', context: 'Ask a shop assistant if they stock a product' },
          { phrase: 'Ich nehme es.', translation: "I'll take it.", pronunciation: '/ɪç ˈneː.mə ɛs/', context: 'Confirm your purchase decision' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'How much does this cost?',
        targetPhrase: 'Was kostet das?',
        acceptedAnswers: ['Was kostet das?', 'Was kostet das', 'was kostet das?'],
        hint: 'The first word means "what"',
      },
    ],
  },

  {
    id: 'de-lesson-6',
    unitId: 'de-unit-1',
    title: 'Family & Friends',
    description: 'Talk about the people closest to you in German',
    type: 'vocabulary',
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      'Name family members in German',
      'Describe your family',
      'Talk about friends',
    ],
    activities: [
      {
        type: 'vocabulary',
        instruction: 'Learn these family words',
        items: [
          { word: 'die Mutter', translation: 'mother', pronunciation: '/diː ˈmʊ.tɐ/', example: 'Meine Mutter ist sehr nett.', exampleTranslation: 'My mother is very nice.' },
          { word: 'der Vater', translation: 'father', pronunciation: '/deːɐ̯ ˈfaː.tɐ/', example: 'Mein Vater arbeitet viel.', exampleTranslation: 'My father works a lot.' },
          { word: 'die Schwester', translation: 'sister', pronunciation: '/diː ˈʃvɛs.tɐ/', example: 'Ich habe eine ältere Schwester.', exampleTranslation: 'I have an older sister.' },
          { word: 'der Bruder', translation: 'brother', pronunciation: '/deːɐ̯ ˈbʁuː.dɐ/', example: 'Mein Bruder wohnt in Berlin.', exampleTranslation: 'My brother lives in Berlin.' },
          { word: 'der Freund / die Freundin', translation: 'friend', pronunciation: '/deːɐ̯ fʁɔɪnt/', example: 'Sie ist meine beste Freundin.', exampleTranslation: 'She is my best friend.' },
        ],
      },
      {
        type: 'translation',
        instruction: 'Translate the following phrase',
        prompt: 'My mother is very nice.',
        targetPhrase: 'Meine Mutter ist sehr nett.',
        acceptedAnswers: ['Meine Mutter ist sehr nett.', 'Meine Mutter ist sehr nett', 'meine mutter ist sehr nett.'],
        hint: 'Remember the possessive "my" is "meine" for feminine nouns',
      },
    ],
  },
];
