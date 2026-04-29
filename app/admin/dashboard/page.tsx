'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'tabs'|'plans'|'schedule'|'trainers'|'equipment'|'settings'>('tabs');
  
  const [tabs, setTabs] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

  const [tabForm, setTabForm] = useState({ title: '', content: '', order: 0 });
  const [planForm, setPlanForm] = useState({ name: '', duration: '', price: '', features: '', order: 0 });
  const [scheduleForm, setScheduleForm] = useState({ day: '', time: '', className: '', trainer: '', order: 0 });
  const [trainerForm, setTrainerForm] = useState({ name: '', specialty: '', experience: '', bio: '', imageUrl: '', order: 0 });
const [equipmentForm, setEquipmentForm] = useState({ name:'', description:'', icon:'dumbbell', imageUrl:'', order:0 });

  async function loadAll() {
    const [t, p, s, tr, eq, st] = await Promise.all([
      fetch('/api/tabs').then(r => r.json()),
      fetch('/api/plans').then(r => r.json()),
      fetch('/api/schedule').then(r => r.json()),
      fetch('/api/trainers').then(r => r.json()),
      fetch('/api/equipment').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]);
    setTabs(t); setPlans(p); setSchedule(s); setTrainers(tr); setEquipment(eq); setSettings(st || {});
  }

  useEffect(() => { loadAll(); }, []);

  async function add(api: string, data: any, reset: () => void) {
    await fetch(`/api/${api}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
    reset();
    loadAll();
  }

  async function del(api: string, id: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/${api}`, { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({id}) });
    loadAll();
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/settings', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(settings) });
    alert('Settings saved!');
    loadAll();
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const tabsList = [
    { id: 'tabs', label: '📑 Tabs' },
    { id: 'plans', label: '💪 Plans' },
    { id: 'schedule', label: '📅 Schedule' },
    { id: 'trainers', label: '👥 Trainers' },
    { id: 'equipment', label: '🏋️ Equipment' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">🏋️ Admin Dashboard</h1>
          <div className="flex gap-3 items-center">
            <a href="/" target="_blank" className="text-sm text-blue-600 hover:underline">View Site →</a>
            <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabsList.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTab === t.id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>{t.label}</button>
          ))}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* TABS */}
        {activeTab === 'tabs' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tabs (About sections)</h2>
            <form onSubmit={(e) => { e.preventDefault(); add('tabs', tabForm, () => setTabForm({ title:'', content:'', order:0 })); }} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
              <input type="text" placeholder="Title (e.g. About Us)" value={tabForm.title} onChange={e => setTabForm({...tabForm, title:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <textarea placeholder="Content" value={tabForm.content} onChange={e => setTabForm({...tabForm, content:e.target.value})} className="w-full border rounded-lg px-3 py-2 min-h-[80px]" required />
                <input type="url" placeholder="Equipment Image URL (optional)" value={equipmentForm.imageUrl} onChange={e => setEquipmentForm({...equipmentForm, imageUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="number" placeholder="Order" value={tabForm.order} onChange={e => setTabForm({...tabForm, order:Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800">Add Tab</button>
            </form>
            <div className="space-y-2">
              {tabs.map(t => (
                <div key={t.id} className="bg-white border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{t.title}</h3><p className="text-sm text-gray-600">{t.content}</p></div>
                  <button onClick={() => del('tabs', t.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PLANS */}
        {activeTab === 'plans' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
            <form onSubmit={(e) => { e.preventDefault(); add('plans', planForm, () => setPlanForm({ name:'', duration:'', price:'', features:'', order:0 })); }} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
              <input type="text" placeholder="Plan Name" value={planForm.name} onChange={e => setPlanForm({...planForm, name:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Duration (e.g. 1 Year)" value={planForm.duration} onChange={e => setPlanForm({...planForm, duration:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Price (e.g. ₹15,000)" value={planForm.price} onChange={e => setPlanForm({...planForm, price:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Features" value={planForm.features} onChange={e => setPlanForm({...planForm, features:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="number" placeholder="Order" value={planForm.order} onChange={e => setPlanForm({...planForm, order:Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800">Add Plan</button>
            </form>
            <div className="space-y-2">
              {plans.map(p => (
                <div key={p.id} className="bg-white border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{p.name} - {p.price}</h3><p className="text-sm text-gray-600">{p.duration} · {p.features}</p></div>
                  <button onClick={() => del('plans', p.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SCHEDULE */}
        {activeTab === 'schedule' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Class Schedule</h2>
            <form onSubmit={(e) => { e.preventDefault(); add('schedule', scheduleForm, () => setScheduleForm({ day:'', time:'', className:'', trainer:'', order:0 })); }} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
              <input type="text" placeholder="Day" value={scheduleForm.day} onChange={e => setScheduleForm({...scheduleForm, day:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Time" value={scheduleForm.time} onChange={e => setScheduleForm({...scheduleForm, time:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Class Name" value={scheduleForm.className} onChange={e => setScheduleForm({...scheduleForm, className:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Trainer" value={scheduleForm.trainer} onChange={e => setScheduleForm({...scheduleForm, trainer:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="number" placeholder="Order" value={scheduleForm.order} onChange={e => setScheduleForm({...scheduleForm, order:Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800">Add Class</button>
            </form>
            <div className="space-y-2">
              {schedule.map(s => (
                <div key={s.id} className="bg-white border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{s.day} {s.time} - {s.className}</h3><p className="text-sm text-gray-600">Trainer: {s.trainer}</p></div>
                  <button onClick={() => del('schedule', s.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TRAINERS */}
        {activeTab === 'trainers' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Trainers</h2>
            <form onSubmit={(e) => { e.preventDefault(); add('trainers', trainerForm, () => setTrainerForm({ name:'', specialty:'', experience:'', bio:'', imageUrl:'', order:0 })); }} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
              <input type="text" placeholder="Name" value={trainerForm.name} onChange={e => setTrainerForm({...trainerForm, name:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Specialty (e.g. Strength Training)" value={trainerForm.specialty} onChange={e => setTrainerForm({...trainerForm, specialty:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Experience (e.g. 10 years)" value={trainerForm.experience} onChange={e => setTrainerForm({...trainerForm, experience:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <textarea placeholder="Bio" value={trainerForm.bio} onChange={e => setTrainerForm({...trainerForm, bio:e.target.value})} className="w-full border rounded-lg px-3 py-2 min-h-[80px]" required />
              <input type="text" placeholder="Image URL (optional)" value={trainerForm.imageUrl} onChange={e => setTrainerForm({...trainerForm, imageUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="number" placeholder="Order" value={trainerForm.order} onChange={e => setTrainerForm({...trainerForm, order:Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800">Add Trainer</button>
            </form>
            <div className="space-y-2">
              {trainers.map(t => (
                <div key={t.id} className="bg-white border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{t.name} - {t.specialty}</h3><p className="text-sm text-gray-600">{t.experience} · {t.bio}</p></div>
                  <button onClick={() => del('trainers', t.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EQUIPMENT */}
        {activeTab === 'equipment' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Equipment / Facilities</h2>
            <form onSubmit={(e) => { e.preventDefault(); add('equipment', equipmentForm, () => setEquipmentForm({ name:'', description:'', icon:'dumbbell', imageUrl:'', order:0 })); }} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
              <input type="text" placeholder="Name" value={equipmentForm.name} onChange={e => setEquipmentForm({...equipmentForm, name:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <input type="text" placeholder="Description" value={equipmentForm.description} onChange={e => setEquipmentForm({...equipmentForm, description:e.target.value})} className="w-full border rounded-lg px-3 py-2" required />
              <select value={equipmentForm.icon} onChange={e => setEquipmentForm({...equipmentForm, icon:e.target.value})} className="w-full border rounded-lg px-3 py-2">
                <option value="dumbbell">🏋️ Dumbbell</option>
                <option value="treadmill">🏃 Treadmill</option>
                <option value="bike">🚴 Bike</option>
                <option value="yoga">🧘 Yoga</option>
                <option value="boxing">🥊 Boxing</option>
                <option value="weights">💪 Weights</option>
                <option value="cardio">❤️ Cardio</option>
                <option value="rowing">🚣 Rowing</option>
              </select>
              <input type="number" placeholder="Order" value={equipmentForm.order} onChange={e => setEquipmentForm({...equipmentForm, order:Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800">Add Equipment</button>
            </form>
            <div className="space-y-2">
              {equipment.map(eq => (
                <div key={eq.id} className="bg-white border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{eq.name}</h3><p className="text-sm text-gray-600">{eq.description} · Icon: {eq.icon}</p></div>
                  <button onClick={() => del('equipment', eq.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Site Settings</h2>
            <form onSubmit={saveSettings} className="bg-white border rounded-xl p-6 space-y-3">
              <h3 className="font-semibold text-gray-700">Branding</h3>
              <input type="text" placeholder="Gym Name" value={settings.gymName || ''} onChange={e => setSettings({...settings, gymName:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="url" placeholder="Logo Image URL (e.g. https://...)" value={settings.logoUrl || ''} onChange={e => setSettings({...settings, logoUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <h3 className="font-semibold text-gray-700 pt-4">Contact</h3>
              <input type="text" placeholder="Phone" value={settings.phone || ''} onChange={e => setSettings({...settings, phone:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Email" value={settings.email || ''} onChange={e => setSettings({...settings, email:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Address" value={settings.address || ''} onChange={e => setSettings({...settings, address:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              
              <h3 className="font-semibold text-gray-700 pt-4">Social Media URLs</h3>
              <input type="url" placeholder="Instagram URL" value={settings.instagramUrl || ''} onChange={e => setSettings({...settings, instagramUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="url" placeholder="Facebook URL" value={settings.facebookUrl || ''} onChange={e => setSettings({...settings, facebookUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="url" placeholder="Twitter/X URL" value={settings.twitterUrl || ''} onChange={e => setSettings({...settings, twitterUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="url" placeholder="YouTube URL" value={settings.youtubeUrl || ''} onChange={e => setSettings({...settings, youtubeUrl:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              <input type="text" placeholder="WhatsApp Number (with country code)" value={settings.whatsappNum || ''} onChange={e => setSettings({...settings, whatsappNum:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800 mt-4">Save Settings</button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
