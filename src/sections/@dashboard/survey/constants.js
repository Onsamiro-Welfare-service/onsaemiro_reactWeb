export const testSurveyList = [
    {
        category: 1,
        level: 1,
        type: '1',
        question: { text: '오늘 아침 어떰?', fileUrl: null },
        answers: [{ text: '좋아요', fileUrl: null }, { text: '안 좋아요', fileUrl: null }],
    },
    {
        category: 1,
        level: 2,
        type: '2',
        question: { text: '오늘 뭐했음?', fileUrl: null },
        answers: [{ text: '놀았음', fileUrl: null }, { text: '일했음', fileUrl: null }, { text: '쉬었음', fileUrl: null }],
    },
    {
        category: 3,
        level: 3,
        type: '3',
        question: { text: '오늘 기분 어떰?', fileUrl: null },
        answers: [{ text: '안좋음', fileUrl: null }, { text: '보통', fileUrl: null }, { text: '좋음', fileUrl: null }, { text: '아주 좋음', fileUrl: null }],
    },
]

export const TestCategoryArr = {
    "count": 4,
    "data": ['선택하기','bb','cc','dd']
};

export const initialSurveyData = [
    {
      categoryId: -1,
      level: 1,
      type: '1',
      question: { text: '선택된 카테고리가 없습니다.', fileUrl: null },
      answers: [{ text: '', fileUrl: null }, { text: '', fileUrl: null }],
    }
  ];

export const categoryList = {
    1: '건강',
    2: '생활',
    3: '감정',
    4: '기타',
}

export const tagList = {
    1: '선택형-2항목',
    2: '선택형-3항목',
    3: '선택형-4항목',
}

export const levelList = {
    '1': '중증도-낮음',
    '2': '중증도-보통',
    '3': '중증도-높음',
    '4': '중증도-매우높음'
}