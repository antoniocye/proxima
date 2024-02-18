import globalStyles from "./globalStyles";

const photoPickerStyles = {
  photoPicker: {
    minWidth: '70%',
    maxWidth: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: globalStyles.primaryColor,
    borderRadius: 20,
    aspectRatio: 1,
    overflow: 'hidden',
  },

  photoPickerImage: {
    width: 350, 
    height: 350, 
    resizeMode: "cover",
  },

  photoPickerText: {
    color: globalStyles.primaryColor,
    fontFamily: globalStyles.fontFamily,
    fontSize: 60,
    overflow: 'hidden',
  },

  photoPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: '30%',
    marginVertical: 10,
  },
};

export default photoPickerStyles;
