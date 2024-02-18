import globalStyles from "./globalStyles";


const profileStyles = {
  mainImage: {
    maxWidth: '90%',
    height: 500,
    aspectRatio: 4/5,
    borderRadius: 20,
    borderColor: globalStyles.primaryColor,
    borderWidth: 2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 18,
    gap: 20,
  },

  quote: {
    alignItems: 'left',
    borderColor: globalStyles.primaryColor,
    borderWidth: 2,
    borderRadius: 20,
    minWidth: '90%',
    maxWidth: '90%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: globalStyles.backgroundColor,
  },

  quoteText: {
    fontSize: 30,
    color: globalStyles.primaryColor,
    fontFamily: globalStyles.fontFamily,
    textAlign: 'left',
  },

  label: {
    fontSize: 30,
    marginBottom: -10,
  }

  
};

export default profileStyles;
