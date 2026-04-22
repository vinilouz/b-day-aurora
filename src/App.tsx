/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  MapPin, 
  CheckCircle, 
  X,
  Send,
  Pointer
} from 'lucide-react';
import React, { useState } from 'react';

import imgTopCharacters from './assets/1.png';
import imgBottomPlates from './assets/2.webp';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const FloatingElement = ({ delay, x, y, duration, children }: { delay: number; x: string; y: string; duration: number, children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none opacity-60`}
      style={{ left: x, top: y }}
    >
      {children}
    </motion.div>
  );
};

const SimpleBalloon = ({ color, x, y, delay }: { color: string; x: string; y: string, delay: number }) => {
  return (
    <FloatingElement delay={delay} x={x} y={y} duration={4 + Math.random() * 2}>
      <div className="relative flex flex-col items-center">
        <div className={`w-16 h-20 rounded-[50%] ${color} shadow-sm backdrop-blur-sm opacity-50`} />
        {/* Balloon tie */}
        <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[rgba(0,0,0,0.1)] -mt-1`} />
        {/* String */}
        <div className="w-0.5 h-16 bg-gray-300 opacity-40 rotate-[10deg] shrink-0" />
      </div>
    </FloatingElement>
  );
};

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRsvped, setIsRsvped] = useState(false);

  const eventDate = "25/07";
  const eventTime = "18:00";
  const locationLink = "https://maps.app.goo.gl/J7Vd5taK4qxuAV127";

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: rsvpName }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setIsRsvped(true);
        triggerConfetti();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  return (
    <div 
      className="min-h-screen bg-[#FFFDFE] font-sans overflow-x-hidden relative flex flex-col items-center py-6 px-3 select-none"
      style={{
        backgroundImage: "radial-gradient(#FFE0EC 2px, transparent 2px)",
        backgroundSize: "28px 28px",
        backgroundPosition: "-14px -14px"
      }}
    >
      
      {/* Decorative Background Elements aligned with the "Ayla" reference */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <SimpleBalloon color="bg-[#4FC3F7]" x="0%" y="2%" delay={0} />
        <SimpleBalloon color="bg-[#FF8A65]" x="8%" y="-5%" delay={1} />
        <SimpleBalloon color="bg-[#FFB74D]" x="-5%" y="10%" delay={2} />
        
        <SimpleBalloon color="bg-[#F06292]" x="85%" y="0%" delay={1.5} />
        <SimpleBalloon color="bg-[#4DD0E1]" x="92%" y="-5%" delay={0.5} />
        <SimpleBalloon color="bg-[#BA68C8]" x="80%" y="12%" delay={2.5} />

        <SimpleBalloon color="bg-[#81C784]" x="-2%" y="70%" delay={0} />
        <SimpleBalloon color="bg-[#BA68C8]" x="8%" y="75%" delay={1} />

        <SimpleBalloon color="bg-[#F06292]" x="88%" y="68%" delay={1.5} />
        <SimpleBalloon color="bg-[#4FC3F7]" x="80%" y="78%" delay={0.5} />

        <FloatingElement delay={0} x="20%" y="8%" duration={4}>
           <Music size={32} className="text-[#F06292] opacity-80 rotate-12" />
        </FloatingElement>
        <FloatingElement delay={1} x="75%" y="6%" duration={5}>
           <Music size={28} className="text-[#FFB74D] opacity-80 -rotate-12" />
        </FloatingElement>
        <FloatingElement delay={2} x="8%" y="45%" duration={4.5}>
           <svg width="40" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD54F] opacity-90"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        </FloatingElement>
        <FloatingElement delay={2.5} x="85%" y="60%" duration={5.5}>
           <Music size={40} className="text-[#FFB74D] opacity-80 rotate-12" />
        </FloatingElement>
      </div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
        className="w-full max-w-[480px] relative z-20 flex flex-col items-center"
      >
        
        {/* Top Characters Image */}
        <motion.div variants={itemVariants} className="w-full flex justify-center items-end relative z-10 pt-4 pb-2">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full flex justify-center"
          >
            <img src={imgTopCharacters} alt="Personagens 3 Palavrinhas" className="w-full max-w-[400px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />
          </motion.div>
        </motion.div>

        {/* Dynamic Curved SVG Banner */}
        <motion.div variants={itemVariants} className="relative w-full flex justify-center -mt-16 mb-2 z-20">
          <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[115%] max-w-[550px] overflow-visible drop-shadow-[0_8px_16px_rgba(255,120,185,0.25)]">
            <defs>
              <path id="curve" d="M 120 180 Q 300 240 480 180" />
            </defs>
            
            {/* Left Folds */}
            <path d="M 60 100 L 110 160 L 100 190 Z" fill="#D44D8E" />
            {/* Left Ribbon End */}
            <path d="M 70 80 L 10 140 L 40 180 L 30 220 L 90 180 Z" fill="#FF78B9" />
            
            {/* Right Folds */}
            <path d="M 540 100 L 490 160 L 500 190 Z" fill="#D44D8E" />
            {/* Right Ribbon End */}
            <path d="M 530 80 L 590 140 L 560 180 L 570 220 L 510 180 Z" fill="#FF78B9" />

            {/* Main Thick Ribbon Curve */}
            <path d="M 80 140 Q 300 220 520 140 L 480 200 Q 300 280 120 200 Z" fill="#FF78B9" />

            {/* AURORA Text with thick stroke matching "AYLA" reference */}
            <text className="font-fredoka font-black uppercase" fontSize="88" letterSpacing="6" fill="#FF78B9" stroke="#FFF" strokeWidth="20" strokeLinejoin="round" paintOrder="stroke">
              <textPath href="#curve" startOffset="50%" textAnchor="middle" alignmentBaseline="baseline">
                AURORA
              </textPath>
            </text>
            <text className="font-fredoka font-black uppercase" fontSize="88" letterSpacing="6" fill="#FF78B9">
              <textPath href="#curve" startOffset="50%" textAnchor="middle" alignmentBaseline="baseline">
                AURORA
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Text Description perfectly matching Ayla reference styling */}
        <motion.div variants={itemVariants} className="text-center px-4 mb-8 relative z-20">
          <p className="text-[#ECA11A] text-[20px] font-bold uppercase leading-tight tracking-tight mt-2">
            A turma do 3 palavrinhas já confirmou
          </p>
          <p className="text-[#ECA11A] text-[20px] font-bold uppercase leading-tight tracking-tight mb-2">
            presença no meu aniversário de
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#FF78B9] text-[56px] leading-none font-black uppercase tracking-tighter py-2 drop-shadow-sm"
          >
            2 ANINHOS
          </motion.div>
          <p className="text-[#ECA11A] text-[26px] font-black uppercase tracking-tight mt-1 drop-shadow-sm">
            Agora só falta você!
          </p>
        </motion.div>

        {/* Side-by-side Button Section */}
        <motion.div variants={itemVariants} className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 px-4 mb-3 relative z-20">
          
          {/* RSVP Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !isRsvped && setIsModalOpen(true)}
            className={`w-full sm:flex-1 max-w-[280px] sm:max-w-[210px] h-[75px] rounded-full flex items-center p-1.5 shadow-md transition-all overflow-hidden border-[3px] ${
              isRsvped 
                ? 'bg-[#FF78B9] border-[#FF78B9] shadow-pink-200' 
                : 'bg-gradient-to-br from-[#FFFDFE] to-pink-50 border-[#FF78B9] hover:bg-pink-100'
            }`}
          >
            <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0 transition-all ${
              isRsvped ? 'bg-white text-[#FF78B9]' : 'bg-[#FF78B9] text-white'
            }`}>
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col ml-2.5 text-left flex-1 justify-center">
              <span className={`text-[11px] font-bold uppercase leading-none ${isRsvped ? 'text-white' : 'text-[#FF78B9]'}`}>
                {isRsvped ? 'Sua Presença' : 'Confirmar'}
              </span>
              <span className={`text-[15px] font-black uppercase leading-none mt-1 ${isRsvped ? 'text-white' : 'text-[#FF78B9]'}`}>
                {isRsvped ? 'Confirmada!' : 'Presença'}
              </span>
            </div>
          </motion.button>

          {/* Location Button */}
          <motion.a
            href={locationLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:flex-1 max-w-[280px] sm:max-w-[210px] h-[75px] bg-gradient-to-br from-[#FFFDFE] to-pink-50 border-[3px] border-[#FF78B9] rounded-full flex items-center p-1.5 shadow-md shadow-pink-200 transition-all overflow-hidden"
          >
            <div className="w-[54px] h-[54px] bg-[#FF78B9] rounded-full flex items-center justify-center text-white shrink-0">
              <MapPin size={28} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col ml-2.5 text-left flex-1 justify-center">
              <span className="text-[11px] font-bold text-[#FF78B9] uppercase leading-none">Localização</span>
              <span className="text-[15px] font-black text-[#FF78B9] uppercase leading-none mt-1">DA FESTA</span>
            </div>
          </motion.a>
        </motion.div>

        {/* Animated Hand Cursor Hint */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#ECA11A] flex justify-center w-full mb-6 relative z-10 opacity-80"
        >
          <Pointer size={28} strokeWidth={2} className="rotate-[-10deg]" />
        </motion.div>

        {/* Bottom Character Plates Image */}
        <motion.div variants={itemVariants} className="w-full flex justify-center px-4 relative z-20 pb-12">
           <img src={imgBottomPlates} alt={`Data: ${eventDate} às ${eventTime}`} className="w-full max-w-[420px] object-contain drop-shadow-xl" />
        </motion.div>
      </motion.div>

      {/* Modal Confirmar Presenca */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white max-w-sm w-full rounded-[2rem] p-6 shadow-2xl relative border-[4px] border-[#FF78B9]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#FF78B9] transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>
              
              <div className="text-center mb-6 mt-2">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-200">
                  <CheckCircle size={32} className="text-[#FF78B9]" />
                </div>
                <h2 className="text-[26px] font-black text-[#ECA11A] uppercase tracking-tight leading-none">Estou muito feliz!</h2>
                <p className="text-gray-500 font-medium mt-3 leading-snug">Deixe seu nome ou da família para eu colocar na lista!</p>
              </div>

              <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4">
                <input 
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF78B9] focus:ring-4 focus:ring-pink-100 outline-none transition-all font-medium text-gray-700 text-lg text-center"
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || !rsvpName.trim()}
                  type="submit"
                  className="w-full h-[60px] rounded-xl bg-[#FF78B9] text-white font-bold text-xl uppercase tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-pink-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Salvando...' : 'Confirmar!'}
                  {!isSubmitting && <Send size={24} />}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Confetti Overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden"
          >
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 800, 
                  y: ((Math.random() - 0.5) * 800) - 100, 
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360,
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 3.5, ease: "easeOut" }}
                className={`w-4 h-4 ${['bg-[#F06292]', 'bg-[#4FC3F7]', 'bg-[#FFB74D]', 'bg-[#81C784]', 'bg-[#BA68C8]'][Math.floor(Math.random() * 5)]} rounded-sm absolute shadow-sm`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
