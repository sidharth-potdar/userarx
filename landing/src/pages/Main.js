import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from '../assets/theme/agency';
import { ResetCSS } from '../assets/css/style';
import { GlobalStyle, AgencyWrapper } from '../containers/Agency/agency.style';
import Navbar from '../containers/Agency/Navbar';
import BannerSection from '../containers/Agency/BannerSection';
// import FeatureSection from '../containers/Agency/FeatureSection';
import FeatureSection from '../containers/Hosting/Features';
// import AboutUsSection from '../containers/Agency/AboutUsSection';
// import WorkHistory from '../containers/Agency/WorkHistory';
// import BlogSection from '../containers/Agency/BlogSection';
// import TestimonialSection from '../containers/Agency/TestimonialSection';
// import TeamSection from '../containers/Agency/TeamSection';
// import VideoSection from '../containers/Agency/VideoSection';
// import NewsletterSection from '../containers/Agency/NewsletterSection';
// import QualitySection from '../containers/Agency/QualitySection';
import ContactSection from '../containers/Hosting/Contact';
import Footer from '../containers/Agency/Footer';
import { DrawerProvider } from '../contexts/DrawerContext';
// import FaqSection from '../containers/Agency/FaqSection';


class Main extends Component {
  render() {
    return(
      <ThemeProvider theme={agencyTheme}>
        {/* Start agency head section */}
        <Head>
          <title>userarx</title>
          <meta name="Description" content="userarx" />
          <meta name="theme-color" content="#10ac84" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        {/* End of agency head section */}
        {/* Start agency wrapper section */}
        <AgencyWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <BannerSection />
          <FeatureSection />
          <ContactSection />
          <Footer />
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </ThemeProvider>
    )
  }
}

export default Main;
