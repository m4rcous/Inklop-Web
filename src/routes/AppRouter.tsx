import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/login';
import { RegisterPage, VerificationPage, BirthdayPage, ProfileCompletePage } from '../features/auth/register';
import { RegisterProvider } from '../features/auth/register/context';
import { DashboardPage } from '../features/home';
import { MainLayout } from '../features/home/layout/MainLayout';
import { MessagesPage } from '../features/home/messages/MessagesPage';
import { BillingPage } from '../features/home/billing/BillingPage';
import { AccountSettingsPage } from '../features/home/account-settings/AccountSettingsPage';
import { CreateCampaignPage } from '../features/home/create-campaign/CreateCampaignPage';
import { InfluencersUGCCampaignPage } from '../features/home/create-campaign/influencers-ugc';
import { InfluencersSetupPage } from '../features/home/create-campaign/influencers-setup';
import { AICampaignPage } from '../features/home/create-campaign/ai-campaign';
import { ManualCampaignPage } from '../features/home/create-campaign/manual-campaign';
import { ClippingCampaignPage } from '../features/home/create-campaign/clipping-campaign';
import { CheckoutPage } from '../features/home/create-campaign/checkout/CheckoutPage';
import { SuccessPage } from '../features/home/create-campaign/success/SuccessPage';
import { CampaignAnalysisPage } from '../features/home/campaign-analysis/CampaignAnalysisPage';
import { ROUTES } from '../shared/constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path="/register/verify" element={<VerificationPage />} />
          <Route path="/register/birthday" element={<BirthdayPage />} />
          <Route path="/register/profile-complete" element={<ProfileCompletePage />} />

          {/* Protected routes with MainLayout (static sidebar) */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
            <Route path={ROUTES.BILLING} element={<BillingPage />} />
            <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettingsPage />} />
            <Route path={ROUTES.CAMPAIGN_ANALYSIS} element={<CampaignAnalysisPage />} />
          </Route>

          {/* Routes without sidebar */}
          <Route path={ROUTES.CREATE_CAMPAIGN} element={<CreateCampaignPage />} />
          <Route path={ROUTES.INFLUENCERS_UGC_CAMPAIGN} element={<InfluencersUGCCampaignPage />} />
          <Route path={ROUTES.INFLUENCERS_SETUP} element={<InfluencersSetupPage />} />
          <Route path={ROUTES.AI_CAMPAIGN} element={<AICampaignPage />} />
          <Route path={ROUTES.MANUAL_CAMPAIGN} element={<ManualCampaignPage />} />
          <Route path={ROUTES.CLIPPING_CAMPAIGN} element={<ClippingCampaignPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.CAMPAIGN_SUCCESS} element={<SuccessPage />} />

          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
};
