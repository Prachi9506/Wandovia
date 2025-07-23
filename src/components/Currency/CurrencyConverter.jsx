import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowRightLeft, TrendingUp, Globe } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock exchange rates for demonstration
  const mockExchangeRates = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110.0,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'USD-CHF': 0.92,
    'USD-CNY': 6.45,
    'USD-INR': 74.5,
    'EUR-USD': 1.18,
    'EUR-GBP': 0.86,
    'EUR-JPY': 129.4,
    'GBP-USD': 1.37,
    'GBP-EUR': 1.16,
    'JPY-USD': 0.0091,
    'CAD-USD': 0.80,
    'AUD-USD': 0.74,
    'CHF-USD': 1.09,
    'CNY-USD': 0.155,
    'INR-USD': 0.0134
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
  ];

  const convertCurrency = async () => {
    if (!amount || amount <= 0) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const rateKey = `${fromCurrency}-${toCurrency}`;
      const reverseRateKey = `${toCurrency}-${fromCurrency}`;
      
      let rate = mockExchangeRates[rateKey];
      
      if (!rate && mockExchangeRates[reverseRateKey]) {
        rate = 1 / mockExchangeRates[reverseRateKey];
      }
      
      if (!rate) {
        // If direct rate not available, convert through USD
        const fromToUSD = fromCurrency === 'USD' ? 1 : (mockExchangeRates[`${fromCurrency}-USD`] || 1);
        const USDToTo = toCurrency === 'USD' ? 1 : (mockExchangeRates[`USD-${toCurrency}`] || 1);
        rate = fromToUSD * USDToTo;
      }
      
      if (!rate) rate = 1; // Fallback
      
      setExchangeRate(rate);
      setConvertedAmount(parseFloat(amount) * rate);
    } catch (error) {
      console.error('Currency conversion error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };

  const formatAmount = (value, currencyCode) => {
    if (value === null || value === undefined) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="currency-converter fade-in">
      <div className="converter-header">
        <h1 className="page-title">Currency Converter</h1>
        <p className="page-subtitle">Convert currencies for your travel planning</p>
      </div>

      <div className="converter-card">
        <div className="converter-form">
          <div className="amount-section">
            <label className="form-label">Amount</label>
            <div className="amount-input-group">
              <span className="currency-symbol">{getCurrencySymbol(fromCurrency)}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="currency-section">
            <div className="currency-group">
              <label className="form-label">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="swap-btn"
              onClick={swapCurrencies}
              disabled={loading}
            >
              <ArrowRightLeft size={20} />
            </button>

            <div className="currency-group">
              <label className="form-label">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="conversion-result">
          {loading ? (
            <div className="loading-result">
              <div className="loading-spinner"></div>
              <p>Converting...</p>
            </div>
          ) : (
            <div className="result-display">
              <div className="result-amount">
                <span className="result-symbol">{getCurrencySymbol(toCurrency)}</span>
                <span className="result-value">
                  {formatAmount(convertedAmount, toCurrency)}
                </span>
              </div>
              
              {exchangeRate && (
                <div className="exchange-rate">
                  <TrendingUp size={16} />
                  <span>
                    1 {fromCurrency} = {formatAmount(exchangeRate, toCurrency)} {toCurrency}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="popular-conversions">
        <h3>Popular Conversions</h3>
        <div className="conversions-grid">
          {[
            { from: 'USD', to: 'EUR', rate: 0.85 },
            { from: 'USD', to: 'GBP', rate: 0.73 },
            { from: 'EUR', to: 'GBP', rate: 0.86 },
            { from: 'USD', to: 'JPY', rate: 110.0 },
            { from: 'USD', to: 'CAD', rate: 1.25 },
            { from: 'USD', to: 'INR', rate: 74.5 }
          ].map((conversion, index) => (
            <div
              key={index}
              className="conversion-card"
              onClick={() => {
                setFromCurrency(conversion.from);
                setToCurrency(conversion.to);
                setAmount('1');
              }}
            >
              <div className="conversion-pair">
                {conversion.from} → {conversion.to}
              </div>
              <div className="conversion-rate">
                1 {conversion.from} = {formatAmount(conversion.rate)} {conversion.to}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="currency-tips">
        <h3>Currency Exchange Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <Globe size={24} />
            <h4>Research Before You Go</h4>
            <p>Check current exchange rates and trends before traveling to get the best deals.</p>
          </div>
          <div className="tip-card">
            <DollarSign size={24} />
            <h4>Avoid Airport Exchanges</h4>
            <p>Airport currency exchanges often have poor rates. Use ATMs or banks instead.</p>
          </div>
          <div className="tip-card">
            <TrendingUp size={24} />
            <h4>Monitor Rate Fluctuations</h4>
            <p>Exchange rates change daily. Time your currency exchange for better rates.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .currency-converter {
          padding: var(--spacing-4);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .converter-header {
          text-align: center;
          margin-bottom: var(--spacing-4);
        }
        
        .converter-card {
          background-color: var(--bg-primary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }
        
        .converter-form {
          margin-bottom: var(--spacing-4);
        }
        
        .amount-section {
          margin-bottom: var(--spacing-3);
        }
        
        .amount-input-group {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background-color: var(--bg-secondary);
          overflow: hidden;
        }
        
        .currency-symbol {
          padding: var(--spacing-2);
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: var(--font-weight-semibold);
          border-right: 1px solid var(--border-light);
        }
        
        .amount-input {
          flex: 1;
          padding: var(--spacing-2);
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
        }
        
        .amount-input:focus {
          outline: none;
        }
        
        .currency-section {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: var(--spacing-2);
          align-items: end;
        }
        
        .currency-group {
          display: flex;
          flex-direction: column;
        }
        
        .currency-select {
          padding: var(--spacing-2);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-size: var(--font-size-base);
        }
        
        .currency-select:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        
        .swap-btn {
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swap-btn:hover:not(:disabled) {
          background-color: var(--color-primary-hover);
          transform: rotate(180deg);
        }
        
        .swap-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .conversion-result {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          color: white;
          text-align: center;
        }
        
        .loading-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
        }
        
        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .result-display {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }
        
        .result-amount {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-1);
        }
        
        .result-symbol {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
        }
        
        .result-value {
          font-size: 2.5rem;
          font-weight: var(--font-weight-bold);
          line-height: 1;
        }
        
        .exchange-rate {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(var(--spacing-1) / 2);
          font-size: var(--font-size-sm);
          opacity: 0.9;
        }
        
        .popular-conversions {
          margin-bottom: var(--spacing-4);
        }
        
        .popular-conversions h3 {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-3) 0;
          text-align: center;
        }
        
        .conversions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-2);
        }
        
        .conversion-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: var(--spacing-2);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .conversion-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .conversion-pair {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        
        .conversion-rate {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }
        
        .currency-tips {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-4);
          border: 1px solid var(--border-light);
        }
        
        .currency-tips h3 {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-3) 0;
          text-align: center;
        }
        
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-3);
        }
        
        .tip-card {
          background-color: var(--bg-primary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-3);
          border: 1px solid var(--border-light);
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .tip-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        
        .tip-card svg {
          color: var(--color-primary);
          margin-bottom: var(--spacing-1);
        }
        
        .tip-card h4 {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-1) 0;
        }
        
        .tip-card p {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
          line-height: var(--line-height-normal);
        }
        
        @media (max-width: 768px) {
          .currency-converter {
            padding: var(--spacing-2);
          }
          
          .currency-section {
            grid-template-columns: 1fr;
            gap: var(--spacing-2);
          }
          
          .swap-btn {
            justify-self: center;
            transform: rotate(90deg);
          }
          
          .result-value {
            font-size: 2rem;
          }
          
          .conversions-grid {
            grid-template-columns: 1fr;
          }
          
          .tips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CurrencyConverter;