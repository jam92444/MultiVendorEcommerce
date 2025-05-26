import React from 'react';
import "../Styles/components/_policy.scss"
import asset from '../Utility/asset';

const OurPolicy = () => {
  return (
    <div className="policy-wrapper">
      <div className="policy-item">
        <img src={asset.exchangeIcon} className="policy-icon" alt="exchange" />
        <p className="policy-title">Easy Exchange Policy</p>
        <p className="policy-desc">We offer hassle-free exchange policy</p>
      </div>
      <div className="policy-item">
        <img src={asset.QualityIcon} className="policy-icon" alt="return" />
        <p className="policy-title">7 Days Return Policy</p>
        <p className="policy-desc">We provide 7 days free return policy</p>
      </div>
      <div className="policy-item">
        <img src={asset.supportImg} className="policy-icon" alt="support" />
        <p className="policy-title">Best Customer Support</p>
        <p className="policy-desc">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
