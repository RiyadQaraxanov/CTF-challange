import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const DiscordHandler = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [message, setMessage] = useState('');
    const code = searchParams.get('code');

    useEffect(() => {
        if (code && status === 'idle') {
            handleJoin();
        }
    }, [code]);

    const handleJoin = async () => {
        setStatus('loading');
        try {
            const res = await api.post('/discord/join', { code });
            setStatus('success');
            setMessage(`Uğurla qoşuldunuz! Discord: ${res.data.discordUser}`);
            
            // Clean up the URL
            setTimeout(() => {
                setSearchParams({});
            }, 3000);
        } catch (err) {
            console.error('Discord join error:', err);
            setStatus('error');
            setMessage('Discord-a qoşulmaq mümkün olmadı. Zəhmət olmasa təkrar cəhd edin.');
        }
    };

    if (!code) return null;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 animate-in slide-in-from-top-10 fade-in duration-500">
            <div className={`p-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-center space-x-4 ${
                status === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                status === 'error' ? 'bg-neon-red/10 border-neon-red/50 text-neon-red' :
                'bg-neon-blue/10 border-neon-blue/50 text-neon-blue'
            }`}>
                {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {status === 'error' && <AlertCircle className="w-5 h-5" />}
                <p className="text-xs font-black uppercase tracking-widest">{message || 'Discord serverinə qoşulursunuz...'}</p>
            </div>
        </div>
    );
};

export default DiscordHandler;
