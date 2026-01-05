import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Search size={32} />,
    title: "Semantic Analysis",
    description: "We go beyond keywords. Our AI understands context, synonyms, and experience levels to find true talent matches."
  },
  {
    icon: <BarChart2 size={32} />,
    title: "Skill Gap Reports",
    description: "Instantly see what skills a candidate lacks. Get detailed reports on critical vs optional gaps."
  },
  {
    icon: <BookOpen size={32} />,
    title: "Smart Feedback & Prep",
    description: "Rejected? We provide a detailed skill gap report, resume tailored advice, and a 4-week preparation plan to land the next role."
  },
  {
    icon: <Zap size={32} />,
    title: "Instant Ranking",
    description: "Upload 100+ resumes and get a ranked list in seconds. Save 80% of your screening time."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Unbiased Screening",
    description: "Automatically redact redundant PII data to focus purely on skills and potential, removing unconscious bias."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Services = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose TalentScout AI?</h2>
          <p className="section-subtitle">Comprehensive tools designed for the modern recruiter.</p>
        </div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} className="service-card" variants={itemVariants}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
