import React from 'react';
import { ShieldCheck, Crosshair, HelpCircle, Server, Code, FileSearch, ShieldAlert, Terminal } from 'lucide-react';

const TeamDetail = ({ team, colorClass, title, desc, tasks, icon: Icon }) => {
  const bgColor = team === 'blue' ? 'bg-neon-blue/5' : 'bg-neon-red/5';
  const borderColor = team === 'blue' ? 'border-neon-blue' : 'border-neon-red';
  const textColor = team === 'blue' ? 'text-neon-blue' : 'text-neon-red';
  const iconBg = team === 'blue' ? 'bg-neon-blue/10' : 'bg-neon-red/10';
  const iconBorder = team === 'blue' ? 'border-neon-blue/20' : 'border-neon-red/20';
  const hoverBorder = team === 'blue' ? 'hover:border-neon-blue' : 'hover:border-neon-red';

  return (
    <div className={`py-16 md:py-24 px-6 relative overflow-hidden`}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${bgColor} blur-[120px] rounded-full pointer-events-none`}></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className={`md:w-1/2 mb-8 md:mb-0`}>
          <div className={`w-20 h-20 md:w-32 md:h-32 mb-8 ${iconBg} rounded-2xl flex items-center justify-center border ${iconBorder} group`}>
            <Icon className={`w-10 h-10 md:w-16 md:h-16 ${textColor} transition-transform group-hover:scale-110`} />
          </div>
          <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase text-white`}>
            {title}
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">{desc}</p>
        </div>
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tasks.map((task, idx) => (
            <div key={idx} className={`bg-cyber-card p-6 border border-cyber-border ${hoverBorder} transition-all duration-300 rounded-xl`}>
               <div className={`${textColor} mb-4`}>{task.icon}</div>
               <h4 className="text-white font-bold mb-2 uppercase tracking-wide">{task.title}</h4>
               <p className="text-sm text-slate-500">{task.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlueTeamSection = () => {
    const tasks = [
        { icon: <ShieldCheck />, title: "Sərtləşdirmə", details: "Standart təhlükəsizlik yeniləmələrini tətbiq edin və kkernel parametrlərini sıxın." },
        { icon: <Server />, title: "Xidmətlər", details: "Bütün aktiv prosesləri siyahıya alın və qanuni server xidmətlərini qoruyun." },
        { icon: <Code />, title: "Skriptləşdirmə", details: "Sızma cəhdləri barədə xəbərdarlıq etmək üçün Bash skriptləri ilə log analizini avtomatlaşdırın." },
        { icon: <HelpCircle />, title: "Gizli Fayllar", details: "Kritik konfidensial faylları tapın və onları sızdırılmaqdan qoruyun." }
    ];

    return (
        <TeamDetail 
            team="blue" 
            color="neon-blue" 
            title="BLUE TEAM ƏMƏLİYYATLARI" 
            desc="Blue Team-in məqsədi serverin sərtləşdirilməsidir (hardening). Red Team hücuma başlamazdan əvvəl boşluqları müəyyən etməli və yamalar (patch) tətbiq etməlisiniz."
            tasks={tasks}
            icon={ShieldCheck}
        />
    );
}

const RedTeamSection = () => {
    const tasks = [
        { icon: <Crosshair />, title: "Skanlama", details: "Açıq portları müəyyən edin və serverdə işləyən xidmətləri analzi edin." },
        { icon: <FileSearch />, title: "Araşdırma", details: "Zəif icazələri və Flag-ləri axtararaq fayl sistemini araşdırın." },
        { icon: <ShieldAlert />, title: "İstismar", details: "Daha yüksək səviyyəli giriş əldə etmək üçün yanlış konfiqurasiya edilmiş xidmətləri istismar edin." },
        { icon: <Terminal />, title: "Flag Ələ Keçirmə", details: "Gizli sətri bərpa edin və onu yoxlama API-na təqdim edin." }
    ];

    return (
        <TeamDetail 
            team="red" 
            color="neon-red" 
            title="RED TEAM ƏMƏLİYYATLARI" 
            desc="Red Team üzvləri sızma mütəxəssisləridir. Blue Team-in müdafiəsindəki zəif tərəfləri tapmaq və gizli Flag-i ələ keçirmək üçün kəşfiyyatdan istifadə edin."
            tasks={tasks}
            icon={Terminal}
        />
    );
}

export { BlueTeamSection, RedTeamSection };
