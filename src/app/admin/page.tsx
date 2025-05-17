'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Search, RefreshCw, Edit2, UserX, History, X } from 'lucide-react';

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',') : [];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditInput, setCreditInput] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [strategies, setStrategies] = useState<any[]>([]);
  const [strategySearch, setStrategySearch] = useState('');
  const [strategyLoading, setStrategyLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStrategies = async () => {
    setStrategyLoading(true);
    try {
      const res = await fetch('/api/admin/strategies');
      const data = await res.json();
      setStrategies(data.strategies || []);
    } catch {
      setStrategies([]);
    } finally {
      setStrategyLoading(false);
    }
  };

  const handleCreditEdit = (user: any) => {
    setSelectedUser(user);
    setCreditInput(user.credits.toString());
    setShowCreditModal(true);
  };

  const handleCreditSave = async () => {
    await fetch('/api/admin/credit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser.id, credits: Number(creditInput) })
    });
    setShowCreditModal(false);
    fetchUsers();
  };

  const handleForceWithdraw = async (user: any) => {
    if (!window.confirm(`${user.email} 회원을 강제 탈퇴시키겠습니까?`)) return;
    await fetch('/api/admin/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    });
    fetchUsers();
  };

  const handleShowHistory = async (user: any) => {
    setSelectedUser(user);
    setShowHistoryModal(true);
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/admin/history?userId=${user.id}`);
      const data = await res.json();
      setUserHistory(data.history || []);
    } catch {
      setUserHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await fetch('/api/admin/history', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    handleShowHistory(selectedUser);
  };

  // 차트 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-blue-600 font-bold">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
    fetchStrategies();
  }, []);

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
  if (!session || !isAdmin) {
    return (
      <>
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="text-red-600 font-bold text-xl p-8 bg-red-50 rounded-lg shadow-md border border-red-200">
            관리자만 접근 가능합니다.
          </div>
        </div>
      </>
    );
  }

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStrategies = strategies.filter(s =>
    s.itemName?.toLowerCase().includes(strategySearch.toLowerCase()) ||
    s.userEmail?.toLowerCase().includes(strategySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">관리자 페이지</h1>
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              대시보드
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === 'users' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              회원 관리
            </button>
            <button
              onClick={() => setActiveTab('repository')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === 'repository' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              저장소
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6">
          {activeTab === 'dashboard' && dashboardData && (
            <div className="space-y-8">
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
                  <h3 className="text-blue-600 text-sm font-medium mb-2">총 회원수</h3>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData.totalUsers}</p>
                  <div className="flex items-center mt-2 text-green-600">
                    <span className="text-lg">+{dashboardData.newUsersToday}</span>
                    <span className="text-sm ml-1">오늘</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200">
                  <h3 className="text-purple-600 text-sm font-medium mb-2">총 전략수</h3>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData.totalStrategies}</p>
                  <div className="flex items-center mt-2 text-green-600">
                    <span className="text-lg">+{dashboardData.newStrategiesToday}</span>
                    <span className="text-sm ml-1">오늘</span>
                  </div>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 회원 가입 추이 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">회원 가입 추이</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dashboardData.userStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis 
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Line 
                          name="회원 수" 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }}
                          activeDot={{ stroke: '#1d4ed8', strokeWidth: 2, r: 6, fill: '#3b82f6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 전략 생성 추이 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">전략 생성 추이</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dashboardData.strategyStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis 
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Line 
                          name="전략 수" 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#fff' }}
                          activeDot={{ stroke: '#6d28d9', strokeWidth: 2, r: 6, fill: '#8b5cf6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <>
              <div className="mb-6 flex flex-wrap gap-4 items-center">
                <div className="relative flex-grow max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
          <input
            type="text"
            placeholder="이메일 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
                    className="pl-10 border border-gray-300 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={fetchUsers} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw size={18} /> 새로고침
                </button>
        </div>
              
              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="w-full text-sm">
          <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 font-medium text-gray-600">이메일</th>
                      <th className="p-3 font-medium text-gray-600">가입일</th>
                      <th className="p-3 font-medium text-gray-600">보유 크레딧</th>
                      <th className="p-3 font-medium text-gray-600">상태</th>
                      <th className="p-3 font-medium text-gray-600">관리</th>
            </tr>
          </thead>
          <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-500">검색 결과가 없습니다</td>
                      </tr>
                    ) : (
                      filteredUsers.map((user, index) => (
                        <tr 
                          key={user.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                        >
                          <td className="p-3 text-gray-700">{user.email}</td>
                          <td className="p-3 text-gray-700">{new Date(user.createdAt).toLocaleString()}</td>
                          <td className="p-3 font-medium">{user.credits}</td>
                          <td className="p-3">
                            {user.deletedAt ? (
                              <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium">탈퇴</span>
                            ) : (
                              <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">정상</span>
                            )}
                          </td>
                          <td className="p-3 flex gap-2">
                            <button 
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                              onClick={() => handleCreditEdit(user)}
                            >
                              <Edit2 size={14} /> 크레딧
                            </button>
                            <button 
                              className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                              onClick={() => handleForceWithdraw(user)}
                            >
                              <UserX size={14} /> 탈퇴
                            </button>
                            <button 
                              className="bg-gray-700 hover:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                              onClick={() => handleShowHistory(user)}
                            >
                              <History size={14} /> 내역
                            </button>
                </td>
              </tr>
                      ))
                    )}
          </tbody>
        </table>
              </div>
            </>
          )}

          {activeTab === 'repository' && (
            <>
              <div className="mb-6 flex flex-wrap gap-4 items-center">
                <div className="relative flex-grow max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="아이템명 또는 이메일 검색"
                    value={strategySearch}
                    onChange={e => setStrategySearch(e.target.value)}
                    className="pl-10 border border-gray-300 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={fetchStrategies} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw size={18} /> 새로고침
                </button>
              </div>
              
              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 font-medium text-gray-600">아이템명</th>
                      <th className="p-3 font-medium text-gray-600">생성자</th>
                      <th className="p-3 font-medium text-gray-600">생성일</th>
                      <th className="p-3 font-medium text-gray-600">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategyLoading ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredStrategies.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-500">전략이 없습니다.</td>
                      </tr>
                    ) : (
                      filteredStrategies.map((strategy, index) => (
                        <tr 
                          key={strategy.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                        >
                          <td className="p-3 text-gray-700">{strategy.itemName || '(이름없음)'}</td>
                          <td className="p-3 text-gray-700">{strategy.userEmail}</td>
                          <td className="p-3 text-gray-700">{new Date(strategy.createdAt).toLocaleString()}</td>
                          <td className="p-3">
                            <button 
                              onClick={() => handleDeleteHistory(strategy.id)} 
                              className="text-red-600 hover:text-red-800 font-medium transition-colors"
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* 크레딧 조정 모달 */}
        {showCreditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative animate-fade-in">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowCreditModal(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">크레딧 조정</h2>
              <div className="mb-4 text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedUser.email}</div>
              <div className="mb-6">
                <label htmlFor="credit" className="block text-sm font-medium text-gray-700 mb-1">크레딧 수량</label>
                <input 
                  id="credit"
                  type="number" 
                  value={creditInput} 
                  onChange={e => setCreditInput(e.target.value)} 
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowCreditModal(false)}
                >
                  취소
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
                  onClick={handleCreditSave}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 전략 내역 모달 */}
        {showHistoryModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full relative animate-fade-in overflow-hidden">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowHistoryModal(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedUser.email} - 전략 내역</h2>
              
              {historyLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : userHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-500">전략 내역이 없습니다</div>
              ) : (
                <div className="overflow-y-auto max-h-[60vh] -mx-8 px-8">
                  <table className="w-full text-sm rounded-lg border border-gray-200 overflow-hidden">
                  <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="p-3 font-medium text-gray-600">아이템명</th>
                        <th className="p-3 font-medium text-gray-600">생성일</th>
                        <th className="p-3 font-medium text-gray-600">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                      {userHistory.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                        >
                          <td className="p-3 text-gray-700">{item.itemName || '(이름없음)'}</td>
                          <td className="p-3 text-gray-700">{new Date(item.createdAt).toLocaleString()}</td>
                          <td className="p-3">
                            <button 
                              onClick={() => handleDeleteHistory(item.id)} 
                              className="text-red-600 hover:text-red-800 font-medium transition-colors"
                            >
                              삭제
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setShowHistoryModal(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* 애니메이션 스타일 */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 