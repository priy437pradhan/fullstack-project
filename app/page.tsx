import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const equipmentIcons: Record<string, string> = {
  dumbbell: '🏋️',
  treadmill: '🏃',
  bike: '🚴',
  yoga: '🧘',
  boxing: '🥊',
  weights: '💪',
  cardio: '❤️',
  rowing: '🚣',
};

export default async function HomePage() {
  const [tabs, plans, schedule, trainers, equipment, settings] = await Promise.all([
    prisma.tab.findMany({ orderBy: { order: 'asc' } }),
    prisma.membershipPlan.findMany({ orderBy: { order: 'asc' } }),
    prisma.classSchedule.findMany({ orderBy: { order: 'asc' } }),
    prisma.trainer.findMany({ orderBy: { order: 'asc' } }),
    prisma.equipment.findMany({ orderBy: { order: 'asc' } }),
    prisma.siteSettings.findUnique({ where: { id: 'singleton' } }),
  ]);

  const gymName = settings?.gymName || 'Power Gym';
  const tagline = settings?.tagline || 'Stronger. Every day.';

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              💪
            </div>
            <span className="text-xl font-semibold tracking-tight">{gymName}</span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">About</a>
            <a href="#trainers" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Trainers</a>
            <a href="#equipment" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Equipment</a>
            <a href="#plans" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Pricing</a>
            <a href="#schedule" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Schedule</a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {settings?.twitterUrl && (
              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
            {settings?.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-6">Welcome to {gymName}</p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] mb-8">
              {tagline.split('.')[0]}.
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
                {tagline.split('.').slice(1).join('.').trim() || 'Every day.'}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Premium equipment. World-class trainers. A community that pushes you forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#plans" className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20">
                Join Now
              </a>
              <a href="#trainers" className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all border border-gray-200">
                Meet Our Trainers →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TABS */}
      {tabs.length > 0 && (
        <section id="about" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">Why us</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">Built for results.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {tabs.map((t) => (
                <div key={t.id} className="bg-gray-50 rounded-3xl p-8 sm:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-tight">{t.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{t.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRAINERS */}
      {trainers.length > 0 && (
        <section id="trainers" className="py-24 sm:py-32 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-4">Our Team</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">Meet your trainers.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {trainers.map((t) => (
                <div key={t.id} className="bg-gray-800 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    {t.imageUrl ? (
                      <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-7xl">💪</div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-2">{t.specialty}</p>
                    <h3 className="text-2xl font-semibold mb-1">{t.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{t.experience}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EQUIPMENT */}
      {equipment.length > 0 && (
        <section id="equipment" className="py-24 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">Facilities</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">Premium equipment.</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {equipment.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-5xl sm:text-6xl mb-4">{equipmentIcons[e.icon] || '🏋️'}</div>
                  <h3 className="text-lg font-semibold mb-2">{e.name}</h3>
                  <p className="text-sm text-gray-600">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PLANS */}
      {plans.length > 0 && (
        <section id="plans" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">Membership</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">Choose your plan.</h2>
              <p className="text-lg text-gray-500 font-light">Flexible. No hidden fees.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {plans.map((p, i) => {
                const featured = i === 1;
                return (
                  <div key={p.id} className={`rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:scale-[1.03] ${featured ? 'bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-2xl shadow-gray-900/30 lg:scale-105' : 'bg-gray-50 text-gray-900 border border-gray-100'}`}>
                    {featured && <p className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-medium tracking-widest uppercase mb-4">Most Popular</p>}
                    <p className={`text-sm font-medium tracking-widest uppercase mb-4 ${featured ? 'text-gray-300' : 'text-gray-500'}`}>{p.name}</p>
                    <div className="mb-6">
                      <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
                      <span className={`text-base ml-2 ${featured ? 'text-gray-400' : 'text-gray-500'}`}>/ {p.duration}</span>
                    </div>
                    <p className={`text-base leading-relaxed mb-8 ${featured ? 'text-gray-300' : 'text-gray-600'}`}>{p.features}</p>
                    <button className={`w-full py-3.5 rounded-full font-medium transition-all ${featured ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                      Choose {p.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {schedule.length > 0 && (
        <section id="schedule" className="py-24 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">Schedule</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">This week's classes.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {schedule.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow border-l-4 border-gray-900">
                  <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-2">{s.day}</p>
                  <p className="text-3xl font-semibold tracking-tight mb-2">{s.time}</p>
                  <p className="text-lg font-medium text-gray-900 mb-1">{s.className}</p>
                  <p className="text-sm text-gray-500">with {s.trainer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {tabs.length === 0 && plans.length === 0 && schedule.length === 0 && trainers.length === 0 && equipment.length === 0 && (
        <section className="py-32 text-center">
          <p className="text-lg text-gray-500 font-light">Welcome. Content coming soon.</p>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-2xl">💪</div>
                <span className="text-2xl font-semibold tracking-tight">{gymName}</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">{tagline}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {settings?.phone && <li>📞 {settings.phone}</li>}
                {settings?.email && <li>✉️ {settings.email}</li>}
                {settings?.address && <li>📍 {settings.address}</li>}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Follow us</h4>
              <div className="flex gap-3">
                {settings?.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">📷</a>}
                {settings?.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">📘</a>}
                {settings?.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">🐦</a>}
                {settings?.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">📺</a>}
                {settings?.whatsappNum && <a href={`https://wa.me/${settings.whatsappNum.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">💬</a>}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 {gymName}. All rights reserved.</p>
            <p>Transform your body. Transform your life.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
