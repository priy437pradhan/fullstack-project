'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Tab = { id: string; title: string; content: string; order: number };
type Plan = { id: string; name: string; duration: string; price: string; features: string; order: number };
type Schedule = { id: string; day: string; time: string; className: string; trainer: string; order: number };

export default function DashboardPage() {
  const router = useRouter();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  // Form states
  const [tabForm, setTabForm] = useState({ title: '', content: '', order: 0 });
  const [planForm, setPlanForm] = useState({ name: '', duration: '', price: '', features: '', order: 0 });
  const [scheduleForm, setScheduleForm] = useState({ day: '', time: '', className: '', trainer: '', order: 0 });

  async function loadData() {
    const [t, p, s] = await Promise.all([
      fetch('/api/tabs').then(r => r.json()),
      fetch('/api/plans').then(r => r.json()),
      fetch('/api/schedule').then(r => r.json()),
    ]);
    setTabs(t);
    setPlans(p);
    setSchedule(s);
  }

  useEffect(() => { loadData(); }, []);

  async function addTab(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/tabs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tabForm) });
    setTabForm({ title: '', content: '', order: 0 });
    loadData();
  }

  async function addPlan(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/plans', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(planForm) });
    setPlanForm({ name: '', duration: '', price: '', features: '', order: 0 });
    loadData();
  }

  async function addSchedule(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/schedule', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(scheduleForm) });
    setScheduleForm({ day: '', time: '', className: '', trainer: '', order: 0 });
    loadData();
  }

  async function deleteItem(api: string, id: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/${api}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    loadData();
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🏋️ Gym Admin Dashboard</h1>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
      </div>

      {/* TABS SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📑 Tabs (Sections)</h2>
        <form onSubmit={addTab} className="bg-gray-50 border rounded-lg p-4 mb-4 space-y-3">
          <input type="text" placeholder="Tab Title (e.g., About Us)" value={tabForm.title} onChange={e => setTabForm({ ...tabForm, title: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <textarea placeholder="Tab Content" value={tabForm.content} onChange={e => setTabForm({ ...tabForm, content: e.target.value })} className="w-full border rounded px-3 py-2 min-h-[80px]" required />
          <input type="number" placeholder="Order (0, 1, 2...)" value={tabForm.order} onChange={e => setTabForm({ ...tabForm, order: Number(e.target.value) })} className="w-full border rounded px-3 py-2" />
          <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">Add Tab</button>
        </form>
        <div className="space-y-2">
          {tabs.map(t => (
            <div key={t.id} className="border rounded p-3 flex justify-between items-start bg-white">
              <div>
                <h3 className="font-semibold">{t.title} <span className="text-xs text-gray-400">(order: {t.order})</span></h3>
                <p className="text-sm text-gray-600">{t.content}</p>
              </div>
              <button onClick={() => deleteItem('tabs', t.id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">💪 Membership Plans (Table)</h2>
        <form onSubmit={addPlan} className="bg-gray-50 border rounded-lg p-4 mb-4 space-y-3">
          <input type="text" placeholder="Plan Name (e.g., Premium)" value={planForm.name} onChange={e => setPlanForm({ ...planForm, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Duration (e.g., 1 Year)" value={planForm.duration} onChange={e => setPlanForm({ ...planForm, duration: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Price (e.g., ₹15000)" value={planForm.price} onChange={e => setPlanForm({ ...planForm, price: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Features (e.g., All access, Trainer, Spa)" value={planForm.features} onChange={e => setPlanForm({ ...planForm, features: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="number" placeholder="Order" value={planForm.order} onChange={e => setPlanForm({ ...planForm, order: Number(e.target.value) })} className="w-full border rounded px-3 py-2" />
          <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">Add Plan</button>
        </form>
        <div className="space-y-2">
          {plans.map(p => (
            <div key={p.id} className="border rounded p-3 flex justify-between items-start bg-white">
              <div>
                <h3 className="font-semibold">{p.name} - {p.price}</h3>
                <p className="text-sm text-gray-600">{p.duration} · {p.features}</p>
              </div>
              <button onClick={() => deleteItem('plans', p.id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📅 Class Schedule</h2>
        <form onSubmit={addSchedule} className="bg-gray-50 border rounded-lg p-4 mb-4 space-y-3">
          <input type="text" placeholder="Day (e.g., Monday)" value={scheduleForm.day} onChange={e => setScheduleForm({ ...scheduleForm, day: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Time (e.g., 6:00 AM)" value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Class Name (e.g., Yoga)" value={scheduleForm.className} onChange={e => setScheduleForm({ ...scheduleForm, className: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Trainer Name" value={scheduleForm.trainer} onChange={e => setScheduleForm({ ...scheduleForm, trainer: e.target.value })} className="w-full border rounded px-3 py-2" required />
          <input type="number" placeholder="Order" value={scheduleForm.order} onChange={e => setScheduleForm({ ...scheduleForm, order: Number(e.target.value) })} className="w-full border rounded px-3 py-2" />
          <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">Add Class</button>
        </form>
        <div className="space-y-2">
          {schedule.map(s => (
            <div key={s.id} className="border rounded p-3 flex justify-between items-start bg-white">
              <div>
                <h3 className="font-semibold">{s.day} {s.time} - {s.className}</h3>
                <p className="text-sm text-gray-600">Trainer: {s.trainer}</p>
              </div>
              <button onClick={() => deleteItem('schedule', s.id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
