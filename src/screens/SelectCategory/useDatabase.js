import { Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import styles from "./styles";

export default () => {

    const data = [
        {
            id: 0,

            // fullIcon: (
            //     <Entypo
            //         style={styles.catIcon}
            //         name="home"
            //         size={24}
            //         color="black"
            //     />
            // ),
            name: "Vegetariana",
        },
        {
            id: 1,
            // fullIcon: (
            //     <Ionicons
            //         style={styles.catIcon}
            //         name="car-sport"
            //         size={24}
            //         color="black"
            //     />
            // ),
            name: "Inclui ovos",
        },
        {
            id: 2,
            // fullIcon: (
            //     <MaterialIcons
            //         style={styles.catIcon}
            //         name="room-preferences"
            //         size={24}
            //         color="black"
            //     />
            // ),
            name: "Inclui leite",
        },
        {
            id: 3,
            // fullIcon: (
            //     <Entypo
            //         style={styles.catIcon}
            //         name="book"
            //         size={24}
            //         color="black"
            //     />
            // ),
            name: "Inclui ovos e leite",
        },
    ]

    return { data };
}

// Vegetarianismo
// Ovolactovegetarianismo
// Lactovegetarianismo
// Ovovegetarianismo
// Veganismo