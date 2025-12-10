import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// ... imports ...

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase font-heading italic mb-4">Contact <span className="text-primary">Support</span></h1>
                    <p className="text-white/75 font-mono text-sm tracking-wide uppercase max-w-lg mx-auto">
                        Inquiries & Assistance.
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
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Main Office</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">Shop 48,49,50 Meeraj, Lateef Tower,<br />McLeod Rd, opposite Lahore Hotel,<br />Garhi Shahu, Lahore, 54000, Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Phone</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">042-36290998</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Email</h3>
                                    <p className="text-white/75 mt-1 font-mono text-xs">rigidtraders1@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 relative overflow-hidden">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none opacity-20"></div>

                        <h2 className="text-xl font-bold text-white mb-6 uppercase font-heading tracking-wide relative z-10">Send a Transmission</h2>
                        <form className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Identify Yourself</label>
                                <input type="text" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="FULL NAME" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Comms Channel</label>
                                <input type="email" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="EMAIL ADDRESS" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Payload Data</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm" placeholder="YOUR MESSAGE..." />
                            </div>
                            <button type="submit" className="w-full bg-primary text-black font-black uppercase tracking-wider py-4 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all clip-path-slant">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <div className="mt-12 border border-zinc-800 rounded-sm overflow-hidden h-96 bg-zinc-900/40 relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.088656828574!2d74.32614887640306!3d31.56981624536735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b000037d019%3A0x2dbbbe61dd54c25c!2sRigid%20Traders!5e0!3m2!1sen!2s!4v1717900000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(190deg) brightness(85%) contrast(120%) saturate(150%)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    )
}
