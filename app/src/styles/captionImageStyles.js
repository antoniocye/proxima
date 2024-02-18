import globalStyles from "./globalStyles";


const captionImageStyles = {
  container: {
    marginVertical: 20,
    overflow: 'hidden',
    borderRadius: 20,
  },

  image: {
    maxWidth: '90%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: globalStyles.primaryColor,
  },

  captionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    // borderRadius: '0 0 20 20', // top-left, top-right, bottom-right, bottom-left
    overflow: 'hidden',
  },

  caption: {
    color: globalStyles.backgroundColor,
    fontFamily: globalStyles.fontFamily,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
};

export default captionImageStyles;
