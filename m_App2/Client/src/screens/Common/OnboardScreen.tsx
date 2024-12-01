import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import { ButtonWithBorder, ButtonWithIcon } from "../../components/Button.tsx";
import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/styles/Colors";
import OnboardImage from "../../assets/vectors/OnboardImage";

// @ts-ignore
export const OnboardScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={[ScreenStyles.container, { justifyContent: 'center' }]}>
      <View style={ScreenStyles.subContainer}>
        <View style={{ alignItems: 'center' }}>
          <OnboardImage />
        </View>
        <View style={{ gap: 16 }}>
          <ButtonWithIcon
            buttonText={"SignIn as Customer"}
            btnColor={colors.PRIMARY_COLOR}
            icon={faUser}
            color={colors.PRIMARY_WHITE}
            onPress={() => {
              navigation.navigate('Login')
            }} />
          <ButtonWithBorder
            buttonText={"SignIn as a Tasker"}
            btnColor={colors.PRIMARY_WHITE}
            icon={faUserGear}
            color={colors.PRIMARY_BLACK}
            onPress={() => {
              navigation.navigate('Login')
            }} />
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate('SignUp')
            }}>
            <Text style={[TextStyles.H6, { color: colors.PRIMARY_LIGHT_GRAY }]}>Haven’t a account?</Text>
            <Text style={[TextStyles.H6, { color: colors.PRIMARY_COLOR }]}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
};
