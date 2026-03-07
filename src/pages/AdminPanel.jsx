import React, { useState, useEffect } from 'react';
import { 
    Shield, Terminal, Users, List, LogOut, Activity, Search,
    CheckCircle2, XCircle, ChevronLeft, ChevronRight, X, Eye, Trash2, Loader2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { userService } from '../services/user.service';
import { logService } from '../services/log.service';

const AdminPanel = () => {
    const { isLoggedIn, logout, checkAuth, isLoading: authLoading } = useAuthStore();
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'logs'
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ totalVisits: 0, uniqueVisitors: 0 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, reason: '', isDeleting: false });
    
    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        ip: '',
        action: '',
        fullName: '',
        status: '',
        team: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            await checkAuth();
        };
        init();
    }, [checkAuth]);

    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            navigate('/admin/login');
        }
    }, [isLoggedIn, authLoading, navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn, activeTab, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const limit = 20;
            const params = { page, limit, ...filters };
            
            if (activeTab === 'users') {
                const data = await userService.getAll(params);
                setUsers(data.data);
                setTotalItems(data.total);
            } else {
                const data = await logService.getAll(params);
                setLogs(data.data);
                setTotalItems(data.total);
                
                const statsData = await logService.getStats();
                setStats(statsData);
            }
        } catch (err) {
            console.error('Data fetch error:', err);
            if (err.response?.status === 401) logout();
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const handleStatusUpdate = async (userId, newStatus) => {
        setProcessingId(userId);
        try {
            await userService.updateStatus(userId, newStatus);
            setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        } catch (err) {
            alert('Status yenilənmədi.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleDeleteUser = async () => {
        if (!deleteModal.reason.trim()) return alert('Səbəb mütləq qeyd olunmalıdır!');
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));

        try {
            await userService.softDelete(deleteModal.userId, deleteModal.reason);
            setUsers(users.filter(u => u.id !== deleteModal.userId));
            setDeleteModal({ isOpen: false, userId: null, reason: '', isDeleting: false });
        } catch (err) {
            alert('Silinmə zamanı xəta baş verdi.');
            setDeleteModal(prev => ({ ...prev, isDeleting: false }));
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoggedIn) fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    if (authLoading || !isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono text-xs">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-950 border-r border-cyber-border z-50 flex flex-col">
                <div className="p-8 border-b border-cyber-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-neon-blue/10 rounded flex items-center justify-center border border-neon-blue/20">
                            <Shield className="w-5 h-5 text-neon-blue" />
                        </div>
                        <span className="hidden md:block font-black text-white text-lg tracking-tighter uppercase">Admin<span className="text-neon-blue">_V1</span></span>
                    </div>
                </div>

                <div className="flex-1 py-10 px-4 space-y-4">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center md:space-x-4 p-4 rounded transition-all ${activeTab === 'users' ? 'bg-neon-blue/5 text-neon-blue border border-neon-blue/20' : 'hover:bg-white/5 opacity-40'}`}
                    >
                        <Users size={20} />
                        <span className="hidden md:block font-bold uppercase tracking-[0.2em]">İştirakçılar</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('logs')}
                        className={`w-full flex items-center md:space-x-4 p-4 rounded transition-all ${activeTab === 'logs' ? 'bg-neon-blue/5 text-neon-blue border border-neon-blue/20' : 'hover:bg-white/5 opacity-40'}`}
                    >
                        <List size={20} />
                        <span className="hidden md:block font-bold uppercase tracking-[0.2em]">Sistem Loqları</span>
                    </button>
                </div>

                <div className="p-6 border-t border-cyber-border">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center md:space-x-4 p-4 text-neon-red hover:bg-neon-red/10 rounded transition-all group"
                    >
                        <LogOut size={20} />
                        <span className="hidden md:block font-bold uppercase tracking-[0.2em]">Log Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-20 md:ml-64 p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">
                            {activeTab === 'users' ? "{'>'} User_Database_Access" : "{'>'} System_Activity_Logs"}
                        </h2>
                        <div className="flex items-center text-[10px] text-slate-500 uppercase tracking-[.3em]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-3 shadow-[0_0_8px_#22c55e]"></div>
                            Status: Secure_Connection_Established | {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                    {activeTab === 'users' && (
                        <Link 
                            to="/admin/deleted-users"
                            className="flex items-center space-x-2 px-6 py-3 bg-neon-red/10 border border-neon-red/30 text-neon-red rounded hover:bg-neon-red/20 transition-all font-bold uppercase tracking-widest text-[10px]"
                        >
                            <Trash2 size={14} />
                            <span>Silinmiş İstİfadəçİlər</span>
                        </Link>
                    )}
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { label: 'Ümumi İstifadəçi', val: users.length, icon: <Users size={16} />, color: 'text-neon-blue' },
                        { label: 'Ümumi Giriş sayı', val: stats.totalVisits, icon: <Activity size={16} />, color: 'text-green-500' },
                        { label: 'Unikal Ziyarətçi', val: stats.uniqueVisitors, icon: <Shield size={16} />, color: 'text-purple-500' },
                        { label: 'Sistem Statusu', val: 'ACTIVE', icon: <Terminal size={16} />, color: 'text-neon-red' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-cyber-card/50 border border-cyber-border p-6 rounded hover:border-white/10 transition-all group">
                            <div className={`p-2 rounded bg-slate-900 w-fit mb-4 ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.val}</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {activeTab === 'users' ? (
                        <>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input 
                                    name="fullName"
                                    value={filters.fullName}
                                    onChange={handleFilterChange}
                                    placeholder="Ad Soyad..." 
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue transition-all"
                                />
                            </div>
                            <select 
                                name="team"
                                value={filters.team}
                                onChange={handleFilterChange}
                                className="bg-slate-900/50 border border-slate-800 rounded py-3 px-4 text-white focus:outline-none focus:border-neon-blue transition-all"
                            >
                                <option value="">Bütün Komandalar</option>
                                <option value="blue">Blue Team</option>
                                <option value="red">Red Team</option>
                            </select>
                            <select 
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="bg-slate-900/50 border border-slate-800 rounded py-3 px-4 text-white focus:outline-none focus:border-neon-blue transition-all"
                            >
                                <option value="">Bütün Statuslar</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </>
                    ) : (
                        <>
                            <div className="relative group">
                                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input 
                                    name="ip"
                                    value={filters.ip}
                                    onChange={handleFilterChange}
                                    placeholder="IP Axtar..." 
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue transition-all"
                                />
                            </div>
                            <select 
                                name="action"
                                value={filters.action}
                                onChange={handleFilterChange}
                                className="bg-slate-900/50 border border-slate-800 rounded py-3 px-4 text-white focus:outline-none focus:border-neon-blue transition-all"
                            >
                                <option value="">Bütün Action-lar</option>
                                <option value="Page View">Page View</option>
                                <option value="Visit">Visit</option>
                            </select>
                        </>
                    )}
                </div>

                <div className="bg-cyber-card border border-cyber-border rounded overflow-hidden shadow-2xl relative mb-8">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue/50 via-neon-red/50 to-neon-blue/50"></div>
                    
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-8 space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex space-x-4 animate-pulse">
                                        <div className="h-12 bg-slate-800 rounded flex-1"></div>
                                        <div className="h-12 bg-slate-800 rounded w-24"></div>
                                        <div className="h-12 bg-slate-800 rounded w-32"></div>
                                        <div className="h-12 bg-slate-800 rounded w-24"></div>
                                        <div className="h-12 bg-slate-800 rounded w-32"></div>
                                    </div>
                                ))}
                            </div>
                        ) : activeTab === 'users' ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900/80 border-b border-cyber-border text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                                    <tr>
                                        <th className="px-8 py-6">İştirakçı / Universitet</th>
                                        <th className="px-8 py-6 text-center">Komanda</th>
                                        <th className="px-8 py-6">Tarix</th>
                                        <th className="px-8 py-6 text-center">Status</th>
                                        <th className="px-8 py-6 text-right">Fəaliyyət</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cyber-border/30">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-white mb-1">{user.fullName}</div>
                                                <div className="text-slate-500 text-[10px] tracking-widest uppercase">{user.university} | {user.email}</div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`px-3 py-1 rounded text-[9px] uppercase font-black border ${user.team === 'blue' ? 'border-neon-blue/30 text-neon-blue bg-neon-blue/5' : 'border-neon-red/30 text-neon-red bg-neon-red/5'}`}>
                                                    {user.team}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`px-3 py-1 rounded text-[9px] uppercase font-black ${
                                                    user.status === 'approved' ? 'text-green-500 bg-green-500/5' : 
                                                    user.status === 'rejected' ? 'text-neon-red bg-neon-red/5' : 
                                                    'text-yellow-500 bg-yellow-500/5'
                                                }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    {user.status === 'pending' && (
                                                        <>
                                                            <button 
                                                                onClick={() => handleStatusUpdate(user.id, 'approved')}
                                                                disabled={processingId === user.id}
                                                                className="p-2 border border-green-500/30 text-green-500 hover:bg-green-500/10 rounded transition-all disabled:opacity-50"
                                                                title="Təsdiqlə"
                                                            >
                                                                {processingId === user.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                                            </button>
                                                            <button 
                                                                onClick={() => handleStatusUpdate(user.id, 'rejected')}
                                                                disabled={processingId === user.id}
                                                                className="p-2 border border-neon-red/30 text-neon-red hover:bg-neon-red/10 rounded transition-all disabled:opacity-50"
                                                                title="Rədd et"
                                                            >
                                                                {processingId === user.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                                                            </button>
                                                        </>
                                                    )}
                                                    <button 
                                                        onClick={() => setSelectedUser(user)}
                                                        className="p-2 border border-slate-700 text-slate-500 hover:text-white rounded transition-all"
                                                        title="Detallar"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setDeleteModal({ isOpen: true, userId: user.id, reason: '' })}
                                                        className="p-2 border border-neon-red/30 text-neon-red hover:bg-neon-red/10 rounded transition-all"
                                                        title="İstifadəçini Sil"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-slate-600 uppercase tracking-widest font-bold">
                                                Məlumat təmizdir. Müraciət yoxdur.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900/80 border-b border-cyber-border text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                                    <tr>
                                        <th className="px-8 py-6">IP_SOURCE</th>
                                        <th className="px-8 py-6">ACTION_TYPE</th>
                                        <th className="px-8 py-6">TIMESTAMP</th>
                                        <th className="px-8 py-6 text-right">RESULT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cyber-border/30">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-5 text-neon-blue font-bold opacity-80">{log.ip}</td>
                                            <td className="px-8 py-5 text-slate-400 uppercase tracking-widest text-[10px]">{log.action}</td>
                                            <td className="px-8 py-5 text-slate-600">{new Date(log.timestamp).toLocaleString()}</td>
                                            <td className="px-8 py-5 text-right">
                                                <span className={`${log.status === 'OK' ? 'text-green-500' : 'text-neon-red'} flex items-center justify-end font-black`}>
                                                    {log.status === 'OK' ? <CheckCircle2 size={12} className="mr-2" /> : <XCircle size={12} className="mr-2" />}
                                                    {log.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center text-slate-600 uppercase tracking-widest font-bold">
                                                Loq qeydləri tapılmadı.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Pagination */}
                    <div className="p-6 bg-slate-900/30 border-t border-cyber-border flex items-center justify-between">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                            Cəmi: <span className="text-white">{totalItems}</span> qeyd
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className={`p-2 border border-cyber-border rounded hover:bg-white/5 transition-all ${page === 1 ? 'opacity-30 cursor-not-allowed text-slate-600' : 'text-neon-blue'}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex items-center space-x-2">
                                {[...Array(Math.min(5, Math.ceil(totalItems / 20)))].map((_, i) => {
                                    const p = i + 1;
                                    return (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-8 h-8 rounded text-[10px] font-black transition-all ${page === p ? 'bg-neon-blue text-cyber-dark shadow-[0_0_10px_rgba(0,229,255,0.3)]' : 'hover:bg-white/5 text-slate-500'}`}
                                        >
                                            {p}
                                        </button>
                                    );
                                })}
                            </div>
                            <button 
                                disabled={page >= Math.ceil(totalItems / 20)}
                                onClick={() => setPage(page + 1)}
                                className={`p-2 border border-cyber-border rounded hover:bg-white/5 transition-all ${page >= Math.ceil(totalItems / 20) ? 'opacity-30 cursor-not-allowed text-slate-600' : 'text-neon-blue'}`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Detail Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <div className="bg-cyber-card border border-cyber-border w-full max-w-2xl rounded-xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-red"></div>
                            
                            <div className="p-8 border-b border-cyber-border flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{selectedUser.fullName}</h3>
                                    <p className="text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{selectedUser.team.toUpperCase()} TEAM MEMBER</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedUser(null)}
                                    className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 grid md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto font-mono">
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">E-poçt Ünvanı</div>
                                        <div className="text-white text-sm">{selectedUser.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Universitet</div>
                                        <div className="text-white text-sm">{selectedUser.university}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Qeydiyyat Tarixi</div>
                                        <div className="text-white text-sm">{new Date(selectedUser.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Status</div>
                                        <div className={`text-sm font-bold uppercase ${
                                            selectedUser.status === 'approved' ? 'text-green-500' : 
                                            selectedUser.status === 'rejected' ? 'text-neon-red' : 
                                            'text-yellow-500'
                                        }`}>{selectedUser.status}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Giriş Marşrutu</div>
                                        <div className="text-slate-400 text-xs italic">Website Registration Form</div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Təqdimat Məktubu</div>
                                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded text-slate-300 text-xs leading-relaxed">
                                        {selectedUser.introMessage || 'Məlumat yoxdur.'}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-900/50 border-t border-cyber-border flex justify-end space-x-4">
                                <button 
                                    onClick={() => setSelectedUser(null)}
                                    className="px-6 py-3 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:bg-white/5 transition-all"
                                >
                                    Bağla
                                </button>
                                {selectedUser.status === 'pending' && (
                                    <>
                                        <button 
                                            onClick={() => {
                                                handleStatusUpdate(selectedUser.id, 'rejected');
                                                setSelectedUser(null);
                                            }}
                                            className="px-6 py-3 border border-neon-red/30 text-neon-red text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:bg-neon-red/10 transition-all"
                                        >
                                            Rədd et
                                        </button>
                                        <button 
                                            onClick={() => {
                                                handleStatusUpdate(selectedUser.id, 'approved');
                                                setSelectedUser(null);
                                            }}
                                            className="px-6 py-3 bg-neon-blue text-cyber-dark text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:neon-shadow-blue transition-all"
                                        >
                                            Təsdiqlə
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Delete Modal */}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="bg-cyber-card border border-neon-red/30 w-full max-w-md rounded-lg overflow-hidden relative shadow-[0_0_50px_rgba(255,51,51,0.2)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-neon-red"></div>
                            
                            <div className="p-8 border-b border-cyber-border flex justify-between items-center">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center">
                                    <Trash2 size={20} className="mr-3 text-neon-red" /> 
                                    USER_DELETION_PROTOCOL
                                </h3>
                                <button onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })} className="text-slate-500 hover:text-white"><X size={20}/></button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="p-4 bg-neon-red/5 border border-neon-red/20 rounded text-[10px] text-neon-red uppercase tracking-widest leading-relaxed">
                                    <span className="font-black">XƏBƏRDARLIQ:</span> Bu istifadəçi sistemdən kənarlaşdırılacaq və "Silinmişlər" bazasına köçürüləcək.
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Silinmə Səbəbi</label>
                                    <textarea 
                                        autoFocus
                                        value={deleteModal.reason}
                                        onChange={(e) => setDeleteModal({ ...deleteModal, reason: e.target.value })}
                                        className="w-full h-32 bg-slate-900/80 border border-slate-800 rounded p-4 text-white text-xs focus:outline-none focus:border-neon-red transition-all resize-none"
                                        placeholder="Məsələn: Qayda pozuntusu, saxta məlumat və s..."
                                    />
                                </div>
                            </div>

                            <div className="p-8 bg-slate-900/50 border-t border-cyber-border flex justify-end space-x-4">
                                <button 
                                    onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                    className="px-6 py-3 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-all"
                                >
                                    Ləğv Et
                                </button>
                                <button 
                                    onClick={handleDeleteUser}
                                    disabled={!deleteModal.reason.trim() || deleteModal.isDeleting}
                                    className={`px-6 py-3 bg-neon-red text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center ${(!deleteModal.reason.trim() || deleteModal.isDeleting) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(255,51,51,0.5)]'}`}
                                >
                                    {deleteModal.isDeleting ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                                    {deleteModal.isDeleting ? 'Silinir...' : 'Təsdiqlə və Sil'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* System Feedback */}
                <div className="mt-10 p-6 border border-neon-blue/10 bg-neon-blue/[0.02] rounded flex items-start">
                    <Terminal className="text-neon-blue w-5 h-5 mr-4 mt-0.5" />
                    <div>
                        <h4 className="text-neon-blue font-bold uppercase tracking-widest text-[10px] mb-2">Security_Alert_System</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed max-w-2xl">
                            Bütün əməliyyatlar şifrələnmiş şəkildə qeyd olunur. Müvafiq status dəyişiklikləri iştirakçılara avtomatik olaraq SMTP protokolu vasitəsilə göndərilir. Unikal ziyarətçilər IP vasitəsilə identifikasiya olunur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
