import React, { useMemo, useState } from "react";
import {
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../modal/color";
import useDatabase from './useDatabase';

const SelectCategoryScreen = () => {
  const navigation = useNavigation();

  const { data } = useDatabase();

  const [categories, setCategories] = useState(data);

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 20,
          margin: 20,
        }}
      >
        Escolha uma categoria
      </Text>
      {categories.map((category, index) => {
        return (
          <Pressable
            key={category.id}
            style={{
              padding: 15,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              paddingLeft: 30,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey
            }}
            onPress={() => {
              navigation.navigate(
                'Listing',
                {
                  screen: "Enviar receita",
                  categoryID: category.id,
                  categoryName: category.name,
                }
              );
            }}
          >
            {category.fullIcon}
            <Text>
              {category.name}
            </Text>
          </Pressable>
        );
      })}

    </ScrollView>
  );
};

export default SelectCategoryScreen;
