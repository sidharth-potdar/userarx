import React from 'react';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { hostingTheme } from '../assets/theme/index';
import {
  GlobalStyle,
  ContentWrapper,
} from '../containers/Hosting/hosting.style';
import { ResetCSS } from '../assets/css/style';
import Navbar from '../containers/Hosting/Navbar';
import FeatureSection from '../containers/Hosting/Features';
import InfoSection from '../containers/Hosting/Info';
import BannerSection from '../containers/Hosting/Banner';
import ContactSection from '../containers/Hosting/Contact';
import Footer from '../containers/Hosting/Footer';
import { DrawerProvider } from '../contexts/DrawerContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default () => {
  return (
    <Router>
      <ThemeProvider theme={hostingTheme}>
        <ParallaxProvider>
        
          <ResetCSS />
          <GlobalStyle />

          <ContentWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
              <DrawerProvider>
                <Navbar />
              </DrawerProvider>
            </Sticky>

            <BannerSection />
            <FeatureSection />
            <InfoSection />
            <Footer />
          </ContentWrapper>
        </ParallaxProvider>
      </ThemeProvider>
    </Router>
  );
};
