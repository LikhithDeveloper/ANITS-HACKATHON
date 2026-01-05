import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} /> <span>Powered by Gemini & GPT-4o</span>
          </motion.div>
          
          <h1 className="hero-title">
            Hiring Intelligence <br />
            <span className="text-gradient">Beyond Keywords</span>
          </h1>
          
          <p className="hero-subtitle">
            Transform your recruitment with AI that understands context. 
            Screen resumes, analyze skill gaps, and rank candidates with human-level insight in seconds.
          </p>
          
          <div className="hero-actions">
            <Link to="/resume-screening" className="btn btn-primary hero-btn">
              Start Screening Free <ArrowRight size={18} />
            </Link>
            <button className="btn btn-outline hero-btn">
              Why AI?
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">85%</span>
              <span className="stat-label">Time Saved</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">10k+</span>
              <span className="stat-label">Resumes Parsed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
