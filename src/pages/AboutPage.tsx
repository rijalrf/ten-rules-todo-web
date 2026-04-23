import profileImg from '@src/assets/profile.jpg';

const AboutPage = () => {
    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Tentang Saya</h2>
                <p className="text-slate-500 font-medium text-lg text-indigo-600">Dibalik Layar TodoApp</p>
            </div>

            <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                
                <div className="relative mb-8">
                  <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-25"></div>
                  <img
                      src={profileImg}
                      alt="Profile M Rijal Rifai"
                      className="relative w-40 h-40 rounded-full shadow-2xl object-cover border-4 border-white"
                  />
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-1">M Rijal Rifai</h3>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-8">Software Engineer & Team Lead</p>
                
                <div className="max-w-md text-center">
                  <p className="text-slate-600 text-lg leading-relaxed italic">
                    "Berkomitmen membangun sistem yang <span className="text-indigo-600 font-bold">Scalable</span> dan <span className="text-indigo-600 font-bold">Reliable</span> melalui standarisasi kode yang ketat."
                  </p>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100 w-full grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-slate-900">10+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proyek</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">5th</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tahun</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">95%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skalabilitas</p>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
