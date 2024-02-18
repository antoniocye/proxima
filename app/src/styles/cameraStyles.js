import globalStyles from "./globalStyles";


const cameraStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    minWidth: '90%',
    maxHeight: 400,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 2,
    borderColor: globalStyles.primaryColor,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 0,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor:'transparent',
    padding: 20,
    borderRadius: 10,
  }
};

export default cameraStyles;
