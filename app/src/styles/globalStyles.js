
const primaryColor = '#442B82';
const backgroundColor = '#F8FAFC';
const whiteColor = '#F8FAFC';
const secondaryColor = '#EAD8FF';
const textColor = '#442B82';


// Typography
const fontSize = 24;
const fontFamily = 'GeneralSans-Medium';
const boldFontFamily = 'GeneralSans-Semibold';

// General styles for the entire project
const globalStyles = {
  // Colors
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  
  // Typography
  fontSize,
  fontFamily,

  // Text
  text: {
      color: textColor,
      fontFamily,
      fontSize,
      textAlign: 'center',
      marginVertical: 10,
  },

  // Heading
  heading: {
      color: textColor,
      fontFamily: boldFontFamily,
      fontSize: 54,
      textAlign: 'center',
  },
  
  // Spacing
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  
  // Buttons
  button: {
    backgroundColor: primaryColor,
    borderRadius: 20,
    minWidth: '80%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },


  buttonLabel: {
    color: backgroundColor,
    fontFamily,
    fontSize: 32,
    textAlign: 'center',
  },

  // Forms
  input: {
    fontFamily,
    borderWidth: 1,
    borderColor: primaryColor, // Default border color
    borderRadius: 20,
    minWidth: '80%',
    height: 70,
    paddingHorizontal: 20,
    margin: 10,
    fontSize: 24,
    backgroundColor: backgroundColor,
  },
  
  // Cards
  card: {
    backgroundColor,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 16,
  },
  
  // Alerts
  alert: {
    backgroundColor,
    color: '#000000',
    borderRadius: 4,
    padding: 12,
  },
  
  // Modals
  modal: {
    backgroundColor,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: 16,
  },
  
  // Navigation
  navbar: {
    backgroundColor,
    color: '#FFFFFF',
    height: 64,
    padding: 16,
  },

  // Containers
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%'
  },

  // Links
  link: {
    color: primaryColor,
    textDecoration: 'none',
  },

  // Background Image
  backgroundImage: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
   
  logo: {
    maxWidth: 200,
    height: 200,
    aspectRatio: 1,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Containers
  keyboardAvoidingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

};

export default globalStyles;
