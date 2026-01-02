import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CampaignCard.css';

interface CampaignCardProps {
  id: string;
  title: string;
  imageUrl: string;
  currentBudget: number;
  totalBudget: number;
  progress: number;
  isRecommended?: boolean;
  creators?: number;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  imageUrl,
  currentBudget,
  totalBudget,
  progress,
  isRecommended = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="campaign-card" onClick={handleClick}>
      {isRecommended && (
        <div className="campaign-badge">
          Recomendación
        </div>
      )}

      <div className="campaign-image-container">
        <img src={imageUrl} alt={title} className="campaign-image" />
      </div>

      <div className="campaign-details">
        <div className="campaign-budget-info">
          <span className="budget-text">
            ${currentBudget.toFixed(2)}/${totalBudget.toFixed(2)}
          </span>
          <span className="budget-percentage">{progress}%</span>
        </div>

        <div className="campaign-progress-bar">
          <div
            className="campaign-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3 className="campaign-title">{title}</h3>
      </div>
    </div>
  );
};
