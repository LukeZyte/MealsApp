import { useContext, useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import List from "../components/MealDetail/List";
import { MEALS } from "../data/dummy-data";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

const MealDetailScreen = ({ navigation }) => {
  const favoriteMealsCtx = useContext(FavoritesContext);
  // const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  // const dispatch = useDispatch();

  const route = useRoute();
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  // const mealIsFavorite = favoriteMealsIds.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
      // dispatch(removeFavorite({ id: mealId }));
    } else {
      favoriteMealsCtx.addFavorite(mealId);
      // dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuter}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  listOuter: {
    alignItems: "center",
  },
});
