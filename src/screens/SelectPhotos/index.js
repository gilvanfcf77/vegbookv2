import React, { useMemo } from "react";
import { View } from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../modal/color";
import styles from "./styles";

const SelectPhotosScreen = () => {
  const navigation = useNavigation();
  const onSuccess = (data) => {
    navigation.navigate('Enviar receita', { imageData: data });
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: colors.black,
      errorMessages: {
        hasErrorWithPermissions: "Por favor, habilite as permissões para o acesso a fotos.",
        hasErrorWithLoading: "Ocorreu um erro ao carregar as imagens.",
        hasErrorWithResizing: "Ocorreu um erro ao carregar as imagens.",
        hasNoAssets: "Nenhuma imagem encontrada.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection: 5,
      portraitCols: 2,
      landscapeCols: 4
    }),
    []
  );

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "Finalizar",
        back: "Voltar",
        selected: "selecionada(s)",
      },
      midTextColor: colors.black,
      minSelection: 1,
      buttonTextStyle: styles.textStyle,
      buttonStyle: styles.buttonStyle,
      onBack: () => {
        navigation.navigate('Enviar receita');
      },
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: colors.white,
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: colors.selectedImage,
        size: 26,
      },
    }),
    []
  );

  return (
    <View style={styles.container}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
      />
    </View>
  );
};

export default SelectPhotosScreen;
