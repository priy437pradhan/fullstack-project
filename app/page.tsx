import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [tabs, plans, schedule] = await Promise.all([
    prisma.tab.findMany({ orderBy: { order: 'asc' } }),
    prisma.membershipPlan.findMany({ orderBy: { order: 'asc' } }),
    prisma.classSchedule.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            <p className="text-sm sm:text-base font-medium text-gray-500 tracking-widest uppercase mb-6">
              Power Gym
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6">
              Stronger.
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                Every day.
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Premium equipment. Expert trainers. A community that pushes you forward.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-3.5 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-all">
                Learn more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TABS / FEATURES SECTION */}
      {tabs.length > 0 && (
        <section className="bg-gray-50 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">
                Why us
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Built for results.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {tabs.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl p-8 sm:p-10 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-tight">
                    {t.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {t.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MEMBERSHIP PLANS SECTION */}
      {plans.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">
                Membership
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                Choose your plan.
              </h2>
              <p className="text-lg text-gray-500 font-light">
                Flexible options. No hidden fees.
              </p>
            </div>

            {/* Mobile: Cards. Desktop: Cards in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((p, i) => (
                <div
                  key={p.id}
                  className={`rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:scale-[1.02] ${
                    i === 1
                      ? 'bg-gray-900 text-white shadow-2xl'
                      : 'bg-gray-50 text-gray-900'
                  }`}
                >
                  <p
                    className={`text-sm font-medium tracking-widest uppercase mb-4 ${
                      i === 1 ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {p.name}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl sm:text-5xl font-semibold tracking-tight">
                      {p.price}
                    </span>
                    <span
                      className={`text-base ml-2 ${
                        i === 1 ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      / {p.duration}
                    </span>
                  </div>
                  <p
                    className={`text-base leading-relaxed mb-8 ${
                      i === 1 ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {p.features}
                  </p>
                  <button
                    className={`w-full py-3 rounded-full font-medium transition-all ${
                      i === 1
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Choose {p.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE SECTION */}
      {schedule.length > 0 && (
        <section className="bg-gray-50 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">
                Schedule
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                This week's classes.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {schedule.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow"
                >
                  <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-2">
                    {s.day}
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                    {s.time}
                  </p>
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    {s.className}
                  </p>
                  <p className="text-sm text-gray-500">with {s.trainer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {tabs.length === 0 && plans.length === 0 && schedule.length === 0 && (
        <section className="py-20 sm:py-28">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-lg text-gray-500 font-light">
              Welcome. Content coming soon.
            </p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Power Gym. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Transform your body. Transform your life.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
