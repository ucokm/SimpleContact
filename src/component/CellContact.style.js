import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'skyblue',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: 'grey',
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },
  txt: {
    marginLeft: 8,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});
