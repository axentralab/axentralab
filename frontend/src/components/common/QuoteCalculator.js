import React, { useState } from 'react';
import axios from 'axios';
import './QuoteCalculator.css';

const QuoteCalculator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    projectType: '',
    pages: 5,
    features: [],
    securityLevel: 'standard',
    deadline: '',
  });

  const projectTypes = [
    'Website Design & Development',
    'SaaS Platform',
    'Security Audit',
    'Business Automation',
    'AI Integration',
    'Mobile App',
  ];

  const features = [
    'User Authentication',
    'Payment System',
    'Admin Dashboard',
    'API Integration',
    'Email Notifications',
    'Search Functionality',
    'Analytics Dashboard',
  ];

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateQuote = async () => {
    if (!formData.projectType) {
      setError('Please select a project type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quotes`,
        formData
      );

      setQuote(response.data.data);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate quote');
      console.error('Quote generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const convertToLead = async () => {
    const name = prompt('Your Name:');
    const email = prompt('Your Email:');
    const company = prompt('Company Name (optional):');

    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quotes/${quote._id}/convert`,
        { name, email, company, message: `Quote for ${formData.projectType}` }
      );

      alert('🎉 Lead created! Our team will contact you soon.');
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-calculator">
      <div className="quote-container">
        <h1>💰 Smart Quote Calculator</h1>
        <p className="subtitle">Get an instant AI-powered estimate for your project</p>

        {error && <div className="alert alert-error">{error}</div>}

        {step === 1 && (
          <div className="step">
            <h2>Step 1: Select Project Type</h2>
            <div className="project-types">
              {projectTypes.map(type => (
                <button
                  key={type}
                  className={`project-btn ${formData.projectType === type ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, projectType: type }))}
                >
                  {type}
                </button>
              ))}
            </div>
            <button 
              className="btn-primary"
              onClick={() => setStep(2)}
              disabled={!formData.projectType}
            >
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Step 2: Customize Your Project</h2>

            <div className="form-group">
              <label>Number of Pages/Screens</label>
              <input
                type="range"
                min="1"
                max="50"
                value={formData.pages}
                name="pages"
                onChange={handleChange}
              />
              <span className="range-value">{formData.pages} pages</span>
            </div>

            <div className="form-group">
              <label>Required Features</label>
              <div className="feature-grid">
                {features.map(feature => (
                  <label key={feature} className="feature-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Security Level</label>
              <select
                name="securityLevel"
                value={formData.securityLevel}
                onChange={handleChange}
              >
                <option value="standard">Standard Security</option>
                <option value="high">High Security</option>
                <option value="enterprise">Enterprise Grade</option>
              </select>
            </div>

            <div className="form-group">
              <label>Timeline</label>
              <select
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              >
                <option value="">No specific deadline</option>
                <option value="ASAP">ASAP (1-2 weeks)</option>
                <option value="1-month">1 Month</option>
                <option value="2-months">2 Months</option>
                <option value="3-months">3+ Months</option>
              </select>
            </div>

            <div className="form-buttons">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button 
                className="btn-primary"
                onClick={generateQuote}
                disabled={loading}
              >
                {loading ? '⏳ Generating...' : 'Get Estimate →'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && quote && (
          <div className="step quote-result">
            <h2>✨ Your AI-Generated Quote</h2>

            <div className="quote-highlight">
              <div className="estimate-box">
                <h3>💵 Estimated Cost</h3>
                <p className="big-number">{quote.estimatedCost}</p>
              </div>

              <div className="estimate-box">
                <h3>📅 Timeline</h3>
                <p className="big-number">{quote.timeline}</p>
              </div>

              <div className="estimate-box">
                <h3>🛡️ Confidence</h3>
                <p className="big-number">{quote.confidence}%</p>
              </div>
            </div>

            {quote.costBreakdown && (
              <div className="breakdown">
                <h4>Cost Breakdown</h4>
                <ul>
                  {Object.entries(quote.costBreakdown).map(([item, cost]) => (
                    <li key={item}>
                      <span>{item.replace(/_/g, ' ')}</span>
                      <strong>{cost}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {quote.recommendedTechStack && (
              <div className="tech-stack">
                <h4>🛠️ Recommended Tech Stack</h4>
                <div className="tech-tags">
                  {quote.recommendedTechStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {quote.phases && (
              <div className="phases">
                <h4>📌 Project Phases</h4>
                <ol>
                  {quote.phases.map((phase, idx) => (
                    <li key={idx}>{phase}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="form-buttons">
              <button className="btn-secondary" onClick={() => {
                setStep(2);
                setQuote(null);
              }}>
                ← Adjust Quote
              </button>
              <button 
                className="btn-primary btn-large"
                onClick={convertToLead}
                disabled={loading}
              >
                {loading ? '⏳ Processing...' : 'Get Proposal & Consultation →'}
              </button>
            </div>

            <p className="quote-info">
              💡 Next: You'll receive a detailed proposal from our team within 24 hours
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculator;
