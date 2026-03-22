import React, { useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Star, 
  Coffee, 
  ShieldCheck, 
  ChevronRight, 
  Menu,
  X,
  Clock,
  Waves
} from 'lucide-react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  useLocation
} from 'react-router-dom';
import Lenis from 'lenis';

// --- DATA ---
const rooms = [
  { 
    id: "superior-queen", 
    title: "Superior Room (Queen)", 
    price: "2,800", 
    img: "https://themaximilianhotel.com/wp-content/uploads/2025/05/EOSR1497-scaled.jpg",
    desc: "A private sanctuary where modern elegance meets essential comfort. Features premium bedding and an urban oasis feel.",
    features: ["Queen Size Bed", "Standard Comfort", "High Speed WiFi", "Work Desk"]
  },
  { 
    id: "superior-twin", 
    title: "Superior Room (Twin)", 
    price: "2,800", 
    img: "https://themaximilianhotel.com/wp-content/uploads/2025/04/Copy-of-PART-1-ROOMS-56-scaled.jpg",
    desc: "Perfect for colleagues or friends. Features two comfortable twin beds and all essential business amenities.",
    features: ["Twin Beds", "Morning Workspace", "Smart TV", "City View"]
  },
  { 
    id: "deluxe-room", 
    title: "Deluxe Room", 
    price: "3,200", 
    img: "https://themaximilianhotel.com/wp-content/uploads/2025/04/EOSR1519-1536x1024-1.webp",
    desc: "Elevated space with refined decor, designed for guests seeking a touch more luxury and space.",
    features: ["Modern Design", "Queen Size Bed", "High Speed WiFi", "En-suite Bath"]
  },
  { 
    id: "premier-room", 
    title: "Premier Room", 
    price: "3,800", 
    img: "https://themaximilianhotel.com/wp-content/uploads/2025/04/EOSR1350-1536x1024-2.webp",
    desc: "The high-fidelity showcase room, featuring top-tier amenities and the best views in the standard category.",
    features: ["Balcony Access", "Extra Privacy", "Luxury Linen", "Nespresso Machine"]
  },
  { 
    id: "1-bedroom-suite", 
    title: "1 Bedroom Suite", 
    price: "4,500", 
    img: "https://themaximilianhotel.com/wp-content/uploads/2025/04/EOSR1323-2.webp",
    desc: "The pinnacle of our accommodations, offering separate living and sleeping areas for ultimate privacy.",
    features: ["Separate Living Area", "King Size Bed", "Kitchenette", "Premium Bath Prep"]
  }
];

const facilities = [
  { 
    title: "Gusto Restaurant", 
    desc: "Signature Dining", 
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800",
    longDesc: "Blending international techniques with local ingredients. High-end bistro serving power breakfasts, business lunches, and romantic candlelit dinners with views of manicured gardens.",
    hours: "6:00 AM – 9:30 PM",
    path: "/dining"
  },
  { 
    title: "The Grand Ballroom", 
    desc: "Events & Weddings", 
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800",
    longDesc: "Crystal chandeliers and soaring ceilings. Accommodates up to 150 guests for banquets and 200 for cocktail receptions. Features professional partitioning and planning assistance.",
    capacity: "Up to 200 Guests",
    path: "/events"
  },
  { 
    title: "Kings Row Cafe", 
    desc: "Signature Coffee", 
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800",
    longDesc: "Specially curated beans from world-renowned regions. Certified baristas using precision brewing and state-of-the-art machines in an elegant lobby setting.",
    feature: "Afternoon Tea & Specialty Roasts",
    path: "/dining"
  }
];

