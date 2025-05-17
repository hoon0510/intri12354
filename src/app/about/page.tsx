import React from 'react';
import Header from "@/components/Header";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Intrix 소개 | 마케팅 전략 자동화의 혁신',
  description: 'Intrix는 AI 기반의 마케팅 전략 자동화 서비스입니다. 고객의 욕망을 이끌어내는 맞춤형 전략을 자동으로 설계합니다.',
}

const AboutPage = () => {
  // 강화된 시각적 구조와 구체적인 정보를 담은 로드맵 아이템
  const roadmapItems = [
    {
      id: 1,
      title: "40가지 욕구 체계 기반의 정량 심층 분석 기능 고도화",
      description: "더 세밀한 감정과 욕구에 기반한 정량적 분석이 가능해집니다.",
      status: "90% 개발 완료, 출시 임박",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "indigo",
      progress: 90,
      eta: "2025년 6월"
    },
    {
      id: 2,
      title: "KPI 기반 전략 효과 측정 기능 도입",
      description: "전략 실행 후 주요 지표 변화를 측정하는 기능을 준비 중입니다.",
      status: "기획 단계",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "purple",
      progress: 30,
      eta: "2025년 9월"
    },
    {
      id: 3,
      title: "생성형 AI 연동 및 프롬프트 번들 기능",
      description: "다양한 AI 도구와 연동된 콘텐츠 생성 기능을 지원할 예정입니다.",
      status: "기획 단계",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "blue",
      progress: 15,
      eta: "2025년 12월"
    }
  ];
  
  // 강화된 시각적 표현과 구체적인 효과를 담은 혜택 항목
  const benefits = [
    {
      title: "전략 실행 효율 향상",
      description: "자동화된 분석과 전략 구조 설계를 통해 시간과 노력을 절감할 수 있습니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      highlight: "전략 개발 시간 75% 단축",
      color: "indigo"
    },
    {
      title: "소비자와의 감정적 연결 강화",
      description: "감정 기반 메시지 설계를 통해 브랜드의 공감력을 높입니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      highlight: "고객 인게이지먼트 증가",
      color: "rose"
    },
    {
      title: "직관적 전략 실행 도구",
      description: "전문 지식 없이도 쉽게 활용할 수 있는 사용자 중심 인터페이스를 제공합니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      highlight: "학습 곡선 최소화",
      color: "cyan"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto py-12 px-4">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 py-1 px-3 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium">
            INSTINCT × MATRIX
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Intrix<span className="text-indigo-600">란 무엇인가?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            인간의 감정과 욕구를 중심으로 한 마케팅 전략 자동화의 시작입니다.
            <span className="font-semibold text-indigo-600"> Intrix는 실질적인 전략 수립을 돕는 실무형 도구입니다.</span>
          </p>
        </div>
        
        {/* Intrix 개념 설명 섹션 */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4 md:p-6 flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Instinct</h3>
              <p className="text-gray-600">소비자의 본능적 욕구와 감정을 이해하고 분석합니다.</p>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Matrix</h3>
              <p className="text-gray-600">복잡한 감정 데이터를 체계화하여 전략적 구조로 변환합니다.</p>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Strategy</h3>
              <p className="text-gray-600">분석된 데이터를 기반으로 효과적인 마케팅 전략을 설계합니다.</p>
            </div>
          </div>
        </section>
        
        {/* 강화된 가치 섹션 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Intrix가 제공하는 가치</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-${benefit.color}-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="p-6">
                  <div className={`bg-${benefit.color}-100 text-${benefit.color}-600 rounded-full p-3 mb-4 inline-block`}>
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                  
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  
                  <div className={`bg-${benefit.color}-50 text-${benefit.color}-700 text-sm font-medium py-1 px-3 rounded-full inline-block`}>
                    {benefit.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 강화된 로드맵 섹션 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Intrix 개발 로드맵</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          
          <div className="space-y-8">
            {roadmapItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  {/* 좌측 아이콘 및 ID 영역 */}
                  <div className={`bg-${item.color}-500 text-white p-6 flex flex-col items-center justify-center md:w-32`}>
                    <div className="bg-white bg-opacity-20 rounded-full p-2 mb-2">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-bold">{item.id}</span>
                  </div>
                  
                  {/* 우측 내용 영역 */}
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 md:mb-0">{item.title}</h3>
                      <div className={`bg-${item.color}-50 text-${item.color}-700 text-sm font-medium py-1 px-3 rounded-full inline-block`}>
                        {item.status}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    {/* 진행 상황 및 출시 예정일 */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-gray-100">
                      <div className="mb-3 md:mb-0 md:w-2/3 pr-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">진행률</span>
                          <span className="text-xs font-medium text-gray-700">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${item.color}-500 h-2 rounded-full`} 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>출시 예정: {item.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;