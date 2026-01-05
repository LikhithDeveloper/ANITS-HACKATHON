import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, BookOpen, Clock, Loader } from 'lucide-react';
import './ResumeScreening.css';

const ResumeScreening = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {'application/pdf': ['.pdf']},
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!file || !jd) {
      setError("Please upload a resume and paste a job description.");
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jd);

    try {
      const response = await fetch('http://localhost:5000/api/screening/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.analysis);
    } catch (err) {
      setError(err.message || "Something went wrong. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screening-page container">
      <motion.div 
        className="screening-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>AI Resume Screener</h1>
        <p>Get instant feedback on your fit for any role.</p>
      </motion.div>

      <div className="screening-layout">
        {/* Input Section */}
        <div className="input-section">
          {/* Job Description */}
          <div className="input-group">
            <label>1. Paste Job Description</label>
            <textarea 
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={8}
            />
          </div>

          {/* Resume Upload */}
          <div className="input-group">
            <label>2. Upload Resume (PDF)</label>
            <div 
              {...getRootProps()} 
              className={`dropzone ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="file-info">
                  <FileText size={32} className="text-accent" />
                  <span className="file-name">{file.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="remove-file">
                    Change
                  </button>
                </div>
              ) : (
                <div className="dropzone-prompt">
                  <UploadCloud size={40} />
                  <p>Drag & Drop PDF here or <span className="text-accent">Browse</span></p>
                </div>
              )}
            </div>
          </div>

          <button 
            className="btn btn-primary full-width" 
            onClick={handleAnalyze} 
            disabled={loading}
          >
            {loading ? <><Loader className="spin" size={20} /> Analyzing...</> : "Analyze Match"}
          </button>
          
          {error && <p className="error-msg">{error}</p>}
        </div>

        {/* Results Section */}
        <div className="results-section">
          <AnimatePresence>
            {result && (
              <motion.div 
                className="result-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* Score Header */}
                <div className="score-header">
                  <div className={`score-ring ${getScoreColor(result.matchScore)}`}>
                    <span className="score-num">{result.matchScore}%</span>
                  </div>
                  <div className="score-info">
                    <h2>{result.matchStatus}</h2>
                    <p>{result.summary}</p>
                  </div>
                </div>

                <div className="result-divider"></div>

                {/* Missing Skills */}
                <div className="result-block">
                  <h3><AlertTriangle size={20} className="icon-orange" /> Missing Skills</h3>
                  <div className="skills-list">
                    {result.missingSkills.critical.length > 0 && (
                      <div className="skill-category">
                        <span className="label-critical">Critical:</span>
                        {result.missingSkills.critical.map((skill, i) => (
                          <span key={i} className="tag tag-critical">{skill}</span>
                        ))}
                      </div>
                    )}
                    {result.missingSkills.optional.length > 0 && (
                      <div className="skill-category">
                        <span className="label-optional">Optional:</span>
                        {result.missingSkills.optional.map((skill, i) => (
                          <span key={i} className="tag tag-optional">{skill}</span>
                        ))}
                      </div>
                    )}
                    {result.missingSkills.critical.length === 0 && result.missingSkills.optional.length === 0 && (
                      <p className="success-text">No major skills missing!</p>
                    )}
                  </div>
                </div>

                <div className="result-divider"></div>
                
                {/* Improvements */}
                <div className="result-block">
                   <h3><CheckCircle size={20} className="icon-green" /> Resume Tips</h3>
                   <ul className="tips-list">
                    {result.resumeImprovements.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                   </ul>
                </div>

                <div className="result-divider"></div>

                {/* Learning Plan */}
                <div className="result-block">
                  <h3><BookOpen size={20} className="icon-blue" /> 4-Week Prep Plan</h3>
                  <div className="timeline">
                    {result.learningPlan && result.learningPlan.map((week, i) => (
                       <div key={i} className="timeline-item">
                          <div className="timeline-marker">{week.week}</div>
                          <div className="timeline-content">
                            <h4>Week {week.week}: {week.focus}</h4>
                            <p>{week.action}</p>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
          
          {!result && !loading && (
             <div className="empty-state">
                <FileText size={48} opacity={0.2} />
                <p>Upload a resume to see the magic.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getScoreColor = (score) => {
  if (score >= 80) return 'score-green';
  if (score >= 50) return 'score-yellow';
  return 'score-red';
};

export default ResumeScreening;
