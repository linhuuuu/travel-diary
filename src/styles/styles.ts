import { Button, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ebe010",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Grotesk_Bold",
    fontWeight:100
  },
  listcontainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    margin:10,
    padding:10,
    borderRadius: 10,
    
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999999",
    padding: 30,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 10, 
    maxWidth: "95%",
    marginVertical: 20,
    overflow:"visible",
    position: "relative",

  },
  image: {
    width: 300, 
    height: 300, 
    margin: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom:20,
  },
  button: {
    height: 50,
    backgroundColor: "#b86309",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
  },
  buttonFont: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Grotesk_Semibold"
  },
  buttonFooter: {
    flexDirection: "column",
    marginBottom: 40,
  },
  heading: {
    fontSize: 10,
    color: "#424242"
  },
  remove: {
    color: "#b86309", 
    fontSize: 11, 
    fontFamily: "Grotesk_Regular", 
    marginTop: 5
  },
  fontLight: {
    fontFamily:"Grotesk_Light"
  },
  fontRegular: {
    fontFamily:"Grotesk_Regular"
  },
  inner: {
    justifyContent:"center",
    alignItems:"center",
    padding:10,
  },
  clear: {
    color:"#b86309"
  },
  darkBG: {
    backgroundColor:"#171716"
  },
  darkFont: {
      color:"#fff"
  },
  darkHeading: {
    color:"#dbdbdb"
},
  darkEntry: {
    backgroundColor:"#403f3e"
  },
  darkButton: {
    backgroundColor:"#858585"
  }
});