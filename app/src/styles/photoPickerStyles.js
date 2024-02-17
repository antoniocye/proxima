import globalStyles from "./globalStyles";

const photoPickerStyles = {
  photoPicker: {
    minWidth: '40%',
    maxWidth: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: globalStyles.primaryColor,
    borderRadius: 20,
    aspectRatio: 1,
    overflow: 'hidden',
  },

  photoPickerImage: {
    width: 200, 
    height: 200, 
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
    gap: '30%',
    marginVertical: 10,
  },
};

export default photoPickerStyles;
