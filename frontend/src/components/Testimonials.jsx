import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "HR Director @ TechFlow",
    content: "TalentScout cut our screening time by 90%. Ideally, I just review the gap analysis and interview the top 5.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "CTO @ StartupX",
    content: "The semantic matching is scary good. It found a candidate who didn't list 'React' but had 'Next.js' experience.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Recruiter @ AgencyOne",
    content: "Finally, a tool that helps me give feedback to candidates. The missing skills report is a game changer.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title center-text">Trusted by Recruiters</h2>
        
        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p className="testimonial-content">"{review.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div className="author-info">
                  <h4>{review.name}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
