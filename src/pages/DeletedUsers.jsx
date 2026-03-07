import React, { useState, useEffect } from 'react';
import { 
    Shield, Trash2, RefreshCcw, ChevronLeft, Search,
    X, Info, Calendar, User as UserIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { userService } from '../services/user.service';

const DeletedUsers = () => {
    const { isLoggedIn, checkAuth, isLoading: authLoading } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            navigate('/admin/login');
        }
    }, [isLoggedIn, authLoading, navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchDeletedUsers();
        }
    }, [isLoggedIn, page, search]);

    const fetchDeletedUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll({ 
                page, 
                limit: 20, 
                isDeleted: true,
                fullName: search
            });
            setUsers(data.data);
            setTotalItems(data.total);
        } catch (err) {
            console.error('Fetch deleted users error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (userId) => {
        if (!window.confirm('Bu istifadəçini bərpa etmək istəyirsiniz?')) return;
        try {
            await userService.restore(userId);
            fetchDeletedUsers();
        } catch (err) {
            alert('Bərpa edilmədi.');
        }
    };

    if (authLoading || !isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono text-xs p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <button 
                            onClick={() => navigate('/admin')}
                            className="flex items-center text-neon-blue hover:text-white transition-colors mb-4 group"
                        >
                            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                            Geri Qayıt
                        </button>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            {">"} Trash_Bin / Silinmiş_İstifadəçilər
                        </h2>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="relative max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Silinmiş istifadəçi axtar..." 
                            className="w-full bg-slate-900/50 border border-slate-800 rounded py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-red transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-cyber-card border border-cyber-border rounded overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-red/50"></div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-900/80 border-b border-cyber-border text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                                <tr>
                                    <th className="px-8 py-6">İştirakçı</th>
                                    <th className="px-8 py-6">Silinmə Səbəbi</th>
                                    <th className="px-8 py-6">Silinmə Tarixi</th>
                                    <th className="px-8 py-6 text-right">Fəaliyyət</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cyber-border/30">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-white mb-1">{user.fullName}</div>
                                            <div className="text-slate-500 text-[10px] uppercase">{user.email}</div>
                                        </td>
                                        <td className="px-8 py-6 max-w-xs">
                                            <div className="text-neon-red truncate font-bold text-[10px]" title={user.deleteReason}>
                                                {user.deleteReason || 'Səbəb qeyd olunmayıb.'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-slate-500">
                                            {new Date(user.deletedAt).toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button 
                                                    onClick={() => setSelectedUser(user)}
                                                    className="p-2 border border-slate-700 text-slate-500 hover:text-white rounded transition-all"
                                                    title="Detallar"
                                                >
                                                    <Info size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleRestore(user.id)}
                                                    className="p-2 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 rounded transition-all"
                                                    title="Bərpa et"
                                                >
                                                    <RefreshCcw size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-slate-600 uppercase tracking-widest font-bold">
                                            Zibil qabı boşdur.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-cyber-card border border-cyber-border w-full max-w-xl rounded-lg overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-neon-red"></div>
                        
                        <div className="p-8 border-b border-cyber-border flex justify-between items-center">
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">İştirakçı Detalları</h3>
                            <button onClick={() => setSelectedUser(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start space-x-4">
                                <UserIcon className="text-slate-500 w-5 h-5 mt-1" />
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Ad Soyad / Komanda</div>
                                    <div className="text-white font-bold">{selectedUser.fullName} ({selectedUser.team.toUpperCase()})</div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Calendar className="text-slate-500 w-5 h-5 mt-1" />
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Qeydiyyat / Silinmə</div>
                                    <div className="text-slate-300">
                                        {new Date(selectedUser.createdAt).toLocaleDateString()} / {new Date(selectedUser.deletedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-neon-red/5 border border-neon-red/20 p-6 rounded">
                                <div className="text-[10px] text-neon-red uppercase tracking-widest font-black mb-3">SİlİNmə Səbəbİ</div>
                                <div className="text-slate-300 leading-relaxed italic">"{selectedUser.deleteReason}"</div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border-t border-cyber-border flex justify-end">
                            <button 
                                onClick={() => setSelectedUser(null)}
                                className="px-6 py-3 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-all"
                            >
                                Bağla
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeletedUsers;
