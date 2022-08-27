import { Text, View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ navigation }) => {
  //   const catId = route.params.categoryId;
  const route = useRoute();
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    // to samo co useEffect, ale uruchamia sie podczas animacji, a nie po
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;