const amenities = [
  { icon: <Phone size={24}/>, label: "Airport Transfers" },
  { icon: <Coffee size={24}/>, label: "Breakfast Included" },
  { icon: <ShieldCheck size={24}/>, label: "Electronic Safe" },
  { icon: <Waves size={24}/>, label: "Free Wi-Fi" },
  { icon: <MapPin size={24}/>, label: "Secure Parking" },
  { icon: <Waves size={24}/>, label: "Private Pool" },
  { icon: <ArrowRight size={24}/>, label: "Smart TV" },
  { icon: <ShieldCheck size={24}/>, label: "Under Protection" }
];
// --- COMPONENTS ---

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = React.useRef<any>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-slate-900/20 group">
             <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform">M</span>
          </div>
          <div className="hidden sm:block">
            <span className="block font-bold text-lg leading-none tracking-tight">The Maximilian</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Sanctuary in Cauayan</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 bg-white/70 backdrop-blur-2xl border border-white/50 px-8 py-3 rounded-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all">
          {[
            { name: 'Home', path: '/' },
            { name: 'Accommodations', path: '/rooms' },
            { name: 'Dining', path: '/dining' },
            { name: 'Events', path: '/events' },
            { name: 'Contact', path: '/contact' }
          ].map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-[11px] uppercase tracking-[0.1em] font-bold transition-all relative ${isActive(link.path) ? 'text-slate-950' : 'text-slate-400 hover:text-slate-800'}`}
            >
              {link.name}
              {isActive(link.path) && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="hidden md:block bg-slate-900 text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-2xl shadow-slate-900/10 hover:scale-[0.98] active:scale-95 transition-all">
          Book Your Stay
        </Link>
        
        <button className="md:hidden z-50 p-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-[3rem] px-6 pt-32 pb-16 flex flex-col gap-8 z-40 border-b border-slate-100"
          >
            {['Home', 'Rooms', 'Contact'].map((item) => (
              <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl font-bold tracking-tighter text-slate-900">
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/30 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-100 rounded-full w-fit mb-8"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">A Boutique Haven</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-10"
          >
            Discover <span className="text-slate-400 italic font-serif font-light">Your</span> <br /> 
            <span className="text-amber-600 relative">
              Perfect Stay.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 10 Q 50 0 100 10" stroke="currentColor" strokeWidth="10" fill="transparent" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12 max-w-lg font-medium"
          >
            Exceptional hospitality. Elegant spaces. Tailored amenities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/rooms" className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-center shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3">
              View Rooms <ArrowRight size={20} />
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+40}`} alt="guest" />)}
              </div>
              <div className="flex flex-col">
                <div className="flex text-amber-500"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">500+ Happy Guests</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="relative h-[600px] md:h-[750px] w-full rounded-[4rem] magic-border p-1 shadow-2xl"
        >
          <div className="magic-border-inner h-full w-full rounded-[3.8rem] overflow-hidden">
            <img 
              src="https://themaximilianhotel.com/wp-content/uploads/2025/06/Copy-of-PART-3-9-scaled-r4o2vyvbjuvyz4bsnfawv7c39xduq7r74qm8ctbbns-2.webp" 
              className="w-full h-full object-cover saturate-[1.1] scale-105 active:scale-100 transition-transform duration-1000"
              alt="The Maximilian Hotel Lobby"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 hidden sm:block">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><Waves size={32} /></div>
              <div>
                <span className="block font-bold text-xl tracking-tight leading-none">Relax in Style</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">A true vacation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">World-Class Amenities</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium leading-relaxed">Experience hospitality at its best with our curated range of premium services.</p>
        </div>
        
        {/* Bento Grid for Amenities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {amenities.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group p-10 bg-white rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors uppercase">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {facilities.slice(0, 3).map((exp, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="h-64 rounded-3xl overflow-hidden mb-10">
                <img src={exp.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={exp.title} />
              </div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{exp.desc}</span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">{exp.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-8 line-clamp-2">{exp.longDesc}</p>
              <Link to={exp.path} className="flex items-center gap-2 text-slate-900 font-bold group-hover:gap-4 transition-all">
                Explore Details <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-16 px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-24 pb-24 border-b border-white/10">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">See you in <br /> Cauayan.</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">The Maximilian Hotel. Your sophisticated sanctuary in the heart of the city.</p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <span className="block text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8">Navigation</span>
              <div className="flex flex-col gap-6 font-bold text-lg tracking-tight">
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
                <Link to="/rooms" className="hover:text-amber-500 transition-colors">Rooms</Link>
                <Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <span className="block text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8">Contact</span>
              <div className="flex flex-col gap-6 text-slate-400 font-medium leading-relaxed">
                <p>Don Mariano Marcos Ave,<br />Cauayan City, 3305 Isabela</p>
                <p>+63 (078) 323 1234<br />info@themaximilianhotel.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white/30 text-[10px] font-bold uppercase tracking-widest">
          <span>© 2026 The Maximilian Hotel. Built for Excellence.</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- PAGES ---

function HomePage() {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Hero />
      <Experience />
      <section className="bg-slate-900 py-40 rounded-t-[5rem] -mt-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div>
             <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter mb-10">Signature <br /> Comfort.</h2>
             <p className="text-slate-400 text-xl leading-relaxed font-medium mb-12">Each space is meticulously designed to provide you with the ultimate sanctuary from busy city life.</p>
             <Link to="/rooms" className="inline-flex bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-bold hover:scale-[0.98] transition-transform">
               Explore Accommodations
             </Link>
           </div>
           <div className="grid grid-cols-2 gap-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[100px] -z-10" />
              <img src={rooms[0].img} className="rounded-3xl aspect-[3/4] object-cover h-64 mt-12 w-full" alt="room 1" />
              <img src={rooms[1].img} className="rounded-3xl aspect-[3/4] object-cover h-64 w-full" alt="room 2" />
           </div>
        </div>
      </section>
    </motion.div>
  );
}

function RoomsPage() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Spacious Accommodations</h1>
          <p className="text-slate-500 text-xl max-w-2xl font-medium leading-relaxed">Warmth and hospitality at its best. Find your perfect stay.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rooms.map((room, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <div className="h-[450px] overflow-hidden relative">
                <img src={room.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={room.title} />
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl font-bold shadow-2xl">
                   from <span className="text-amber-600 text-xl">₱{room.price}</span>/night
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-3xl font-bold tracking-tight mb-6">{room.title}</h3>
                <div className="flex flex-wrap gap-3 mb-12">
                  {room.features.map(f => (
                    <span key={f} className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest">{f}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Compare Prices</span>
                  <a href="https://www.agoda.com/search?searchdatetype=default&lt=29&numberofchildren=0&gsite=mapresults&partnercurrency=PHP&roomid=663499715&masterroomid=663499715&pricetax=464.55&pricetotal=2322.74&usercountry=PH&currency=PHP&userdevice=desktop&verif=false&mcid=332&booking_source=cpc&adtype=0&mpt=L2J6cy9KcXVibkpla0pudGMva0MrV05rZ3NjTlljZHlNWVZhaThQOWZSbWtybGNLRGszbVVFcXQ3QUVhaHZSWkRydFNQV1ZhZE1MaGk0NDY&original_rr=PH&los=1&adults=2&rooms=1&checkin=2026-04-20&checkout=2026-04-21&selectedproperty=40016596&city=702166&cid=1917614&pslc=1&ds=GWDj0bFAlv%2F6Oy2G" 
                     target="_blank" rel="noreferrer"
                     className="w-full bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-bold hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all flex items-center justify-between px-6 group">
                    <div className="flex flex-col items-start gap-1">
                      <span className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">Agoda <ChevronRight size={14}/></span>
                      <span className="text-[10px] font-normal text-slate-500">Free cancellation until Apr 14</span>
                    </div>
                    <span className="text-lg">₱2,323</span>
                  </a>
                  
                  <a href="https://www.vio.com/Hotel/Search?checkIn=2026-04-20&checkOut=2026-04-21&currency=PHP&deviceType=desktop&eid=4&epv=MS4y&esd=VC9ORKtD7Gdm5fcaJDjRODuQ2rhP6xosVtxmNAMfx-groEvWDlZbaG1OcGmdcVdQM2_KxCAK8W1yhQ6JOQjUZhK6POQ5GLBDhi_wMZMAJ5kEVfEonnvUj0xadvEqkFFC&forceCurrencyChange=1&forceLanguageChange=1&hotelId=85880804&is_retargeting=true&label=_th%3D1836539145%26cid%3D%26closerateid%3D%26cltype%3Dhotel%26currency%3DPHP%26datype%3Ddefault%26day%3D20%26dts%3D1774156677%26gsite%3Dmapresults%26hotel%3D85880804%26isAudienceUser%3D0%26isPaidClick%3D0%26isPrivateRate%3D0%26listid%3D%26los%3D1%26month%3D04%26price%3D2268.21%26promo%3D0%26query%3D2%26rateid%3DPH_D%26src%3Dgha%26ucountry%3DPH%26udevice%3Ddesktop%26vf%3D0%26year%3D2026&lang=en&oti=kmXwO0sZBNY&pid=click-tracker&preferredRate=2268.21&profile=r2d2m73kn8&rooms=2%3A&userCountry=PH&utm_medium=cpc&utm_source=gha" 
                     target="_blank" rel="noreferrer"
                     className="w-full bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-bold hover:border-purple-600 hover:shadow-lg hover:shadow-purple-600/10 transition-all flex items-center justify-between px-6 group">
                    <div className="flex flex-col items-start gap-1">
                      <span className="flex items-center gap-2 group-hover:text-purple-600 transition-colors">Vio.com <ChevronRight size={14}/></span>
                      <span className="text-[10px] font-normal text-slate-500">Free cancellation · Free breakfast</span>
                    </div>
                    <span className="text-lg text-green-700">₱2,268</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">Get in <br /> touch.</h1>
            <div className="space-y-16">
              {[
                { icon: <MapPin />, label: "Address", value: "Don Mariano Marcos Ave, Cauayan City, 3305 Isabela, Philippines" },
                { icon: <Phone />, label: "Reservation", value: "+63 (078) 323 1234" },
                { icon: <Clock />, label: "Reception", value: "Open 24/7 - Check-in: 2PM" }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-2">{item.label}</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl relative">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[60px] rounded-full" />
             <h2 className="text-3xl font-bold tracking-tight mb-10">Send an Inquiry</h2>
             <form className="space-y-8">
               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                   <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium" placeholder="E.g. John Doe" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Email</label>
                   <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium" placeholder="john@example.com" />
                 </div>
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Message</label>
                 <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium h-40 resize-none" placeholder="How can we help you stay better?" />
               </div>
               <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-bold hover:scale-[0.98] transition-all shadow-xl shadow-slate-900/20">
                 Send Message
               </button>
             </form>
          </div>
        </div>
        
        <div className="mt-40 h-[600px] w-full bg-slate-100 rounded-[5rem] overflow-hidden border border-slate-200">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15254.706179373854!2d121.7656627!3d16.9248981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3385461c333671f3%3A0xea855931215bbda9!2sThe%20Maximilian%20Hotel!5e0!3m2!1sen!2sph!4v1711012111000!5m2!1sen!2sph"
            width="100%" height="100%" style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
           />
        </div>
      </div>
    </div>
  );
}

// --- APP ---

function DiningPage() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">Gusto <br/> Restaurant</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="rounded-[4rem] overflow-hidden h-[600px] shadow-2xl">
            <img src={facilities[0].img} className="w-full h-full object-cover" alt="Dining" />
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-bold tracking-tight italic font-serif">"Experience good food with great company."</h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">Our signature bistro offers an exquisite blend of local flavors and international favorites. Crafted by award-winning chefs in the heart of Cauayan.</p>
            <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 italic text-amber-900 font-medium">
              Open Daily: 6 AM - 10 PM
            </div>
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold">View Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">Grand <br/> Ballroom</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <h2 className="text-4xl font-bold tracking-tight">Elegance scaled for your moments.</h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">From weddings to corporate seminars, our state-of-the-art facilities and dedicated banquet team ensure flawless execution.</p>
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold">Plan Your Event</button>
          </div>
          <div className="rounded-[4rem] overflow-hidden h-[600px] shadow-2xl order-1 lg:order-2">
            <img src={facilities[1].img} className="w-full h-full object-cover" alt="Events" />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-amber-500 selection:text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
