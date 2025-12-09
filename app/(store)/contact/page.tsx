import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase font-heading italic mb-4">Contact <span className="text-primary">Support</span></h1>
                    <p className="text-white/75 font-mono text-sm tracking-wide uppercase max-w-lg mx-auto">
                        Technical assistance and order inquiries. <br />System is online 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-zinc-900/40 backdrop-blur-md rounded-sm border border-zinc-800 p-8">
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white uppercase font-heading tracking-wide border-b border-zinc-800 pb-2">Get in Touch</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Visit Our HQ</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">123 Auto Parts Blvd<br />Motor City, MI 48201</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Call Us</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">+1 (555) 123-4567</p>
                                    <p className="text-zinc-500 text-[10px] uppercase mt-1">Mon-Fri: 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Email Us</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">support@autoparts.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 relative overflow-hidden">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20"></div>

                        <h2 className="text-xl font-bold text-white mb-6 uppercase font-heading tracking-wide relative z-10">Send a Transmission</h2>
                        <form className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Identify Yourself</label>
                                <input type="text" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="NAME_ID" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Comms Channel</label>
                                <input type="email" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="EMAIL_ADDRESS" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Payload Data</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="ENTER MESSAGE..." />
                            </div>
                            <button type="submit" className="w-full bg-primary text-black font-black uppercase tracking-wider py-4 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all clip-path-slant">
                                Transmit Data
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
