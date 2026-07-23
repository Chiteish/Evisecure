import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { IoFingerPrintOutline } from 'react-icons/io5';
import { PiLinkSimpleBold, PiGavelBold } from 'react-icons/pi';
import heroImage from '../../assets/evisecure_dark_chain.png';

export const LandingPage: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#070b13] text-white flex flex-col justify-between overflow-hidden p-8 select-none font-sans relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-[1400px] w-full mx-auto flex items-center justify-between py-2 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <FiShield className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            EviSecure
          </span>
        </div>
        <div>
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-lg bg-[#0066fe] text-white font-bold text-xs hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(0,102,254,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Contents */}
      <main className="max-w-[1400px] w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 py-6 z-10">
        {/* Left Side: Headline & Features */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-4">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
              EviSecure: <br />
              Your Evidence. <br />
              Untampered.
            </h1>
          </div>

          {/* Features Column matching Dark Mockup style */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#0066fe] shrink-0 shadow-inner">
                <IoFingerPrintOutline className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-white text-sm">AI-Powered Verification</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                  Minimalizes assurements of neuraid verification and neuralounctions.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#0066fe] shrink-0 shadow-inner">
                <PiLinkSimpleBold className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-white text-sm">Blockchain-Anchored Logs</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                  Embine unquer original logs ansbrand Blockchain visualization of integrity.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#0066fe] shrink-0 shadow-inner">
                <PiGavelBold className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-white text-sm">Court-Ready Chain of Custody</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                  Court-ready entrecment into aealrity, narnetry, and courification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Hero image card matching dark mockup */}
        <div className="lg:col-span-7 h-full flex items-center justify-end min-h-0">
          <div className="w-full h-full max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-black/40 backdrop-blur-md">
            <img
              src={heroImage}
              alt="EviSecure Digital Evidence Security Chain Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>

      {/* Spacing alignment */}
      <footer className="shrink-0 py-1" />
    </div>
  );
};
