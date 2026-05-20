import { ArrowLeft, CaretDown } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

const APP_BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const USE_HASH_ROUTING = !import.meta.env.DEV;

function withBase(path) {
  if (!path.startsWith('/')) return path;
  if (!APP_BASE || APP_BASE === '/') return path;
  return `${APP_BASE}${path}`;
}

function navigateTo(path) {
  if (USE_HASH_ROUTING) {
    window.location.hash = path;
    return;
  }
  window.location.assign(withBase(path));
}

const filters = ['全部', '营销专题', '玩法专题', '活动状态'];
const API_URL = '/home/getRewardActivityList';

function parseDate(input) {
  if (!input) return null;
  const normalized = String(input).replace(' ', 'T');
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatCompactDate(input) {
  const d = parseDate(input);
  if (!d) return '--.--.--';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function getProgressStatus(startTime, endTime) {
  const now = new Date();
  const start = parseDate(startTime);
  const end = parseDate(endTime);
  if (start && now < start) return '报名中';
  if (end && now > end) return '已结束';
  return '进行中';
}

function toCategoryName(raw = {}) {
  const name = raw.activityName || '';
  if (name.includes('专题') || name.includes('会场')) return '营销';
  if (name.includes('目的地') || name.includes('玩法')) return '玩法';
  return '其它';
}

function mapActivity(raw = {}) {
  const progress = getProgressStatus(raw.activityStartTime, raw.activityEndTime);
  return {
    id: raw.promotionSceneId ?? raw.activityLink ?? Math.random(),
    category: toCategoryName(raw),
    joined: '未参加',
    progress,
    title: raw.activityName || '奖励活动',
    time: `${formatCompactDate(raw.activityStartTime)} - ${formatCompactDate(raw.activityEndTime)}`,
    action: progress === '进行中' ? '查看详情' : '立即报名',
    banner: raw.materialLink || 'https://placehold.co/1200x420/FFE9D8/8D5B3E?text=ACTIVITY',
    link: raw.activityLink || ''
  };
}

export default function RewardActivityPage({ standalone = false }) {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const fetchActivities = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: '1', pageSize: '20' })
      });
      if (!resp.ok) {
        throw new Error(`活动接口请求失败: ${resp.status}`);
      }
      const json = await resp.json();
      const payload = json?.data ?? {};
      const list = Array.isArray(payload.list) ? payload.list : (Array.isArray(payload) ? payload : []);
      setActivities(list.map(mapActivity));
    } catch (e) {
      setLoadError(e.message || '活动加载失败');
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const shownActivities = useMemo(() => {
    if (activeFilter === '全部') return activities;
    if (activeFilter === '营销专题') return activities.filter((a) => a.category === '营销');
    if (activeFilter === '玩法专题') return activities.filter((a) => a.category === '玩法');
    if (activeFilter === '活动状态') return activities.filter((a) => a.progress !== '已结束');
    return activities;
  }, [activities, activeFilter]);

  return (
    <section className={`page overflow-hidden ${standalone ? 'h-full pb-0' : 'pb-[80px]'}`}>
      <div className={`h-full ${standalone ? 'p-0' : 'p-4 md:p-0'}`}>
        <div className="h-full flex flex-col bg-[#F5F6FA] border-0 rounded-none md:rounded-3xl md:overflow-hidden md:border md:border-[#FFD7C7] md:shadow-[0_12px_30px_rgba(255,120,64,0.15)]">
          <div className="sticky top-0 z-20 px-4 py-3 bg-white border-b border-[#FFE2D1]">
            <div className="flex items-center gap-3">
              {standalone ? (
                <button onClick={() => navigateTo('/')} className="w-10 h-10 rounded-full bg-[#FFF3EC] text-[#FF6A2A] flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <h2 className="text-[20px] font-bold text-[#2B3442] flex-1">奖励活动</h2>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`h-[28px] rounded-full text-[12px] font-semibold flex items-center justify-center gap-0.5 border-none ${
                    activeFilter === f ? 'bg-[#FF5000] text-white' : 'bg-[#F5F6F8] text-[#333333]'
                  }`}
                >
                  {f}
                  {f !== '全部' ? <CaretDown size={12} className={activeFilter === f ? 'text-white' : 'text-[#999999]'} /> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {loading ? <div className="text-[13px] text-[#9b7b68] text-center py-6">活动加载中...</div> : null}
            {!loading && loadError ? <div className="text-[13px] text-[#d94b3d] text-center py-6">{loadError}</div> : null}
            {!loading && !loadError && shownActivities.length === 0 ? <div className="text-[13px] text-[#9b7b68] text-center py-6">暂无活动</div> : null}
            {shownActivities.map((a) => (
              <article key={a.id} className="bg-white rounded-2xl border border-[#FFE1CD] overflow-hidden">
                <div className="relative">
                  <img src={a.banner} alt={a.title} className="w-full h-[124px] object-cover" />
                  <span className="absolute left-2 top-2 h-6 px-2 rounded-md bg-black/40 backdrop-blur-sm text-white text-[11px] inline-flex items-center">{a.category}</span>
                  <span className="absolute right-2 top-2 h-6 px-2.5 rounded-full bg-white/95 text-[#333333] text-[11px] inline-flex items-center">{a.joined}</span>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex items-center whitespace-nowrap bg-[#FFF4ED] text-[#FF5000] px-1.5 py-[1px] rounded-[3px] text-[10px] leading-none">{a.progress}</span>
                        <h3 className="text-[15px] text-[#111111] font-bold leading-[1.35] truncate">{a.title}</h3>
                      </div>
                      <p className="mt-1 text-[12px] text-[#999999]">{a.time}</p>
                    </div>
                    <button onClick={() => a.link && window.open(a.link, '_blank')} className="shrink-0 h-[28px] px-3.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF5000] text-white text-[12px] font-bold">{a.action}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
