import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../../components/Box';
import Text from '../../../components/Text';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Container from '../../../components/UI/Container';
import ContactFromWrapper from './contact.style';

var contact = {
  "name": "",
  "organization": "",
  "email": ""
};

function sendEmail(contact) {
  console.log("sendEmail() function called")
  console.log(contact)
}



// const name = document.getElementById('name');

const ContactSection = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  secHeading,
  secText,
  button,
  note,
}) => {
  return (
    <Box {...sectionWrapper}>
      <Container>
        <Box {...secTitleWrapper}>
          <Text {...secText} content="LEARN MORE" />
          <Heading
            {...secHeading}
            content="Interested in learning how Userarx can help your business?"
          />
        </Box>
        <Box {...row}>
          <Box {...contactForm}>
            <ContactFromWrapper>
              <input
                id="name"
                onChange={(evt) => { contact.name = evt.target.value }}
                inputType="text"
                placeholder="Name"
                isMaterial={false}
                className="floating_input enter_email"
                aria-label="name"
              />
              <input
                id="organization"
                onChange={(evt) => { contact.organization = evt.target.value }}
                inputType="text"
                placeholder="Organization"
                isMaterial={false}
                className="floating_input enter_email"
                aria-label="organization"
              />
              <input
                id="email"
                onChange={(evt) => { contact.email = evt.target.value }}
                inputType="email"
                placeholder="Email"
                isMaterial={false}
                className="floating_input enter_email"
                aria-label="email"
              />

              <Button
                {...button}
                title="GET STARTED"
                onClick={e => sendEmail(contact)}

              />
            </ContactFromWrapper>
            <Text
              {...note}
              content="A member of our team will reach out to you shortly."
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

ContactSection.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  row: PropTypes.object,
  contactForm: PropTypes.object,
  secHeading: PropTypes.object,
  secText: PropTypes.object,
  button: PropTypes.object,
  note: PropTypes.object,
};

ContactSection.defaultProps = {
  sectionWrapper: {
    id: 'contact_us',
    as: 'section',
    pt: ['0px', '10px', '20px', '80px'],
    pb: ['0px', '0px', '0px', '0px', '80px'],
  },
  secTitleWrapper: {
    mb: ['45px', '50px', '60px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: `${2}`,
    letterSpacing: '0.15em',
    fontWeight: `${6}`,
    color: 'primary',
    mb: `${3}`,
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  row: {
    flexBox: true,
    justifyContent: 'center',
  },
  contactForm: {
    width: [1, 1, 1, 1 / 2],
  },
  button: {
    type: 'button',
    fontSize: `${2}`,
    fontWeight: '500',
    borderRadius: '4px',
    marginTop: '50px',
    pl: '22px',
    pr: '22px',
    colors: 'primarywithbg',
    height: `${4}`,
  },
  note: {
    fontSize: ['13px', '14px', '15px', '15px', '15px'],
    color: '#5d646d',
    lineHeight: '1.87',
    textAlign: 'center',
  },
};

export default ContactSection;
